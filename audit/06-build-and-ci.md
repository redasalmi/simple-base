# Build, packaging, and CI audit

`pnpm quality` and `pnpm build` both pass on `main`. Lint and format are clean, and all 9 and 4 turbo tasks succeed. The findings below are about correctness under concurrency, about what gets published, and about what CI doesn't check.

## Build: `@simple-base/solid`

### B1. The two tsdown configs race on `dist/` (High)

`packages/solid/tsdown.config.ts` exports two configs: a compiled `index.js` and a JSX-preserving `index.jsx`. tsdown runs them in parallel. The build log shows both:

- "Cleaning 3 files", so each config empties `dist/` at its own start,
- "Emit types … dist/index.d.ts", so both write the same declaration file.

It works today because both start together. If one config starts after the other has finished, the clean step deletes the first one's output.

Fix: set `dts: false, clean: false` on the second config, and keep `clean` and `dts` on the first. Add a CI check that `dist/` contains `index.js`, `index.jsx`, and `index.d.ts` after the build (see B6).

### B2. tsconfig and tsdown disagree about `jsx` (Low)

The build prints `CONFIGURATION_FIELD_CONFLICT: compilerOptions.jsx … is overridden by jsx from transform`. That override is intended for the preserve build. Silence the warning by making it explicit, or by pointing that config at a tsconfig override, so a real conflict doesn't get lost in the noise.

### B3. Declarations are built with TypeScript 7 (Medium)

The catalog pins `typescript: ~7.0.2`. tsdown warns: "TypeScript 7.0 does not yet have a stable API and is experimental. Some options will be unavailable." The `.d.ts` files are the public type contract for 1.0.

Recommendation: diff `dist/index.d.ts` against a build made with the TypeScript 5.x or 6.x API that tsdown fully supports. If they differ, generate declarations with the stable compiler until tsdown drops the warning. Check tsdown's docs for how to choose the compiler that emits declarations.

### B4. Peer and dependency ranges (Medium)

- `solid-js` peer is `^1.9.12`, but development and testing run on 1.9.15. `Checkbox` relies on `indeterminate` and `defaultChecked` being DOM properties in Solid's `Properties` set, which is true in 1.9.15. Either raise the peer floor to the version you test, or run CI against the floor too.
- `@internationalized/date` is a regular dependency of both `contracts` (for types only) and `solid`. Callers create `DateValue` objects themselves through `parseDate` or `CalendarDate`. If their copy and ours differ, comparisons and `instanceof` checks inside Zag can fail. Make it a `peerDependency` of `@simple-base/solid`. In contracts it is only a type, so `peerDependency` plus `devDependency` works there.
- The Zag packages are each `^1.44.0`. They share `@zag-js/core`, `dom-query`, and `popper`, so a consumer who resolves `@zag-js/select@1.45` next to `@zag-js/solid@1.44` gets two copies of core. I found stale 1.45 copies of core, popper, and menu in this repo's virtual store, which shows how easily that happens. Pin the Zag dependencies to one exact version in the catalog and bump them together, for example with a Renovate group.

### B5. Missing package metadata and checks (High)

