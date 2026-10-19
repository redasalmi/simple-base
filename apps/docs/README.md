# Docs

The Simple Base documentation site, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). It documents `@simple-base/tokens`, `@simple-base/css`, and the component packages, and replaces the Solid playground.

## Structure

The sidebar has three topics, one per content folder in `src/content/docs/`:

- **Tokens** (`tokens/`): the token pages render their tables from `@simple-base/tokens` at build time. Every read goes through `src/lib/tokens.ts`, so a change to the tokens' JS or CSS output touches only that file.
- **CSS** (`css/`): one page per stylesheet. `CssReference` lists the classes, states, component variables, and tokens of the published stylesheet, and `HtmlExample` renders a plain HTML specimen from `src/examples/html/` and shows it as its source.
- **Components** (`components/`): one page per component, shared by every framework. `Example` renders a component example from `src/examples/<framework>/` and shows it as its source, so every example type-checks and the axe run covers it. `ApiTable` lists its options.

## Frameworks

Solid and React have the same components, so a component page shows one example per framework, and the framework picker in the header shows the selected one. `src/frameworks.ts` lists the frameworks:

- Each example exists once per framework, at the same path: `src/examples/solid/select/SingleValue.tsx` and `src/examples/react/select/SingleValue.tsx`. Data without JSX lives in `src/examples/shared/`.
- `Example` renders every framework's version on the server and hides the others with CSS. The examples hydrate with `client:visible`, so only the selected framework's run. A missing example fails the build once its framework is `released`.
- `FrameworkCode` shows a snippet with each framework's package name, and `<Framework only="solid">` holds prose for one framework.

To add React: install `@astrojs/react`, add it to `astro.config.mjs` with `include: ["**/examples/react/**"]` next to Solid's, add a `src/examples/react/Demo.tsx` like the Solid one, render it in `Example.astro`, and set `released` once every example has a React version.

## Themes

The theme picker replaces Starlight's light and dark switch. `ThemeProvider` sets `data-theme` on `<html>` to a token theme, which styles the docs and every example, and `data-color-scheme` to its light or dark scheme for the code blocks. `src/styles/docs.css` maps Starlight's colors and fonts to the semantic tokens and orders the cascade layers as `starlight, sb`. The `head` option in `astro.config.mjs` loads the fonts from Google Fonts, since the CSS package names them but doesn't download them.

## Development

Run commands from the repository root using pnpm.

```sh
pnpm install
pnpm exec turbo run dev --filter=docs
```

Turbo builds the packages, then starts the Solid library watcher alongside Astro.

## Checks

```sh
pnpm exec turbo run build typecheck test --filter=docs
```

- `typecheck` runs `astro sync` and `tsc`. It checks the examples and the TypeScript modules, but not `.astro` or `.mdx` files: `@astrojs/check` doesn't support the TypeScript 7 this repository uses yet.
- `test` opens every built page in Chromium, hydrates its examples, and runs axe in all nine themes for every released framework (`scripts/axe.js`).
