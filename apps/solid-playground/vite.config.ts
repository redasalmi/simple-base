import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  resolve: {
    dedupe: ["solid-js"],
  },
  // The playground is one page that includes the source of every example.
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
