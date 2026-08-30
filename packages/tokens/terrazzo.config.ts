import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import tailwind from "@terrazzo/plugin-tailwind";
import js from "@terrazzo/plugin-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensResolverPath = path.join(__dirname, "src/simple-base.resolver.json");
const tailwindTemplatePath = path.join(__dirname, "src/tailwind.template.css");

const themes = [
  { name: "simple-base-dark", colorScheme: "dark", isDefault: true },
  { name: "simple-base-light", colorScheme: "light", isDefault: false },
  { name: "catppuccin-latte", colorScheme: "light", isDefault: false },
  { name: "catppuccin-frappe", colorScheme: "dark", isDefault: false },
  { name: "catppuccin-macchiato", colorScheme: "dark", isDefault: false },
  { name: "catppuccin-mocha", colorScheme: "dark", isDefault: false },
  { name: "dracula", colorScheme: "dark", isDefault: false },
  { name: "tokyo-night", colorScheme: "dark", isDefault: false },
  { name: "nord", colorScheme: "dark", isDefault: false },
] as const;

export default defineConfig({
  tokens: [tokensResolverPath],
  outDir: "./dist",
  plugins: [
    css({
      filename: "tokens.css",
      transform: (token) =>
        token.id.startsWith("primitive.letter-spacing.") ? `${token.$value}em` : undefined,
      permutations: themes.map(({ name, colorScheme, isDefault }) => ({
        input: { theme: name },
        prepare: (contents) => {
          const selector = isDefault ? `:root,\n[data-theme="${name}"]` : `[data-theme="${name}"]`;
          return `${selector} {\n  color-scheme: ${colorScheme};\n  ${contents}\n}`;
        },
      })),
    }),
    tailwind({
      template: tailwindTemplatePath,
      filename: "tailwind-theme.css",
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
    js({ filename: "tokens.js" }),
  ],
});
