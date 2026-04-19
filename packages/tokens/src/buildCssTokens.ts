import { writeFile } from "node:fs/promises";
import StyleDictionary from "style-dictionary";
import { formats, transformGroups } from "style-dictionary/enums";
import { listThemeFiles } from "./utils.js";
import { TOKENS_CSS_OUTPUT_PATH } from "./config.js";

async function buildCssToken(theme: string, selector: string) {
  console.log(`\nProcessing: '${theme}'`);
  const sd = new StyleDictionary({
    source: [theme],
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
  const globalsCss = await buildCssToken("src/globals/**/*.json", ":root");

  const themes = await listThemeFiles();
  const themesCss = await Promise.all(
    themes.map((theme) =>
      buildCssToken(`src/themes/${theme}`, `[data-theme="${theme.replace(".json", "")}"]`),
    ),
  );

  cssBlocks.push(globalsCss, ...themesCss);
  await writeFile(TOKENS_CSS_OUTPUT_PATH, cssBlocks.join("\n"));
}
