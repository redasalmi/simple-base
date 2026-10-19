// Code blocks follow the light or dark scheme of the selected token theme, which ThemeProvider
// sets on <html data-color-scheme>, instead of Starlight's own data-theme switch. They keep the
// code theme's own background, which its token colors are designed against, and wrap long lines
// so they never need a scrollbar.
export default {
  themes: ["github-dark", "github-light"],
  themeCssSelector: (theme) => `[data-color-scheme='${theme.type}']`,
  defaultProps: { wrap: true },
};
