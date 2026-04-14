import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import StyleDictionary from "style-dictionary";
import { formats, transformGroups } from "style-dictionary/enums";

async function generateThemeCss(theme: string, selector: string) {
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

async function buildCombinedThemeCss() {
  const cssBlocks: string[] = [];
  const globalsCss = await generateThemeCss("src/globals/**/*.json", ":root");

  const themes = readdirSync("src/themes").filter((file) => file.endsWith(".json"));
  const themesCss = await Promise.all(
    themes.map((theme) =>
      generateThemeCss(`src/themes/${theme}`, `[data-theme="${theme.replace(".json", "")}"]`),
    ),
  );

  cssBlocks.push(globalsCss, ...themesCss);
  mkdirSync("dist/web", { recursive: true });
  writeFileSync("dist/web/simple-base.css", `${cssBlocks.join("\n")}\n`);
}

try {
  console.log("Build started...");
  await buildCombinedThemeCss();
  console.log("\n==============================================");
  console.log("\nBuild completed!");
} catch (e) {
  rmSync("dist/web/simple-base.css", { force: true });
  console.error(e);
}
