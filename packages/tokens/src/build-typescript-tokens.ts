import StyleDictionary from "style-dictionary";
import { transformGroups } from "style-dictionary/enums";
import { mkdir, writeFile } from "node:fs/promises";
import {
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  DEFAULT_THEME,
  GENERATED_OUTPUT_DIR,
  STRICT_TOKENS_FORMAT,
  TOKENS_TS_OUTPUT_PATH,
} from "./config.js";
import simpleBaseTokens from "./tokens.dtcg.json" with { type: "json" };
import simpleBaseResolver from "./simple-base.resolver.json" with { type: "json" };
import type { DesignTokens } from "style-dictionary/types";

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepMerge<T extends JsonObject>(...objects: JsonObject[]): T {
  const result: JsonObject = {};

  for (const object of objects) {
    for (const [key, value] of Object.entries(object)) {
      const existingValue = result[key];

      if (isObject(existingValue) && isObject(value)) {
        result[key] = deepMerge(existingValue, value);
      } else {
        result[key] = value;
      }
    }
  }

  return result as T;
}

function toCamelCase(value: string) {
  return value.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

function stripTokenMeta(node: unknown): unknown {
  if (!node || typeof node !== "object") return node;

  const record = node as Record<string, unknown>;

  if ("$value" in record) return record.$value;
  if ("value" in record) return record.value;

  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [toCamelCase(key), stripTokenMeta(value)]),
  );
}

StyleDictionary.registerFormat({
  name: STRICT_TOKENS_FORMAT,
  format: ({ dictionary }) => {
    return stripTokenMeta(dictionary.tokens);
  },
});

async function formatTokensForTypescript(tokens: DesignTokens, theme: string) {
  console.log(`\nProcessing: '${theme}'`);
  const sd = new StyleDictionary({
    tokens,
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
  const tokens = await formatTokensForTypescript(simpleBaseTokens, "Global Tokens");

  const defaultTheme = simpleBaseResolver.modifiers.theme.default;
  const themes = Object.entries(simpleBaseResolver.modifiers.theme.contexts);

  const themeEntries = await Promise.all(
    themes.map(async ([themeName, themeOverrides]) => {
      const exportName = toCamelCase(themeName);

      const resolvedTokens =
        themeName === defaultTheme
          ? simpleBaseTokens
          : deepMerge<DesignTokens>(simpleBaseTokens, ...themeOverrides);

      const themeTokens = await formatTokensForTypescript(resolvedTokens, themeName);

      return [themeName, exportName, themeTokens] as const;
    }),
  );

  const themeNames = themeEntries.map(([name]) => name);

  const themeConstExports = themeEntries
    .map(([themeName, exportName, theme]) => {
      if (themeName === defaultTheme) {
        return `export const ${exportName} = tokens;`;
      }

      return `export const ${exportName} = ${JSON.stringify(theme, null, 2)} as const;`;
    })
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
