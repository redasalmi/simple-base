import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// The "ssr" mode builds hydratable client code and the server entry.
export default defineConfig(({ mode }) => ({
  plugins: [solid({ ssr: mode === "ssr" })],
}));
