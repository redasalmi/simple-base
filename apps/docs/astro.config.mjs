import solid from "@astrojs/solid-js";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightSidebarTopics from "starlight-sidebar-topics";

export default defineConfig({
  integrations: [
    starlight({
      title: "Simple Base",
      description:
        "Design tokens, plain CSS, and accessible components built on native elements, for Solid and React.",
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/redasalmi/simple-base" },
      ],
      customCss: ["./src/styles/docs.css"],
      // The CSS package names these families but doesn't download them.
      head: [
        { tag: "link", attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" } },
        {
          tag: "link",
          attrs: { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@400;500;600&family=Atkinson+Hyperlegible+Next:wght@400;500;600;700&family=Young+Serif&display=swap",
          },
        },
      ],
      components: {
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