- **No LICENSE in any published package.** `LICENSE` is only at the repo root, and npm only adds a LICENSE file automatically from the package's own folder. Copy it into each package, or add a prepack step.
- `description`, `keywords`, `homepage`, `bugs`, and `author` are missing from all four manifests.
- `contracts` and `tokens` exports have only an `import` condition. Add `default`, so `require(esm)` (Node ≥ 22) and tools that don't send `import` can still resolve them.
- Nothing checks the published shape. tsdown can run [publint](https://publint.dev) and [Are the Types Wrong](https://arethetypeswrong.github.io) during the build. Check the installed tsdown docs for the option names. Enable both for `contracts` and `solid`.
- `contracts` emits empty `.js` files for type-only modules (`card.js`, `dialog.js`, and others, 0 bytes). That is harmless. Mention in the README that these subpaths are type-only.

### B6. No published-package smoke test (Medium)

Nothing installs the packed tarballs and imports them. A minimal check before release:

1. `pnpm -r pack` into a temp folder.
2. Install the tarballs in a scratch Vite and Solid app.
3. Build it, and assert that `Button` and `Select` render and the CSS resolves `@simple-base/tokens/css`.

`todo.md` lists "package-consumer tests" after v1. A one-file version of this catches broken `exports` and `files` before 1.0.

## Monorepo and turbo

### B7. Task graph (Low)

- `typecheck` depends on `^build`, because `solid` reads `@simple-base/contracts` from `dist/`. That works, but every typecheck runs a build first. A custom export condition such as `"@simple-base/source": "./src/index.ts"`, enabled through `customConditions` in the internal tsconfigs, lets typecheck read source directly. This is optional.
- `@simple-base/tokens` has a `tsconfig.json` but no `typecheck` script, so `terrazzo.config.ts` is never type-checked.
- The `build` task's `inputs` include `.env*`, and no package uses env files. Remove it to cut cache misses.

### B8. Inconsistent tsconfigs (Low)

| Option                                                  | solid               | contracts | tokens | playground |
| ------------------------------------------------------- | ------------------- | --------- | ------ | ---------- |
| `verbatimModuleSyntax`                                  | —                   | —         | ✓      | ✓          |
| `noUnusedLocals` / `noUnusedParameters`                 | —                   | —         | —      | ✓          |
| `types: ["node"]`                                       | ✓ (browser library) | ✓         | ✓      | —          |
| `allowJs`, `strictNullChecks` (redundant with `strict`) | ✓                   | —         | —      | —          |

Add a shared `tsconfig.base.json`. Drop `@types/node` from `solid` (it's a DOM library, and Node typings change things like `setTimeout`'s return type). Turn on `verbatimModuleSyntax` and the unused checks everywhere. Consider `isolatedDeclarations` for `contracts`, which makes declaration emit fast and stable.

### B9. Leftover files (Low)

- `packages/solid/.gitignore` is a copy of Vite's template and adds nothing to the root `.gitignore`.
- `.npmrc` is empty.

## CI (`.github/workflows/ci.yml`)

### B10. What CI doesn't check (High)

CI runs lint, format, the token check, typecheck, and build. It doesn't run:

- tests (none exist; see [Q1](07-code-quality.md)),
- publint or attw (B5),
- the package smoke test (B6),
- an accessibility check such as axe on the playground (see [02](02-accessibility.md)).

### B11. Hardening (Low)

- Pin third-party actions to commit SHAs (`actions/checkout`, `pnpm/setup`), not to major tags.
- Add `timeout-minutes` to jobs.
- Turbo's local cache isn't kept between runs. Caching `.turbo` with `actions/cache`, keyed on the lockfile and the commit SHA, avoids rebuilding unchanged packages.

## Release (`.github/workflows/publish.yml`)

### B12. Publishing (Medium)

- The workflow writes `NPM_TOKEN` into `~/.npmrc` and publishes with `--provenance`. `id-token: write` is already granted, so npm's trusted publishing (OIDC) could remove the long-lived token entirely. Check that the pinned pnpm version supports it, then configure each package as a trusted publisher on npmjs.com.
- Versions are bumped by hand and differ per package (`solid` 0.17.0, `contracts` 0.12.0, `css` 0.14.2, `tokens` 0.2.0). There is no changelog, and `todo.md` already plans "Release 1.0.0 … and start a changelog". Changesets would handle the bumps, `workspace:^` updates, and changelogs, and its GitHub Action can open the release PR.
- The quality checks run again inside the publish job. That's good. Add the tests, publint/attw, and the smoke test there too, once they exist.
- The `dry_run` default of `true` for manual runs is a good safety net. Keep it.
