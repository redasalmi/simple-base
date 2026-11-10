import solid from "@astrojs/solid-js";
import starlight from "@astrojs/starlight";
import { defineConfig, fontProviders } from "astro/config";
import starlightSidebarTopics from "starlight-sidebar-topics";

export default defineConfig({
  // The CSS package names these families but doesn't download them. Astro self-hosts them and adds
  // metric-matched fallbacks, which docs.css swaps into the font tokens.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Atkinson Hyperlegible Next",
      cssVariable: "--font-atkinson-hyperlegible-next",
      weights: [400, 500, 600, 700],
      fallbacks: [
        "Atkinson Hyperlegible",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "sans-serif",
      ],
    },
    {
      provider: fontProviders.google(),
      name: "Atkinson Hyperlegible Mono",
      cssVariable: "--font-atkinson-hyperlegible-mono",
      weights: [400, 500, 600],
      fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
    },
    {
      provider: fontProviders.google(),
      name: "Young Serif",
      cssVariable: "--font-young-serif",
      weights: [400],
      fallbacks: ["Iowan Old Style", "Charter", "Georgia", "serif"],
    },
  ],
  integrations: [
    starlight({
      title: "Simple Base",
      description:
        "Design tokens, plain CSS, and accessible components built on native elements, for Solid and React.",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/redasalmi/simple-base" },
      ],
      customCss: ["./src/styles/docs.css"],
      components: {
        Head: "./src/components/overrides/Head.astro",
        ThemeProvider: "./src/components/overrides/ThemeProvider.astro",
        ThemeSelect: "./src/components/overrides/ThemeSelect.astro",
      },
      plugins: [
        starlightSidebarTopics(
          [
            {
              label: "Tokens",
              link: "/tokens/",
              icon: "setting",
              items: [{ autogenerate: { directory: "tokens" } }],
            },
            {
              label: "CSS",
              link: "/css/",
              icon: "pencil",
              items: [{ autogenerate: { directory: "css" } }],
            },
            {
              label: "Components",
              link: "/components/",
              icon: "puzzle",
              items: [{ autogenerate: { directory: "components" } }],
            },
          ],
          { exclude: ["/"] },
        ),
      ],
    }),
    // The Solid package ships JSX under its "solid" export condition, so its files go through the
    // Solid compiler too. In this workspace they resolve to packages/solid.
    solid({ include: ["**/examples/solid/**", "**/packages/solid/dist/**"] }),
  ],
});
