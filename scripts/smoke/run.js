// Installs the packed packages in a scratch Vite and Solid app, then checks in Chromium that
// Button and Select render and work, first as a client-only app and then server-rendered and
// hydrated. Run it with `pnpm test:smoke`, which builds the packages first.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { once } from "node:events";
import { readFileSync } from "node:fs";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { extname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "../..");
const packages = ["contracts", "css", "solid", "tokens"];
const contentTypes = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript" };

// The browser that the solid package's tests already install.
const { chromium } = createRequire(join(root, "packages/solid/package.json"))("playwright");

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const pnpm = (args, cwd) => execFileSync("pnpm", args, { cwd, stdio: "inherit" });

const dir = await mkdtemp(join(tmpdir(), "simple-base-smoke-"));
const packsDir = join(dir, "packs");
const appDir = join(dir, "app");
// Left in place when a check fails, for debugging.
console.log(`Working in ${dir}`);

// Every @simple-base package resolves to its tarball, including the ones only depended on by others.
const tarballs = {};
await mkdir(packsDir);
for (const name of packages) {
  const packageDir = join(root, "packages", name);
  const { name: packageName, version } = readJson(join(packageDir, "package.json"));
  pnpm(["pack", "--pack-destination", packsDir], packageDir);
  tarballs[packageName] =
    `file:${join(packsDir, `${packageName.slice(1).replace("/", "-")}-${version}.tgz`)}`;
}

const solid = readJson(join(root, "packages/solid/package.json"));
const playground = readJson(join(root, "apps/solid-playground/package.json"));
await cp(join(import.meta.dirname, "app"), appDir, { recursive: true });
await writeFile(
  join(appDir, "package.json"),
  JSON.stringify({
    name: "simple-base-smoke",
    private: true,
    type: "module",
    dependencies: {
      "@internationalized/date": solid.peerDependencies["@internationalized/date"],
      "@simple-base/css": tarballs["@simple-base/css"],
      "@simple-base/solid": tarballs["@simple-base/solid"],
      "solid-js": solid.peerDependencies["solid-js"],
    },
    devDependencies: {
      vite: playground.devDependencies.vite,
      "vite-plugin-solid": playground.devDependencies["vite-plugin-solid"],
    },
  }),
);
await writeFile(
  join(appDir, "pnpm-workspace.yaml"),
  `overrides:\n${Object.entries(tarballs)
    .map(([name, spec]) => `  "${name}": "${spec}"\n`)
    .join("")}`,
);
pnpm(["install"], appDir);

async function serve(clientDir, render) {
  const template = await readFile(join(clientDir, "index.html"), "utf8");
  const server = createServer(async (request, response) => {
    const { pathname } = new URL(request.url, "http://localhost");
    if (pathname === "/") {
      const { head, html } = render?.() ?? { head: "", html: "" };
      response.writeHead(200, { "content-type": "text/html" });
      response.end(template.replace("<!--app-head-->", head).replace("<!--app-html-->", html));
      return;
    }
    try {
      const body = await readFile(join(clientDir, pathname));
      response.writeHead(200, { "content-type": contentTypes[extname(pathname)] });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  return { server, url: `http://127.0.0.1:${server.address().port}/` };
}

async function check(browser, url, { hydrate = false } = {}) {
  const page = await browser.newPage();
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  if (hydrate) {
    // Holds the scripts back until the server's elements are recorded. Solid's production build
    // doesn't report a hydration mismatch; it replaces the elements it can't claim.
    const { promise: scriptsReleased, resolve: releaseScripts } = Promise.withResolvers();
    await page.route("**/*.js", async (route) => {
      await scriptsReleased;
      await route.continue();
    });
    await page.goto(url, { waitUntil: "commit" });
    await page.waitForFunction(() => document.readyState !== "loading");
    await page.evaluate(() => {
      window.serverElements = [...document.querySelectorAll("#app *")];
    });
    releaseScripts();
    await page.waitForLoadState("load");
    const replaced = await page.evaluate(
      () => window.serverElements.filter((element) => !element.isConnected).length,
    );
    assert.equal(replaced, 0, "hydration replaced server-rendered elements");
  } else {
    await page.goto(url);
  }

  assert.equal(await page.getByRole("button", { name: "Save" }).count(), 1);
  const trigger = page.getByRole("combobox", { name: "Timezone" });
  await trigger.click();
  await page.getByRole("option", { name: "Coordinated Universal Time" }).click();
  await trigger.filter({ hasText: "Coordinated Universal Time" }).waitFor();

  const styles = await page.evaluate(() => ({
    token: getComputedStyle(document.documentElement).getPropertyValue(
      "--sb-semantic-color-accent-surface",
    ),
    cursor: getComputedStyle(document.querySelector(".sb-button")).cursor,
  }));
  assert.notEqual(styles.token, "", "@simple-base/tokens/css didn't load");
  assert.equal(styles.cursor, "pointer", "@simple-base/css didn't load");
  assert.deepEqual(errors, []);
  await page.close();
}

const browser = await chromium.launch();
try {
  console.log("Client-only build");
  pnpm(["exec", "vite", "build", "--outDir", "dist/csr"], appDir);
  const csr = await serve(join(appDir, "dist/csr"));
  try {
    await check(browser, csr.url);
  } finally {
    csr.server.close();
  }

  console.log("Server-rendered build");
  pnpm(["exec", "vite", "build", "--mode", "ssr", "--outDir", "dist/client"], appDir);
  pnpm(
    [
      "exec",
      "vite",
      "build",
      "--mode",
      "ssr",
      "--ssr",
      "src/entry-server.jsx",
      "--outDir",
      "dist/server",
    ],
    appDir,
  );
  const { render } = await import(pathToFileURL(join(appDir, "dist/server/entry-server.js")).href);
  const ssr = await serve(join(appDir, "dist/client"), render);
  try {
    const html = await (await fetch(ssr.url)).text();
    assert.match(html, /sb-button/, "the server didn't render Button");
    assert.match(html, /Select a timezone/, "the server didn't render Select");
    await check(browser, ssr.url, { hydrate: true });
  } finally {
    ssr.server.close();
  }
} finally {
  await browser.close();
}

await rm(dir, { recursive: true });
console.log("Smoke test passed");
