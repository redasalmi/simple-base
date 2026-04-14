simple-base/
|
|-- apps/
| `-- docs/ # Astro + Starlight public documentation site
|
|-- packages/
|   |-- tokens/ # Design tokens package (JSON source of truth + generated CSS/TS outputs)
|   |   |-- src/
|   |   |   |-- globals/ # Core token groups shared across themes
|   |   |   |   |-- colors.json
|   |   |   |   |-- layer.json
|   |   |   |   |-- motion.json
|   |   |   |   |-- opacity.json
|   |   |   |   |-- radius.json
|   |   |   |   |-- size.json
|   |   |   |   |-- space.json
|   |   |   |   |-- stroke.json
|   |   |   |   `-- typography.json
| | | |
| | | |-- themes/ # Theme-specific token maps and overrides
| | | | |-- simple-base-light.json
| | | | |-- simple-base-dark.json # future
| | | | |-- brand-a-light.json # future
| | | | `-- brand-a-dark.json # future
|   |   |   |
|   |   |   `-- build.ts # Style Dictionary build script for CSS and TS artifacts
| | |
| | |-- dist/
| | | |-- css/
| | | | |-- globals.css # generated CSS custom properties
| | | | `-- themes.css # generated theme selectors / overrides
|   |   |   |
|   |   |   |-- js/
|   |   |   |   `-- index.js # generated token exports
| | | |
| | | |-- types/
| | | | `-- index.d.ts # generated TS declarations
|   |   |   |
|   |   |   `-- json/
| | | `-- tokens.json # generated merged token payload
|   |   |
|   |   |-- package.json
|   |   `-- README.md
| |
| |-- fonts/ # Optional font assets package
| | |-- src/
| | |-- dist/
| | `-- README.md
|   |
|   |-- react/ # Thin React adapter package
|   |   |-- src/
|   |   |-- dist/
|   |   `-- README.md
| |
| |-- solid/ # Thin Solid adapter package
| | |-- src/
| | |-- dist/
| | `-- README.md
|   |
|   `-- config/ # Shared repo configs
| |-- tsconfig/
| `-- oxlint/
|
|-- .changeset/ # Versioning + changelogs
|-- .github/
|   `-- workflows/ # CI + publishing
|
|-- turbo.json
|-- pnpm-workspace.yaml
|-- package.json
|
|-- README.md
|-- CONTRIBUTING.md
|-- CODE_OF_CONDUCT.md
|-- LICENSE
`-- SECURITY.md
