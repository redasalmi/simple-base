import { rm } from "node:fs/promises";
import { buildCssTokens } from "./buildc-css-tokens.js";
import { buildTsTokens } from "./build-typescript-tokens.js";
import { TOKENS_OUTPUT_DIR } from "./config.js";

try {
  console.log("Building CSS tokens...");
  await buildCssTokens();
  console.log("\nBuilding TS tokens...");
  await buildTsTokens();
  console.log("\n==============================================");
  console.log("\nBuild completed!");
} catch (err) {
  await rm(TOKENS_OUTPUT_DIR, { recursive: true, force: true });
  console.error("Build failed:", err);
}
