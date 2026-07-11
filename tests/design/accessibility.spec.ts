import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { applyTheme, blockExternalFonts, designPages, designUrl, themes } from "./fixtures";

for (const pageName of designPages) {
  for (const theme of themes) {
    test(`${pageName} meets automated WCAG A/AA checks in ${theme}`, async ({ page }) => {
      await blockExternalFonts(page);
      await page.goto(designUrl(pageName), { waitUntil: "domcontentloaded" });
      await applyTheme(page, theme);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      expect(results.violations, formatViolations(results.violations)).toEqual([]);
    });
  }
}

function formatViolations(violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"]) {
  return violations
    .map((violation) => {
      const nodes = violation.nodes.map((node) => `  ${node.target.join(" ")}`).join("\n");
      return `${violation.id}: ${violation.help}\n${nodes}`;
    })
    .join("\n\n");
}
