const themeSelect = document.querySelector("[data-theme-select]");
const themeAliases = {
  dark: "simple-base-dark",
  light: "simple-base-light",
};
const defaultTheme = document.body.dataset.theme || "simple-base-dark";
const savedTheme = localStorage.getItem("sb-theme") || defaultTheme;

function normalizeTheme(theme) {
  return themeAliases[theme] || theme;
}

function applyTheme(theme) {
  const normalizedTheme = normalizeTheme(theme);
  document.body.dataset.theme = normalizedTheme;
  localStorage.setItem("sb-theme", normalizedTheme);
  if (themeSelect) themeSelect.value = normalizedTheme;
}

applyTheme(savedTheme);

themeSelect?.addEventListener("change", (event) => {
  applyTheme(event.target.value);
});
