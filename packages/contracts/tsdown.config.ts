import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/*.ts"],
  platform: "neutral",
  dts: true,
  publint: { strict: true },
  attw: { level: "error" },
});
