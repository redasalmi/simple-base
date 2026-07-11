export const designPages = [
  "index.html",
  "components.html",
  "foundations.html",
  "forms.html",
  "navigation.html",
  "feedback.html",
  "overlays.html",
  "tokens.html",
  "docs.html",
] as const;

export const themes = [
  "simple-base-dark",
  "simple-base-light",
  "catppuccin-latte",
  "catppuccin-frappe",
  "catppuccin-macchiato",
  "catppuccin-mocha",
  "dracula",
  "tokyo-night",
  "nord",
] as const;

export const designUrl = (page: string) => `/packages/design/${page}`;

export async function blockExternalFonts(page: import("@playwright/test").Page) {
  await page.route(/https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\//, (route) =>
    route.abort(),
  );
}

export async function applyTheme(page: import("@playwright/test").Page, theme: string) {
  await page.locator("[data-theme-select]").selectOption(theme);
  await page.waitForFunction(
    (selectedTheme) => document.body.dataset.theme === selectedTheme,
    theme,
  );
}
