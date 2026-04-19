import { readdir } from "node:fs/promises";
import { THEMES_DIR } from "./config.js";

export async function listThemeFiles() {
  return (await readdir(THEMES_DIR)).filter((file) => file.endsWith(".json"));
}
