import { readFileSync } from "node:fs";
import path from "node:path";

import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import js from "@terrazzo/plugin-js";
import tailwind from "@terrazzo/plugin-tailwind";

const srcPath = path.join(import.meta.dirname, "src");
const tokensResolverPath = path.join(srcPath, "simple-base.resolver.json");
const tailwindTemplatePath = path.join(srcPath, "tailwind.template.css");

const readJson = (file: string) => JSON.parse(readFileSync(file, "utf8"));

// Each theme context lists its theme file first; the file records the theme's color scheme.
const themeContexts: Record<string, { $ref: string }[]> =
  readJson(tokensResolverPath).modifiers.theme.contexts;
const themes = Object.entries(themeContexts).map(([name, [themeFile]]) => ({
  name,
  colorScheme: readJson(path.join(srcPath, themeFile.$ref)).$extensions["org.simple-base.theme"]
    .colorScheme as "light" | "dark",
}));

// Only colors and shadows change between themes. Everything else is declared once on :root, so an
// override of a spacing or type token there isn't undone inside a scoped theme.
const themedTokens = [
  "primitive.color.**",
  "semantic.color.**",
  "primitive.shadow.**",
  "semantic.shadow.**",
];

function themeBlock(selector: string, colorScheme: string) {
  return (contents: string) => `${selector} {\n  color-scheme: ${colorScheme};\n  ${contents}\n}`;
}

export default defineConfig({
  tokens: [tokensResolverPath],
  outDir: "./dist",
  plugins: [
    css({
      filename: "tokens.css",
      transform: (token) =>
        token.id.startsWith("primitive.letter-spacing.") ? `${token.$value}em` : undefined,
      variableName: (token) => `--sb-${token.id.replaceAll(".", "-")}`,
      permutations: [
        {
          input: { theme: "simple-base-dark" },
          exclude: themedTokens,
          prepare: (contents) => `:root {\n  ${contents}\n}`,
        },
        // Without a data-theme, the root follows the system color scheme.
        {
          input: { theme: "simple-base-dark" },
          include: themedTokens,
          prepare: themeBlock(`:root,\n[data-theme="simple-base-dark"]`, "dark"),
        },
        {
          input: { theme: "simple-base-light" },
          include: themedTokens,
          prepare: (contents) =>
            `@media (prefers-color-scheme: light) {\n  :root:not([data-theme]) {\n    color-scheme: light;\n    ${contents}\n  }\n}`,
        },
        ...themes
          .filter(({ name }) => name !== "simple-base-dark")
          .map(({ name, colorScheme }) => ({
            input: { theme: name },
            include: themedTokens,
            prepare: themeBlock(`[data-theme="${name}"]`, colorScheme),
          })),
      ],
    }),
    tailwind({
      template: tailwindTemplatePath,
      filename: "tailwind.css",
      theme: {
        color: ["semantic.color.**"],
        font: ["semantic.typography.family.*"],
        text: ["semantic.typography.size.*"],
        "font-weight": ["semantic.typography.weight.*"],
        leading: ["semantic.typography.line-height.*"],
        tracking: ["semantic.typography.letter-spacing.*"],
        spacing: ["semantic.space.*"],
        radius: ["semantic.radius.*"],
        breakpoint: ["semantic.breakpoint.*"],
        container: {
          content: "semantic.size.container.content",
        },
        shadow: ["semantic.shadow.*"],
        ease: ["semantic.motion.easing.*"],
        "default-transition-duration": "semantic.motion.duration.normal",
        "default-transition-timing-function": "semantic.motion.easing.standard",
      },
    }),
    {
      name: "simple-base-tailwind-values",
      enforce: "post",
      transform({ getTransforms, setTransform }) {
        for (const { name } of themes) {
          const input = { theme: name };
          for (const token of getTransforms({ format: "tailwind", input })) {
            // Media queries need literals; utilities should use the public, scoped CSS roles.
            const value =
              token.id.startsWith("semantic.breakpoint.") && token.token.$type === "dimension"
                ? `${token.token.$value.value}${token.token.$value.unit}`
                : `var(--sb-${token.id.replaceAll(".", "-")})`;
            setTransform(token.id, {
              format: "tailwind",
              input,
              localID: token.localID,
              value,
              meta: token.meta,
            });
          }
        }
      },
    },
    js({ filename: "tokens.js" }),
  ],
});
