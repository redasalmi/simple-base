// The themes in @simple-base/tokens, in the order the theme picker lists them. Also read by
// scripts/axe.js, which checks every page in every theme.
export const themes = [
  ["simple-base-light", "Simple Base light"],
  ["simple-base-dark", "Simple Base dark"],
  ["catppuccin-latte", "Catppuccin Latte"],
  ["catppuccin-frappe", "Catppuccin Frappé"],
  ["catppuccin-macchiato", "Catppuccin Macchiato"],
  ["catppuccin-mocha", "Catppuccin Mocha"],
  ["dracula", "Dracula"],
  ["tokyo-night", "Tokyo Night"],
  ["nord", "Nord"],
] as const;

export type Theme = (typeof themes)[number][0];
