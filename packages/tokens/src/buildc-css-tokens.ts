import { mkdir, writeFile } from "node:fs/promises";
import StyleDictionary from "style-dictionary";
import { formats, transformGroups } from "style-dictionary/enums";
import { listThemeFiles } from "./utils.js";
import { DURATION_CSS_TRANSFORM, TOKENS_CSS_OUTPUT_PATH, TOKENS_OUTPUT_DIR } from "./config.js";

StyleDictionary.registerTransform({
  name: DURATION_CSS_TRANSFORM,
  type: "value",
  filter: (token) => {
    return token.$type === "duration" || token.type === "duration";
  },
  transform: (token) => {
    const value = token.$value ?? token.value;

    if (value && typeof value === "object" && "value" in value && "unit" in value) {
      return `${value.value}${value.unit}`;
    }

    return value;
  },
});

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
        transforms: [DURATION_CSS_TRANSFORM],
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

  const themeFiles = await listThemeFiles();
  const themesCss = await Promise.all(
    themeFiles.map((theme) =>
      buildCssToken(`src/themes/${theme}`, `[data-theme="${theme.replace(".json", "")}"]`),
    ),
  );

  cssBlocks.push(globalsCss, ...themesCss);
  await mkdir(TOKENS_OUTPUT_DIR, { recursive: true });
  await writeFile(TOKENS_CSS_OUTPUT_PATH, cssBlocks.join("\n"));
}
