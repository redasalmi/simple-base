// Every page that shows a token reads it through this module, so a change to the shape of
// @simple-base/tokens touches only this file. Descriptions and types come from the JS output;
// values come from the CSS output, since the CSS variables are what an app uses.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

import { resolver } from "@simple-base/tokens";

import type { Theme } from "../themes";

export type Token = {
  id: string;
  cssVar: string;
  type: string;
  description?: string;
};

const css = readFileSync(createRequire(import.meta.url).resolve("@simple-base/tokens/css"), "utf8");

function declarations(body: string) {
  return new Map(
    [...body.matchAll(/^\s*(--[\w-]+):\s*(.+);$/gm)].map(([, name, value]) => [name!, value!]),
  );
}

// The first :root block holds every token that no theme changes. Each theme block holds the colors
// and shadows, and records the theme's color scheme.
const rootStart = css.indexOf(":root {");
const base = declarations(css.slice(rootStart, css.indexOf("}", rootStart)));
const themeBlocks = new Map(
  [...css.matchAll(/\[data-theme="([\w-]+)"\] \{([^}]*)\}/g)].map(([, theme, body]) => [
    theme!,
    { colorScheme: /color-scheme: (light|dark);/.exec(body!)![1] as "light" | "dark", body },
  ]),
);

export const colorSchemes = Object.fromEntries(
  [...themeBlocks].map(([theme, { colorScheme }]) => [theme, colorScheme]),
) as Record<Theme, "light" | "dark">;

/** The CSS value of a token in a theme, with every alias followed. */
export function cssValue(cssVar: string, theme: Theme = "simple-base-light") {
  const values = new Map([...base, ...declarations(themeBlocks.get(theme)!.body)]);
  let value = values.get(cssVar);
  for (let alias; (alias = value && /^var\((--[\w-]+)\)$/.exec(value));)
    value = values.get(alias[1]!);
  if (value === undefined) throw new Error(`No CSS variable ${cssVar} in @simple-base/tokens/css`);
  return value;
}

/** The token that a semantic token points at, such as --sb-primitive-color-accent. */
export function aliasOf(cssVar: string, theme: Theme = "simple-base-light") {
  const value = new Map([...base, ...declarations(themeBlocks.get(theme)!.body)]).get(cssVar);
  return value && /^var\((--[\w-]+)\)$/.exec(value)?.[1];
}

const resolved = resolver.apply({ theme: "simple-base-light" });

// The JS output sorts token names alphabetically. Scales read better from small to large, and
// colors from the page background up.
const scale = [
  ..."none 0 xs sm md lg xl 2xl 3xl 4xl 5xl display full".split(" "),
  ..."canvas surface primary secondary default muted strong subtle inverse".split(" "),
  ..."fast tight snug normal relaxed wide wider slow loop".split(" "),
  ..."regular medium semibold bold".split(" "),
];
const rank = (id: string) => {
  const index = scale.indexOf(id.slice(id.lastIndexOf(".") + 1));
  return index === -1 ? scale.length : index;
};

const parent = (id: string) => id.slice(0, id.lastIndexOf("."));

/** The semantic tokens whose path starts with prefix, such as "semantic.color.status". */
export function semanticTokens(prefix: string): Token[] {
  const entries = Object.entries(resolved).filter(
    ([id]) => id === prefix || id.startsWith(`${prefix}.`),
  );
  const groups = [...new Set(entries.map(([id]) => parent(id)))];
  return entries
    .toSorted(
      ([a], [b]) => groups.indexOf(parent(a)) - groups.indexOf(parent(b)) || rank(a) - rank(b),
    )
    .map(([id, token]) => ({
      id,
      cssVar: `--sb-${id.replaceAll(".", "-")}`,
      type: token.$type,
      description: token.$description,
    }));
}
