// Opens every page of the built docs in Chromium, hydrates its examples, and fails on any axe
// violation, in every theme and for every released framework. Run it with `pnpm test`, which builds
// the docs first.
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { preview } from "astro";
import { chromium } from "playwright";

import { frameworks } from "../src/frameworks.ts";
import { colorSchemes } from "../src/lib/tokens.ts";
import { themes } from "../src/themes.ts";

const root = new URL("..", import.meta.url);
const axePath = fileURLToPath(import.meta.resolve("axe-core/axe.min.js"));

const pages = readdirSync(new URL("dist", root), { recursive: true })
  .filter((file) => file.endsWith("index.html") && !file.startsWith("pagefind"))
  .map((file) => `/${file.slice(0, -"index.html".length)}`);

const server = await preview({ root: fileURLToPath(root), logLevel: "error" });
const url = `http://localhost:${server.port}`;
const browser = await chromium.launch();
// Reduced motion turns off the color transitions, so a theme applies at once. The Google Fonts
// requests are blocked, so the run doesn't depend on the network.
const context = await browser.newContext({ reducedMotion: "reduce" });
await context.route(
  (request) => !request.href.startsWith(url),
  (route) => route.abort(),
);

async function check(path, framework) {
  const page = await context.newPage();
  const failures = [];
  page.on("pageerror", (error) => failures.push(`${path}: ${error.message}`));
  await page.addInitScript((id) => localStorage.setItem("sb-docs-framework", id), framework);
  await page.goto(new URL(path, url).href);
  // Each example hydrates once it scrolls into view. An island has no box of its own, so its
  // parent stands in for it; the other frameworks' examples stay hidden and never hydrate.
  await page.evaluate(async () => {
    for (const island of document.querySelectorAll("astro-island")) {
      if (!island.parentElement.checkVisibility()) continue;
      island.parentElement.scrollIntoView();
      // oxlint-disable-next-line no-await-in-loop -- the observer fires between scrolls
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  });
  await page.waitForFunction(() =>
    [...document.querySelectorAll("astro-island[ssr]")].every(
      (island) => !island.parentElement.checkVisibility(),
    ),
  );
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(
    async (schemes) => {
      const found = [];
      for (const [theme, colorScheme] of Object.entries(schemes)) {
        document.documentElement.dataset.theme = theme;
        document.documentElement.dataset.colorScheme = colorScheme;
        // oxlint-disable-next-line no-await-in-loop -- each theme restyles the same page
        const results = await window.axe.run(document);
        for (const { id, nodes } of results.violations) {
          for (const node of nodes) {
            // A disabled field dims its description with its label. WCAG 1.4.3 sets no contrast
            // minimum for an inactive control, and axe already skips the label.
            const inactive =
              id === "color-contrast" &&
              document
                .querySelector(node.target[0])
                ?.matches(".sb-field-description:is([data-disabled] *, fieldset:disabled *)");
            // Starlight's search button shows its shortcut beside its name, Search, and announces
            // the shortcut through aria-keyshortcuts instead.
            const search =
              id === "label-content-name-mismatch" &&
              document.querySelector(node.target[0])?.matches("button[data-open-modal]");
            if (!inactive && !search)
              found.push(`in ${theme}: ${id} ${node.target.join(" ")}\n${node.failureSummary}`);
          }
        }
      }
      return found;
    },
    Object.fromEntries(themes.map(([theme]) => [theme, colorSchemes[theme]])),
  );
  await page.close();
  return [...failures, ...violations.map((violation) => `${path} (${framework}) ${violation}`)];
}

const runs = frameworks
  .filter(({ released }) => released)
  .flatMap(({ id }) => pages.map((path) => [path, id]));
const failures = [];
try {
  // A few pages at a time, so hydration doesn't time out on a busy machine.
  for (let index = 0; index < runs.length; index += 4) {
    const batch = runs.slice(index, index + 4).map(([path, framework]) => check(path, framework));
    // oxlint-disable-next-line no-await-in-loop -- batches keep the browser responsive
    failures.push(...(await Promise.all(batch)).flat());
  }
} finally {
  await browser.close();
  await server.stop();
}

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}
console.log(`No axe violations on ${pages.length} pages in ${themes.length} themes`);
