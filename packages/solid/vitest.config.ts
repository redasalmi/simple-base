import { playwright } from "@vitest/browser-playwright";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";
import type { BrowserCommand } from "vitest/node";

export type RenderFixtureOptions = {
  /** Pins `Date.now()` on the server while it renders. */
  now: number;
  /** Server time zone while it renders. */
  timeZone: string;
};

// Renders a fixture with the server build of Solid, so the browser can hydrate the same markup.
const renderFixture: BrowserCommand<[name: string, options: RenderFixtureOptions]> = async (
  { project },
  name,
  { now, timeZone },
) => {
  const { fixtures } = await project.vite.ssrLoadModule("/src/test/fixtures.tsx");
  const { renderToString } = await project.vite.ssrLoadModule("solid-js/web");
  const realNow = Date.now;
  const realTimeZone = process.env.TZ;
  Date.now = () => now;
  process.env.TZ = timeZone;
  try {
    return renderToString(fixtures[name]);
  } finally {
    Date.now = realNow;
    if (realTimeZone === undefined) delete process.env.TZ;
    else process.env.TZ = realTimeZone;
  }
};

// Pre-bundled up front, so Vite doesn't discover them mid-run and reload the browser tests.
const optimizeDeps = {
  include: [
    "@internationalized/date",
    "@zag-js/combobox",
    "@zag-js/date-picker",
    "@zag-js/menu",
    "@zag-js/number-input",
    "@zag-js/select",
    "@zag-js/solid",
    "@zag-js/tabs",
    "@zag-js/toast",
    "@zag-js/tooltip",
  ],
};

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [solid()],
        optimizeDeps,
        test: {
          name: "browser",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/**/*.ssr.test.{ts,tsx}", "src/**/*.hydration.test.{ts,tsx}"],
          setupFiles: ["src/test/setup.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        plugins: [solid({ ssr: true })],
        test: {
          name: "ssr",
          include: ["src/**/*.ssr.test.{ts,tsx}"],
          environment: "node",
        },
      },
      {
        // Hydratable client output, with the server build available to the renderFixture command.
        plugins: [solid({ ssr: true })],
        optimizeDeps,
        test: {
          name: "hydration",
          include: ["src/**/*.hydration.test.{ts,tsx}"],
          browser: {
            enabled: true,
            headless: true,
            // Far from any likely server zone, so "today" differs between server and browser.
            provider: playwright({ contextOptions: { timezoneId: "Pacific/Kiritimati" } }),
            instances: [{ browser: "chromium" }],
            commands: { renderFixture },
          },
        },
      },
    ],
  },
});
