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

const tabCopy = {
  Overview: [
    "Command center overview",
    "Use tabs to switch between dense workspace sections without leaving the current surface.",
  ],
  Issues: [
    "Open issues",
    "Review active work while preserving the workspace context and current filters.",
  ],
  Commands: [
    "Available commands",
    "Find keyboard-first actions and run them without leaving the current surface.",
  ],
  Activity: [
    "Recent activity",
    "Track meaningful workspace changes in a compact chronological view.",
  ],
};

document.querySelectorAll(".sb-tabs").forEach((tabs, groupIndex) => {
  const controls = [...tabs.querySelectorAll('[role="tab"]')];
  const panel = tabs.querySelector('[role="tabpanel"]');
  if (!panel) return;

  panel.id ||= `sb-tab-panel-${groupIndex}`;
  controls.forEach((tab, tabIndex) => {
    tab.id ||= `sb-tab-${groupIndex}-${tabIndex}`;
    tab.setAttribute("aria-controls", panel.id);
    tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
  });

  function selectTab(tab) {
    controls.forEach((control) => {
      const selected = control === tab;
      control.setAttribute("aria-selected", String(selected));
      control.classList.toggle("sb-tab--active", selected);
      control.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    const [title, description] = tabCopy[tab.textContent.trim()] || [];
    if (title) panel.querySelector("h3").textContent = title;
    if (description) panel.querySelector("p:last-child").textContent = description;
  }

  controls.forEach((tab, tabIndex) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? controls.length - 1
            : (tabIndex + (event.key === "ArrowRight" ? 1 : -1) + controls.length) %
              controls.length;
      controls[nextIndex].focus();
      selectTab(controls[nextIndex]);
    });
  });
});
