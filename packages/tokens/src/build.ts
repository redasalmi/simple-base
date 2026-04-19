import { mkdir, rm } from "node:fs/promises";
import { buildCssTokens } from "./buildCssTokens.js";
import { buildTsTokens } from "./buildTsTokens.js";
import { TOKENS_OUTPUT_DIR } from "./config.js";

try {
  await mkdir(TOKENS_OUTPUT_DIR, { recursive: true });
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
