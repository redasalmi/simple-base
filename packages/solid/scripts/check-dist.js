import { existsSync } from "node:fs";

const files = ["dist/index.js", "dist/index.jsx", "dist/index.d.ts"];
const missing = files.filter((file) => !existsSync(file));

if (missing.length > 0) {
  console.error(`Build output is missing: ${missing.join(", ")}`);
  process.exit(1);
}
