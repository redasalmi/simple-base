import { readdir } from "node:fs/promises";
import { THEMES_DIR } from "./config.js";

export async function listThemeFiles() {
  const files = await readdir(THEMES_DIR);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  return jsonFiles.sort();
}
