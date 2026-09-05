```text
simple-base-design-system/
├── apps/
│ ├── docs/
│ │ ├── src/
│ │ │ ├── content/
│ │ │ │ └── docs/
│ │ │ ├── components/
│ │ │ │ ├── react/
│ │ │ │ └── solid/
│ │ │ └── styles/
│ │ ├── astro.config.mjs
│ │ └── package.json
│ │
│ ├── vanilla-playground/
│ │ ├── src/
│ │ ├── index.html
│ │ ├── vite.config.ts
│ │ └── package.json
│ │
│ ├── react-playground/
│ │ ├── src/
│ │ ├── vite.config.ts
│ │ └── package.json
│ │
│ └── solid-playground/
│ ├── src/
│ ├── vite.config.ts
│ └── package.json
│
├── packages/
│ ├── tokens/
│ │ ├── src/
│ │ │ ├── primitives/
│ │ │ │ ├── effects.tokens.json
│ │ │ │ ├── motion.tokens.json
│ │ │ │ ├── sizing.tokens.json
│ │ │ │ └── typography.tokens.json
│ │ │ │
│ │ │ ├── semantic/
│ │ │ │ ├── effects.tokens.json
│ │ │ │ ├── motion.tokens.json
│ │ │ │ ├── sizing.tokens.json
│ │ │ │ └── typography.tokens.json
│ │ │ │
│ │ │ ├── themes/
│ │ │ │ ├── catppuccin-frappe.tokens.json
│ │ │ │ ├── catppuccin-latte.tokens.json
│ │ │ │ ├── catppuccin-macchiato.tokens.json
│ │ │ │ ├── catppuccin-mocha.tokens.json
│ │ │ │ ├── dracula.tokens.json
│ │ │ │ ├── nord.tokens.json
│ │ │ │ ├── simple-base-dark.tokens.json
│ │ │ │ ├── simple-base-light.tokens.json
│ │ │ │ └── tokyo-night.tokens.json
│ │ │ │
│ │ │ ├── simple-base.resolver.json
│ │ │ └── tailwind.template.css
│ │ │
│ │ ├── dist/
│ │ │ ├── tailwind.css
│ │ │ ├── tokens.css
│ │ │ ├── tokens.d.ts
│ │ │ └── tokens.js
│ │ ├── terrazzo.config.ts
│ │ ├── package.json
│ │ └── tsconfig.json
│ │
│ ├── styles/
│ │ ├── src/
│ │ │ ├── layers.css
│ │ │ ├── base.css
│ │ │ ├── reset.css
│ │ │ ├── components/
│ │ │ │ ├── button.css
│ │ │ │ ├── field.css
│ │ │ │ ├── checkbox.css
│ │ │ │ ├── dialog.css
│ │ │ │ ├── menu.css
│ │ │ │ ├── select.css
│ │ │ │ ├── tabs.css
│ │ │ │ └── tooltip.css
│ │ │ ├── utilities/
│ │ │ │ ├── visually-hidden.css
│ │ │ │ └── focus-ring.css
│ │ │ ├── all.css
│ │ │ └── with-reset.css
│ │ ├── scripts/
│ │ │ └── build-css.mjs
│ │ ├── package.json
│ │ └── dist/
│ │
│ ├── contracts/
│ │ ├── src/
│ │ │ ├── button.ts
│ │ │ ├── dialog.ts
│ │ │ ├── field.ts
│ │ │ ├── select.ts
│ │ │ └── index.ts
│ │ ├── tsdown.config.ts
│ │ └── package.json
│ │
│ ├── react/
│ │ ├── src/
│ │ │ ├── button/
│ │ │ │ ├── Button.tsx
│ │ │ │ └── index.ts
│ │ │ ├── dialog/
│ │ │ ├── select/
│ │ │ └── index.ts
│ │ ├── tsdown.config.ts
│ │ └── package.json
│ │
│ ├── solid/
│ │ ├── src/
│ │ │ ├── button/
│ │ │ │ ├── Button.tsx
│ │ │ │ └── index.ts
│ │ │ ├── dialog/
│ │ │ ├── select/
│ │ │ └── index.ts
│ │ ├── tsdown.config.ts
│ │ └── package.json
│ │
│ ├── testing/
│ │ ├── src/
│ │ │ ├── component-cases.ts
│ │ │ ├── keyboard-cases.ts
│ │ │ └── theme-cases.ts
│ │ └── package.json
│ │
│ └── config/
│ ├── tsconfig/
│ ├── vitest/
│ └── package.json
│
├── tests/
│ ├── e2e/
│ │ ├── react/
│ │ ├── solid/
│ │ ├── vanilla/
│ │ └── shared/
│ └── package-consumers/
│ ├── react/
│ └── solid/
│
├── .changeset/
├── .github/
│ └── workflows/
│ ├── ci.yml
│ └── release.yml
├── biome.json
├── stylelint.config.mjs
├── browserslist
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```
