import { mkdir, writeFile } from "node:fs/promises";
import StyleDictionary from "style-dictionary";
import { transformGroups } from "style-dictionary/enums";
import { listThemeFiles } from "./utils.js";
import {
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  DEFAULT_THEME,
  GENERATED_OUTPUT_DIR,
  STRICT_TOKENS_FORMAT,
  TOKENS_TS_OUTPUT_PATH,
} from "./config.js";

function toCamelCase(value: string) {
  return value.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

function stripTokenMeta(node: unknown): unknown {
  if (!node || typeof node !== "object") return node;

  const record = node as Record<string, unknown>;

  if ("$value" in record) return record.$value;
  if ("value" in record) return record.value;

  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, stripTokenMeta(value)]),
  );
}

StyleDictionary.registerFormat({
  name: STRICT_TOKENS_FORMAT,
  format: ({ dictionary }) => {
    return stripTokenMeta(dictionary.tokens);
  },
});

async function buildTsToken(theme: string) {
  console.log(`\nProcessing: '${theme}'`);
  const sd = new StyleDictionary({
    source: [theme],
    log: {
      verbosity: "silent",
    },
    platforms: {
      ts: {
        transformGroup: transformGroups.js,
        files: [
          {
            format: STRICT_TOKENS_FORMAT,
            options: {
              showFileHeader: false,
            },
          },
        ],
      },
    },
  });
  const [{ output }] = await sd.formatPlatform("ts");
  if (typeof output !== "object" || output === null) {
    throw new Error(`Expected TS output for ${theme}`);
  }

  return output;
}

export async function buildTsTokens() {
  const tokens = await buildTsToken("src/globals/**/*.json");

  const themeFiles = await listThemeFiles();
  const themeEntries = await Promise.all(
    themeFiles.map(async (theme) => {
      const themeName = theme.replace(".json", "");
      const exportName = toCamelCase(themeName);
      const themeTokens = await buildTsToken(`src/themes/${theme}`);

      return [themeName, exportName, themeTokens] as const;
    }),
  );

  const themeNames = themeEntries.map(([name]) => name);
  const themeConstExports = themeEntries
    .map(
      ([_, exportName, theme]) =>
        `export const ${exportName} = ${JSON.stringify(theme, null, 2)} as const;`,
    )
    .join("\n\n");
  const themeReferences = themeEntries
    .map(([name, exportName]) => `  ${JSON.stringify(name)}: ${exportName},`)
    .join("\n");

  await mkdir(GENERATED_OUTPUT_DIR, { recursive: true });
  await writeFile(
    TOKENS_TS_OUTPUT_PATH,
    `
export const tokens = ${JSON.stringify(tokens, null, 2)} as const;

${themeConstExports}

export const themes = {
${themeReferences}
} as const;

export const themeNames = ${JSON.stringify(themeNames, null, 2)} as const;

export const defaultLightTheme = '${DEFAULT_LIGHT_THEME}';
export const defaultDarkTheme = '${DEFAULT_DARK_THEME}';
export const defaultTheme = '${DEFAULT_THEME}';

export type Tokens = typeof tokens;
export type Themes = typeof themes;
export type ThemeName = keyof Themes;
export type ThemeTokens = Themes[ThemeName];
    `,
  );
}
