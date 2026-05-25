import StyleDictionary from "style-dictionary";
import { formats, transformGroups } from "style-dictionary/enums";
import { mkdir, writeFile } from "node:fs/promises";
import simpleBaseTokens from "./tokens.dtcg.json" with { type: "json" };
import simpleBaseResolver from "./simple-base.resolver.json" with { type: "json" };
import { DIST_OUTPUT_DIR, TOKENS_CSS_OUTPUT_PATH } from "./config.js";
import type { DesignTokens } from "style-dictionary/types";

async function formatTokensAsCssVariables(tokens: DesignTokens, theme: string, selector: string) {
  console.log(`\nProcessing: '${theme}'`);
  const sd = new StyleDictionary({
    tokens,
    log: {
      verbosity: "silent",
    },
    platforms: {
      web: {
        prefix: "sb",
        transformGroup: transformGroups.web,
        files: [
          {
            format: formats.cssVariables,
            options: {
              selector,
              showFileHeader: false,
              outputReferences: true,
              outputReferenceFallbacks: false,
              sort: "name",
              formatting: {
                commentStyle: "none",
              },
            },
          },
        ],
      },
    },
  });
  const [{ output }] = await sd.formatPlatform("web");
  if (typeof output !== "string") {
    throw new Error(`Expected CSS output for ${theme}`);
  }

  return output;
}

export async function buildCssTokens() {
  const cssBlocks: string[] = [];
  const globalCss = await formatTokensAsCssVariables(
    simpleBaseTokens,
    "Global Tokens",
    `:root, [data-theme="simple-base-dark"]`,
  );
  cssBlocks.push(globalCss);

  for (const [theme, themeTokens] of Object.entries(simpleBaseResolver.modifiers.theme.contexts)) {
    const tokensToBuild = themeTokens[0];
    if (!tokensToBuild) continue;

    const themeCss = await formatTokensAsCssVariables(
      tokensToBuild,
      theme,
      `[data-theme="${theme}"]`,
    );
    cssBlocks.push(themeCss);
  }

  await mkdir(DIST_OUTPUT_DIR, { recursive: true });
  await writeFile(TOKENS_CSS_OUTPUT_PATH, cssBlocks.join("\n"));
}
