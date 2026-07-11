import { expect, test } from "@playwright/test";
import { blockExternalFonts, designPages, designUrl } from "./fixtures";

for (const pageName of designPages) {
  test(`${pageName} has valid internal destinations and no narrow-screen overflow`, async ({
    page,
    request,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await blockExternalFonts(page);
    await page.goto(designUrl(pageName), { waitUntil: "domcontentloaded" });

    const destinations = await page
      .locator('a[href]:not([href^="http"]):not([href^="mailto:"])')
      .evaluateAll((links) => [
        ...new Set(links.map((link) => (link as HTMLAnchorElement).href.split("#")[0])),
      ]);

    for (const destination of destinations) {
      expect((await request.get(destination)).ok(), `Broken destination: ${destination}`).toBe(
        true,
      );
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("theme selection persists between pages", async ({ page }) => {
  await blockExternalFonts(page);
  await page.goto(designUrl("index.html"), { waitUntil: "domcontentloaded" });
  await page.locator("[data-theme-select]").selectOption("dracula");
  await page.goto(designUrl("forms.html"));

  await expect(page.locator("body")).toHaveAttribute("data-theme", "dracula");
  await expect(page.locator("[data-theme-select]")).toHaveValue("dracula");
});

test("tabs support click and keyboard navigation", async ({ page }) => {
  await blockExternalFonts(page);
  await page.goto(`${designUrl("navigation.html")}#tabs`, { waitUntil: "domcontentloaded" });
  const tabs = page.getByRole("tab");

  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("End");
  await expect(tabs.last()).toBeFocused();
  await expect(page.getByRole("tabpanel")).toHaveAttribute(
    "aria-labelledby",
    (await tabs.last().getAttribute("id")) ?? "",
  );
});
