// Opens every section of the built playground in Chromium and fails on any axe violation, in every
// theme. Run it with `pnpm test`, which builds the playground first.
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import { preview } from "vite";

import { themes } from "../src/themes.ts";

const axePath = fileURLToPath(import.meta.resolve("axe-core/axe.min.js"));

const server = await preview({ root: fileURLToPath(new URL("..", import.meta.url)) });
const url = server.resolvedUrls.local[0];
const browser = await chromium.launch();
// Reduced motion turns off the color transitions, so a theme applies at once. The Google Fonts
// requests are blocked, so the run doesn't depend on the network.
const context = await browser.newContext({ reducedMotion: "reduce" });
await context.route(
  (request) => !request.href.startsWith(url),
  (route) => route.abort(),
);

async function check(section) {
  const page = await context.newPage();
  const failures = [];
  page.on("pageerror", (error) => failures.push(`${section}: ${error.message}`));
  await page.goto(new URL(section, url).href);
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(
    async (themeNames) => {
      const found = [];
      for (const theme of themeNames) {
        document.documentElement.dataset.theme = theme;
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
            if (!inactive)
              found.push(`in ${theme}: ${id} ${node.target.join(" ")}\n${node.failureSummary}`);
          }
        }
      }
      return found;
    },
    themes.map(([theme]) => theme),
  );
  await page.close();
  return [...failures, ...violations.map((violation) => `${section} ${violation}`)];
}

let failures;
try {
  const index = await context.newPage();
  await index.goto(url);
  const sections = await index
    .locator(".playground-sidebar nav a")
    .evaluateAll((links) => links.map((link) => link.hash));
  await index.close();
  failures = (await Promise.all(sections.map(check))).flat();
} finally {
  await browser.close();
  await server.close();
}

if (failures.length > 0) {
  console.error(failures.join("\n\n"));
  process.exit(1);
}
console.log(`No axe violations in ${themes.length} themes`);
