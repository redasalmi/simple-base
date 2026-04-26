import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "SimpleBaseSolid",
      fileName: "simple-base-solid",
      formats: ["es"],
    },
    rolldownOptions: {
      external: ["solid-js", "solid-js/web", "@simple-base/tokens"],
    },
  },
});
