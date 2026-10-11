# Repository structure

## Current

```text
simple-base/
├── apps/
│   └── solid-playground/       # Vite preview of every Solid component and CSS pattern
│       ├── scripts/
│       │   └── axe.js          # axe on every section in every theme (its `test` task)
│       ├── src/
│       │   ├── App.tsx
│       │   ├── examples/       # One component per example, rendered and shown as source
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
├── scripts/smoke/              # Installs the packed packages in a scratch Vite app
│
├── .github/workflows/
│   ├── ci.yml                  # Lint, format, typecheck, test, build, smoke test
│   └── publish.yml             # npm trusted publishing on release, or by hand as a dry run
├── .oxfmtrc.json
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

Linting uses oxlint and formatting uses oxfmt, both run from the root.

## Planned for v1

The packages go to 1.0.0 once the React adapter has every component the Solid adapter has. See `todo.md`.

```text
apps/
└── react-playground/

packages/
└── react/                      # @simple-base/react, same contracts and components as the Solid adapter
```

## Planned after v1

See `todo.md` for the component roadmap.

```text
apps/
├── docs/                       # Documentation site with React and Solid examples
└── vanilla-playground/

packages/
└── testing/                    # Shared component, keyboard, and theme cases

tests/
├── e2e/                        # react, solid, vanilla, shared
└── package-consumers/          # Install-and-import checks for react and solid
```
