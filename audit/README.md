# v1 readiness audit

Audit of `@simple-base/solid`, `@simple-base/contracts`, `@simple-base/css`, `@simple-base/tokens`, the build, and CI. It was run on 2026-10-09 against `main` at `468e145`, with solid-js 1.9.15 and Zag 1.44.0 installed.

Each finding has a severity:

- **High**: fix before 1.0. It is a bug, an accessibility failure, or an API decision that is hard to change after 1.0.
- **Medium**: should land in 1.0, but it doesn't block the release.
- **Low**: polish. It can follow in 1.x.

## Reports

| File                                                     | Topic                                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------------------- |
| [01-consistency.md](01-consistency.md)                   | Component patterns and how consistent the API is                          |
| [02-accessibility.md](02-accessibility.md)               | Accessibility of the components and CSS, including a token contrast check |
| [03-zag-compliance.md](03-zag-compliance.md)             | Places where the code works around Zag instead of using its API           |
| [04-performance.md](04-performance.md)                   | Runtime cost, bundle cost, and tree-shaking                               |
| [05-refactoring-helpers.md](05-refactoring-helpers.md)   | Repeated code and the helpers that would remove it                        |
| [06-build-and-ci.md](06-build-and-ci.md)                 | tsdown, package manifests, turbo, and the GitHub workflows                |
| [07-code-quality.md](07-code-quality.md)                 | Types, contracts, tests, and lint                                         |
| [08-solid-best-practices.md](08-solid-best-practices.md) | The Solid code checked against the official docs                          |

## What was checked and how

- I read every file in `packages/solid/src`, `packages/contracts/src`, the build configs, the manifests, and the workflows. For the CSS I scanned the focus, motion, forced-colors, and `[hidden]` handling.
- `pnpm quality` and `pnpm build` both pass. Lint and format are clean.
- To answer the Zag questions, I read Zag's own source in `node_modules`: the select, combobox, number-input, date-picker, and toast `connect` and `machine` files, plus `@zag-js/solid`'s `mergeProps` and `normalizeProps`.
- I measured tree-shaking and per-component cost by bundling one export at a time from `dist/` with Vite.
- I computed WCAG contrast for the main foreground/background token pairs in all nine themes from `packages/tokens/dist/tokens.css`.
- I checked the Solid guidance against docs.solidjs.com and the Zag guidance against zagjs.com.

## Roadmap

[ROADMAP.md](ROADMAP.md) orders every open finding into phases, settles where the reports disagree, and records the product decisions made after the audit. Reports 01 and 02 are already implemented.

## Already in good shape

- Props are never destructured. `splitProps` is used everywhere, IDs come from `createUniqueId`, and there is one context per compound component. This matches the Solid docs.
- Tree-shaking works. Importing only `Button` from `dist/index.js` bundles to 943 bytes, and no Zag code leaks across components.
- Dialogs use native `<dialog>` with `showModal()`, so focus trapping, inertness, and Escape come from the browser.
- The CSS sits in `@layer sb`. It has `:focus-visible` rings, `prefers-reduced-motion` and `forced-colors` blocks in most component files, and `[hidden]` handling for toasts. Body text passes 4.5:1 in every theme.
- Comments explain why, not what, and the contracts carry useful JSDoc.
