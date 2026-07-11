import { expect, test } from "@playwright/test";
import { applyTheme, designUrl } from "./fixtures";

const cases = [
  { page: "index.html", theme: "simple-base-dark" },
  { page: "index.html", theme: "simple-base-light" },
  { page: "index.html", theme: "dracula" },
  { page: "forms.html", theme: "simple-base-dark" },
  { page: "forms.html", theme: "simple-base-light" },
  { page: "forms.html", theme: "dracula" },
] as const;

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const example of cases) {
  for (const viewport of viewports) {
    test(`${example.page} ${example.theme} ${viewport.name} visual baseline`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.route(/https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) =>
        route.abort(),
      );
      await page.goto(designUrl(example.page), { waitUntil: "domcontentloaded" });
      await applyTheme(page, example.theme);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);

      await expect(page).toHaveScreenshot(
        `${example.page.replace(".html", "")}-${example.theme}-${viewport.name}.png`,
        { fullPage: true },
      );
    });
  }
}
