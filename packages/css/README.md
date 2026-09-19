# @simple-base/css

Component styles and typography for Simple Base. Plain CSS, no build step, no runtime — the selectors are the API.

Styles cover components and their internal parts, including functional wrappers such as select arrows and scrollable tables. Page layouts, component galleries, and showcase helpers belong in your application.

## Install

```sh
pnpm add @simple-base/css
```

## Quick start

The package root includes the tokens and every component stylesheet. Import it once for its side effects:

```ts
import "@simple-base/css";
```

Or from CSS:

```css
@import "@simple-base/css";
```

Neither form exports a JavaScript value or a CSS string — the import exists for its side effects.

To load only what you use, import the tokens first and then the components you need:

```css
@import "@simple-base/tokens/css";
@import "@simple-base/css/button";
@import "@simple-base/css/badge";
@import "@simple-base/css/table";
```

Then apply the root class and configuration attributes:

```html
<button class="sb-button" data-variant="primary" data-size="medium">Save</button>
<span class="sb-badge" data-variant="success" data-size="small">Active</span>
```

## Theming

Colors come from [@simple-base/tokens](https://www.npmjs.com/package/@simple-base/tokens), which ships nine themes. Set `data-theme` on the root or on any nested region:

```html
<html data-theme="nord"></html>
```

## Cascade layer

Every Simple Base rule lives in the `sb` cascade layer. The library declares that layer; your application decides where it sits by declaring the full order before the imports:

```css
@layer theme, base, sb, components, utilities;

@import "tailwindcss";
@import "@simple-base/css";
```

That order keeps resets out of the way and puts your own styles last:

| Layer        | Holds                    | Relative to `sb` |
| ------------ | ------------------------ | ---------------- |
| `theme`      | Tailwind theme variables | before           |
| `base`       | Tailwind preflight reset | before           |
| `sb`         | Every Simple Base rule   | —                |
| `components` | Application components   | after            |
| `utilities`  | Tailwind utilities       | after            |

Layer priority is compared before specificity for normal declarations, so a later layer wins a conflict even when the earlier rule is more specific. Tailwind's preflight `padding: 0` on `*` cannot strip a card's padding, while `p-0` on that same card can set it.

Customize anything the library styles with one of these. None of them needs `!important`:

```html
<!-- Tailwind utility -->
<div class="sb-card p-0">…</div>
```

```css
/* Application component, in the components layer */
@layer components {
  .card-flush {
    padding: 0;
  }
}
```

```css
/* Unlayered application CSS — always wins */
.checkout .sb-card {
  padding: var(--sb-semantic-space-4);
}
```

```html
<!-- Inline style -->
<div class="sb-card" style="padding: 1rem">…</div>
```

The library sits before all of your layers, so it never needs `!important`. Reserve that for conflicts between your own styles, such as one utility that has to beat another.

If another layered framework shares the page, name its layers in the same statement and place them deliberately instead of relying on import order.

## Migrating to 0.2.0

Card padding is no longer an option — it is part of the `.sb-card` surface:

- `data-padding` was removed from this package.
- `CardOptions.padding` and `cardDefaults` were removed from [@simple-base/contracts](https://www.npmjs.com/package/@simple-base/contracts).
- Base and flat cards that were previously unpadded now receive the stylesheet's default interior padding.
- Rule cards keep top-only padding.
- `variant` is unchanged: `flat`, `rule`, or omitted for the base surface.

If a layout needs the previous unpadded look, override it from your own styles:

```html
<!-- Tailwind utility, given the layer order above -->
<div class="sb-card p-0">…</div>
```

```css
/* Application component */
@layer components {
  .card-flush {
    padding: 0;
  }
}

/* Unlayered application CSS */
.checkout-summary .sb-card {
  padding: 0;
}
```

## Individual stylesheets

Each entry point is an explicit, extensionless subpath. The internal `styles/` directory and `.css` filenames are not public import paths.

`alert-dialog` · `badge` · `breadcrumb` · `button` · `card` · `checkbox` · `combobox` · `dialog` · `disclosure` · `empty-state` · `field` · `input` · `keyboard-shortcut` · `menu` · `pagination` · `progress` · `radio` · `range` · `segmented-control` · `select` · `status` · `switch` · `table` · `tabs` · `textarea` · `typography`

## Design conventions

- Use `.sb-heading-1` through `.sb-heading-6` for utility headings — sans serif, sized 32, 24, 20, 18, 16, and 14px. Reserve `.sb-display` for an intentional expressive serif heading, not routine page sections or dialogs.
- Write captions, table headings, and optional dialog kickers in sentence case. Monospace is for code, identifiers, shortcuts, and alignment-dependent values.
- Cards group content with surfaces and borders, without default elevation. Every `.sb-card` ships its own interior padding; override `.sb-card` from application CSS when a layout needs different spacing. Menus and dialogs use restrained shadows. Modal backdrops separate context with a scrim, not blur.
- Buttons stay in place on hover and press. Color and border changes provide feedback; focus rings remain visible.

## Selector conventions

- `.sb-<component>` is the required root class.
- `.sb-<component>-<part>` is a part of that component.
- Configuration uses `data-*` attributes; state uses `data-*`, `aria-*`, or native pseudo-classes (`:checked`, `:disabled`, `:hover`, `:focus-visible`, `[open]`).
- Element selectors only appear as descendants of a root class, to style the structure a component renders. They are not standalone hooks.

### Variants and options

| Attribute      | Component                                   | Values                                                                                     |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `data-variant` | `.sb-badge`                                 | `default`, `success`, `danger`, `warning`, `info`, `accent`, `command`, `outline`, `muted` |
| `data-variant` | `.sb-button`                                | `primary`, `secondary`, `tertiary`, `ghost`, `danger`, `danger-subtle`                     |
| `data-variant` | `.sb-card`                                  | `flat`, `rule`                                                                             |
| `data-variant` | `.sb-table` cell                            | `code`, `number`                                                                           |
| `data-size`    | `.sb-badge`                                 | `small`, `medium`                                                                          |
| `data-size`    | `.sb-button`                                | `small`, `medium`, `large`                                                                 |
| `data-status`  | `.sb-status-line`, `.sb-alert`, `.sb-toast` | `success`, `danger`, `info`                                                                |

### State attributes

| Selector                                      | Applies to                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------ |
| `[aria-invalid="true"]`                       | `.sb-input`, `.sb-textarea`                                                    |
| `[data-invalid]`                              | `.sb-select-control`, `.sb-combobox-control`, `.sb-field-help`                 |
| `[aria-selected="true"]`                      | `.sb-tab`, `.sb-table tbody tr`                                                |
| `[aria-pressed="true"]`                       | `.sb-segment`                                                                  |
| `[aria-current="page"]`                       | `.sb-page-button`                                                              |
| `[aria-disabled="true"]`, `:disabled`         | `.sb-button`, `.sb-select`, form controls                                      |
| `[data-state="open"]`                         | `.sb-select-trigger`, `.sb-combobox-trigger`                                   |
| `[data-highlighted]`                          | `.sb-select-item`, `.sb-combobox-item`                                         |
| `[data-placeholder-shown]`, `[data-required]` | `.sb-select`, `.sb-combobox`                                                   |
| `[open]`                                      | `.sb-dialog-content`, `.sb-alert-dialog-content`, `.sb-disclosure`, `.sb-menu` |

### Component reference

| Component         | Root                                                                         | Parts                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Alert dialog      | `.sb-alert-dialog-content`                                                   | `-trigger`, `-icon`, `-header`, `-kicker`, `-title`, `-description`, `-footer`, `-cancel`, `-action`  |
| Badge             | `.sb-badge`                                                                  | —                                                                                                     |
| Breadcrumb        | `.sb-breadcrumb`                                                             | `-separator`                                                                                          |
| Button            | `.sb-button`                                                                 | —                                                                                                     |
| Card              | `.sb-card`                                                                   | —                                                                                                     |
| Checkbox          | `.sb-checkbox`                                                               | —                                                                                                     |
| Combobox          | `.sb-combobox`                                                               | `-label`, `-control`, `-input`, `-trigger`, `-content`, `-list`, `-item`, `-empty`                    |
| Dialog            | `.sb-dialog-content`                                                         | `-trigger`, `-header`, `-title`, `-kicker`, `-description`, `-footer`, `-close`, `-action`            |
| Disclosure        | `.sb-disclosure`                                                             | `-copy`                                                                                               |
| Empty state       | `.sb-empty-state`                                                            | `-mark` (alias `.sb-empty-mark`)                                                                      |
| Field             | `.sb-field`, `.sb-fieldset`                                                  | `-title`, `-help`, `.sb-choice-list`, `.sb-choice`                                                    |
| Input             | `.sb-input`                                                                  | —                                                                                                     |
| Keyboard shortcut | `.sb-shortcut`                                                               | —                                                                                                     |
| Menu              | `.sb-menu`                                                                   | `-panel`, `-item`                                                                                     |
| Pagination        | `.sb-pagination`                                                             | `.sb-page-button`                                                                                     |
| Progress          | `.sb-progress`                                                               | —                                                                                                     |
| Radio             | `.sb-radio`                                                                  | —                                                                                                     |
| Range             | `.sb-range`                                                                  | `.sb-range-readout`                                                                                   |
| Segmented control | `.sb-segmented-control` (alias `.sb-segmented`)                              | `.sb-segment`                                                                                         |
| Select            | `.sb-select-root` (compound)                                                 | `-label`, `-control`, `-trigger`, `-value-text`, `-indicator`, `-content`, `-list`, `-item`, `-empty` |
| Select (native)   | `.sb-select-wrap`                                                            | `.sb-select`                                                                                          |
| Status            | `.sb-status-line`, `.sb-alert`, `.sb-toast`                                  | `-dot`, `-icon`, `.sb-alert-mark`, `.sb-live-region`                                                  |
| Switch            | `.sb-switch`                                                                 | —                                                                                                     |
| Table             | `.sb-table-wrap`, `.sb-table`                                                | —                                                                                                     |
| Tabs              | `.sb-tabs`                                                                   | `.sb-tab`, `.sb-tab-panel`                                                                            |
| Textarea          | `.sb-textarea`                                                               | —                                                                                                     |
| Typography        | `.sb-display`, `.sb-heading-1` … `.sb-heading-6`, `.sb-text-*`, `.sb-code-*` | —                                                                                                     |

### Element selectors

These rules style the markup a component renders. Use the listed elements, or add a part class where one is available.

| Parent                                                                                    | Elements                     |
| ----------------------------------------------------------------------------------------- | ---------------------------- |
| `.sb-alert-dialog-icon`, `.sb-alert-mark`, `.sb-select-indicator`, `.sb-combobox-trigger` | `svg`                        |
| `.sb-breadcrumb`                                                                          | `a`                          |
| `.sb-disclosure`, `.sb-menu`                                                              | `summary`                    |
| `.sb-empty-state`                                                                         | `p`                          |
| `.sb-status-line`, `.sb-alert`, `.sb-toast`                                               | `strong`, `p`                |
| `.sb-field`                                                                               | `label`, `legend`, `small`   |
| `.sb-choice`                                                                              | `span`, `input` (via `:has`) |
| `.sb-progress`                                                                            | `span`                       |
| `.sb-table`                                                                               | `th`, `td`, `tbody`, `tr`    |

## Links

- [Repository](https://github.com/redasalmi/simple-base)
- [Design tokens](https://www.npmjs.com/package/@simple-base/tokens)
- [Solid components](https://www.npmjs.com/package/@simple-base/solid)

## License

[MIT](https://github.com/redasalmi/simple-base/blob/main/LICENSE)
