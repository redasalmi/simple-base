# Solid Playground

Vite app for previewing the components exported by `@simple-base/solid` and the
styles from `@simple-base/css`. Preview examples live in `src/preview/`.

Run commands from the repository root using pnpm.

## Development

```sh
pnpm install
pnpm dev
```

The workspace builds dependencies before starting Vite and watches the Solid
library with tsdown. Open the local URL printed by Vite.

To run only the playground and its library watcher:

```sh
pnpm exec turbo run dev --filter=solid-playground
```

Turbo starts the Solid watcher alongside Vite, after the initial library build.
Watch mode keeps the existing library output in place while rebuilding so Vite's
imports remain resolvable. Production builds still clean the output directory.

## Production build

```sh
pnpm exec turbo run build --filter=solid-playground
pnpm --filter solid-playground preview
```

Turbo builds the library and tokens before the playground. The app is emitted to
`apps/solid-playground/dist/`.

## Type checking

```sh
pnpm typecheck
# Or just the playground:
pnpm exec turbo run typecheck --filter=solid-playground
```

Turbo builds workspace dependencies before checking types. `pnpm check` and
`pnpm quality` also include both the library and playground type checks.
