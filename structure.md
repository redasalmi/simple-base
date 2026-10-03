# Repository structure

## Current (v1)

```text
simple-base/
├── apps/
│   └── solid-playground/       # Vite preview of every Solid component and CSS pattern
│       ├── src/
│       │   ├── App.tsx
│       │   └── preview/        # One file per section
│       ├── index.html
│       ├── vite.config.ts
│       └── package.json
│
├── packages/
│   ├── tokens/                 # @simple-base/tokens, generated with Terrazzo
│   │   ├── src/
│   │   │   ├── primitives/     # effects, motion, sizing, typography
│   │   │   ├── semantic/       # color, effects, motion, sizing, typography
│   │   │   ├── themes/         # nine theme files
│   │   │   ├── simple-base.resolver.json
│   │   │   └── tailwind.template.css
│   │   ├── terrazzo.config.ts
│   │   └── package.json
│   │
│   ├── css/                    # @simple-base/css, plain CSS with no build step
│   │   ├── styles/             # One stylesheet per component
│   │   ├── styles.css          # Package root: tokens and every component
│   │   └── package.json
│   │
│   ├── contracts/              # @simple-base/contracts, shared option types and defaults
│   │   ├── src/                # One file per component
│   │   ├── tsdown.config.ts
│   │   └── package.json
│   │
│   └── solid/                  # @simple-base/solid
│       ├── src/
│       │   ├── components/     # One file per component
│       │   └── index.ts
│       ├── tsdown.config.ts
│       └── package.json
│
├── .github/workflows/
│   ├── ci.yml                  # Lint, format, typecheck, build
│   └── publish.yml             # npm publish on release
├── .oxfmtrc.json
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

Linting uses oxlint and formatting uses oxfmt, both run from the root.

## Planned after v1

These are not part of v1. See `todo.md` for the component roadmap.

```text
apps/
├── docs/                       # Documentation site with React and Solid examples
├── react-playground/
└── vanilla-playground/

packages/
├── react/                      # @simple-base/react, same contracts as the Solid adapter
└── testing/                    # Shared component, keyboard, and theme cases

tests/
├── e2e/                        # react, solid, vanilla, shared
└── package-consumers/          # Install-and-import checks for react and solid
```
