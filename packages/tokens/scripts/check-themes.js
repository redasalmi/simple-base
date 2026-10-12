// Checks the theme contract in the README: every color pair below meets its WCAG 2 contrast minimum
// in every theme, with translucent colors composited over the background they sit on. Also checks
// that every color of a ported theme is the palette color it names, unless it records an exception.
// Run it with `pnpm check`.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const src = join(import.meta.dirname, "../src");
const readJson = (path) => JSON.parse(readFileSync(join(src, path), "utf8"));

const statuses = ["danger", "success", "warning", "info"];
const surfaces = ["background.canvas", "background.surface"];
// A translucent fill is written as [fill, background], and checked composited over it.
const over = (fill, backgrounds) => backgrounds.map((background) => [fill, background]);
const textBackgrounds = [
  ...surfaces,
  "background.muted",
  ...over("background.subtle", [...surfaces, "background.muted"]),
  ...over("accent.soft", surfaces),
];

// Each rule is [foreground roles, backgrounds, minimum ratio].
const rules = [
  [["foreground.primary", "foreground.secondary", "foreground.muted"], textBackgrounds, 4.5],
  // background.strong carries primary text only.
  [["foreground.primary"], ["background.strong"], 4.5],
  [["foreground.inverse"], ["foreground.primary"], 4.5],
  [["accent.text"], [...surfaces, "background.muted", ...over("accent.soft", surfaces)], 4.5],
  [["accent.on-surface"], ["accent.surface"], 4.5],
  [["selection.foreground"], ["selection.background"], 4.5],
  [["border.strong", "focus.danger-ring", "status.danger.base", "accent.surface"], surfaces, 3],
  [["focus.ring"], [...surfaces, "background.muted"], 3],
  ...statuses.flatMap((status) => [
    [[`status.${status}.text`], [...surfaces, ...over(`status.${status}.soft`, surfaces)], 4.5],
    [[`status.${status}.on-surface`], [`status.${status}.surface`], 4.5],
    // Glyphs on their tint, and progress fills on their track.
    [[`status.${status}.base`], over(`status.${status}.soft`, surfaces), 3],
    [[`status.${status}.surface`], ["background.strong"], 3],
  ]),
];

const linear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = ([r, g, b]) => 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
const composite = ({ components, alpha = 1 }, base) =>
  components.map((c, i) => c * alpha + base[i] * (1 - alpha));
const hex = (components) =>
  `#${components
    .map((c) =>
      Math.round(c * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].toSorted((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const semantic = readJson("semantic/color.tokens.json").semantic.color;
const themes = readJson("simple-base.resolver.json").modifiers.theme.contexts;
const failures = [];

for (const [theme, [themeFile]] of Object.entries(themes)) {
  const tokens = readJson(themeFile.$ref);
  const primitives = tokens.primitive.color;

  const palette = tokens.$extensions["org.simple-base.theme"].palette?.colors;
  for (const [key, token] of Object.entries(palette ? primitives : {})) {
    const source = token.$extensions?.["org.simple-base.palette"];
    if (
      !key.startsWith("$") &&
      !source?.exception &&
      palette[source] !== hex(token.$value.components)
    ) {
      failures.push(`${theme}: ${key} isn't the palette color ${source} and records no exception`);
    }
  }

  // Semantic colors alias a primitive color of the theme, like "{primitive.color.fg-primary}".
  const color = (role) => {
    const alias = role.split(".").reduce((group, key) => group?.[key], semantic)?.$value;
    return primitives[alias?.slice("{primitive.color.".length, -1)].$value;
  };
  const background = (bg) =>
    Array.isArray(bg) ? composite(color(bg[0]), color(bg[1]).components) : color(bg).components;

  for (const [roles, backgrounds, minimum] of rules) {
    for (const role of roles) {
      for (const bg of backgrounds) {
        const base = background(bg);
        const ratio = contrast(composite(color(role), base), base);
        if (ratio < minimum) {
          const on = Array.isArray(bg) ? `${bg[0]} over ${bg[1]}` : bg;
          failures.push(`${theme}: ${role} on ${on} is ${ratio.toFixed(2)}:1, needs ${minimum}:1`);
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Theme contract holds in ${Object.keys(themes).length} themes.`);
