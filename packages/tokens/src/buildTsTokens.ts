import { writeFile } from "node:fs/promises";
import StyleDictionary from "style-dictionary";
import { transformGroups } from "style-dictionary/enums";
import { listThemeFiles } from "./utils.js";
import { STRICT_TOKENS_FORMAT, TOKENS_TS_OUTPUT_PATH } from "./config.js";

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

async function buildTsToken(theme: string, constName: string) {
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

  return `export const ${constName} = ${JSON.stringify(output, null, 2)} as const;`;
}

export async function buildTsTokens() {
  const tsBlocks: string[] = [];
  const globalsTs = await buildTsToken("src/globals/**/*.json", "tokens");

  const themes = await listThemeFiles();
  const themesTs = await Promise.all(
    themes.map((theme) =>
      buildTsToken(`src/themes/${theme}`, toCamelCase(theme.replace(".json", ""))),
    ),
  );

  tsBlocks.push(globalsTs, ...themesTs);
  await writeFile(TOKENS_TS_OUTPUT_PATH, tsBlocks.join("\n\n"));
}
