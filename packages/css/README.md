# @simple-base/css

Component styles and typography for Simple Base. Plain CSS, no build step, no runtime — the selectors are the API.

The package holds two things: the styles for every [@simple-base/solid](https://www.npmjs.com/package/@simple-base/solid) component and its parts, and the typography of the design system. Page layouts, component galleries, and showcase helpers belong in your application.

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

Colors come from [@simple-base/tokens](https://www.npmjs.com/package/@simple-base/tokens), which ships nine themes. Without `data-theme`, the page follows the system color scheme, with `simple-base-dark` or `simple-base-light`. Set `data-theme` on the root or on any nested region to pick a theme:

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

## Migrating to 0.16.0

The package now styles only the `@simple-base/solid` components and the typography, class names follow the selector conventions below, and aliases are gone. Rename these in your markup:

| Before                                                    | After                                                                                              |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `.sb-select-root`                                         | `.sb-select`                                                                                       |
| `.sb-tabs` (tab list), `.sb-tab`, `.sb-tab-panel`         | `.sb-tabs-list`, `.sb-tabs-trigger`, `.sb-tabs-content`                                            |
| —                                                         | `.sb-tabs` on the element that wraps the list and its panels                                       |
| `.sb-page-button`, `.sb-page-ellipsis`                    | `.sb-pagination-button`, `.sb-pagination-ellipsis`                                                 |
| `.sb-shortcut`                                            | `.sb-kbd`, from the `kbd` stylesheet                                                               |
| `.sb-choice`                                              | `.sb-choice-list-item`                                                                             |
| `.sb-status-dot`                                          | `.sb-status-line-dot`                                                                              |
| `.sb-empty-mark`                                          | `.sb-empty-state-mark`                                                                             |
| `strong` and `p` inside `.sb-status-line` and `.sb-alert` | `.sb-status-line-title`, `.sb-status-line-description`, `.sb-alert-title`, `.sb-alert-description` |
| `strong` and `p` inside `.sb-toast`                       | `.sb-toast-title`, `.sb-toast-description`                                                         |
| `p` inside `.sb-empty-state`                              | `.sb-empty-state-description`                                                                      |
| `label`, `legend`, and `small` inside `.sb-field`         | `.sb-field-label`, `.sb-field-title`, `.sb-field-description`                                      |

These styles have no Solid component and were removed: breadcrumb, disclosure, progress, range, segmented control, the native select (`.sb-select-wrap` and `select.sb-select`), the native `<details>` menu (`.sb-menu` and `.sb-menu-panel`), `.sb-date-picker-presets`, and `.sb-live-region`. So were the date picker's inline and range-selection states, and the invalid state of `.sb-field-description`; show an error with `.sb-field-error`.

## Individual stylesheets

Each entry point is an explicit, extensionless subpath. The internal `styles/` directory and `.css` filenames are not public import paths.

`alert-dialog` · `badge` · `button` · `card` · `checkbox` · `combobox` · `date-picker` · `dialog` · `empty-state` · `field` · `input` · `kbd` · `menu` · `number-field` · `pagination` · `radio` · `select` · `status` · `switch` · `table` · `tabs` · `textarea` · `tooltip` · `typography`

## Design conventions

The default Simple Base themes follow the Studio direction: warm paper neutrals, a forest green accent, and type chosen for legibility.

- Body text uses Atkinson Hyperlegible Next and code uses Atkinson Hyperlegible Mono. `.sb-display` and `.sb-heading-1` through `.sb-heading-3` use the Young Serif display face at a regular weight; `.sb-heading-4` through `.sb-heading-6` stay in the body face. Headings are sized 2.25, 1.75, 1.5, 1.25, 1.125, and 1rem (36 to 16px at the default browser font size). The package names these families but does not download them — load the fonts in your app, or the system fallbacks apply.
- Write captions, table headings, and optional dialog kickers in sentence case. Monospace is for code, identifiers, shortcuts, and alignment-dependent values.
- Status never relies on color alone. Success, warning, danger, and info badges include a glyph, field errors lead with a warning glyph, and the switch thumb shows a check or a cross. Glyphs, status dots, and alert marks take the status `base` color, so the status stays visible in themes whose palette color is too light or dark to set the label in.
- The accent badge is a solid accent fill, like the primary button, so it stays readable in every ported palette.
- Depth comes from edges, not blur. Cards use a border and a 1px baseline; blurred shadows are reserved for menus, popovers, dialogs, and toasts. Modal backdrops separate context with a scrim, not blur.
- Every `.sb-card` ships its own interior padding; override `.sb-card` from application CSS when a layout needs different spacing.
- Buttons stay in place on hover; pressing scales them slightly, except under `prefers-reduced-motion`. Disabled buttons drop their color rather than fading, so the label stays readable.
- Sizes are in `rem`, so text, spacing, and controls grow together when a user raises the browser's default font size. Borders, focus rings, and shadows stay in `px`.
- Every size, color, duration, and easing comes from a `--sb-semantic-*` token or from one of the component variables below.
- Layout uses logical properties, so components mirror in right-to-left documents.
- Focus is a solid 2px ring in the theme's focus color. Standalone controls offset it by 2px; bordered fields draw it flush with their border.

## Selector conventions

- `.sb-<component>` is the required root class.
- `.sb-<component>-<part>` is a part of that component.
- Configuration uses `data-*` attributes; state uses `data-*`, `aria-*`, or native pseudo-classes (`:checked`, `:disabled`, `:hover`, `:focus-visible`, `[open]`).
- Element selectors only appear as descendants of a root class, to style the structure a component renders when it has no part class. They are not standalone hooks.

### Variants and options

| Attribute      | Component                      | Values                                                                                     |
| -------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| `data-variant` | `.sb-badge`                    | `default`, `success`, `danger`, `warning`, `info`, `accent`, `command`, `outline`, `muted` |
| `data-variant` | `.sb-button`                   | `primary`, `secondary`, `tertiary`, `ghost`, `danger`, `danger-subtle`                     |
| `data-variant` | `.sb-card`                     | `flat`, `rule`                                                                             |
| `data-variant` | `.sb-table` cell               | `code`, `number`                                                                           |
| `data-size`    | `.sb-badge`                    | `small`, `medium`                                                                          |
| `data-size`    | `.sb-button`                   | `small`, `medium`, `large`                                                                 |
| `data-variant` | `.sb-menu-item`                | `danger`                                                                                   |
| `data-status`  | `.sb-status-line`, `.sb-alert` | `success`, `warning`, `danger`, `info`                                                     |
| `data-status`  | `.sb-toast`                    | `success`, `warning`                                                                       |

### State attributes

| Selector                                                                                       | Applies to                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[aria-invalid="true"]`                                                                        | `.sb-input`, `.sb-textarea`, `.sb-checkbox`, `.sb-radio`                                                                                                                                                                                                                                                                                                               |
| `[data-invalid]`                                                                               | `.sb-select-control`, `.sb-combobox-control`, `.sb-number-field-control`, `.sb-date-picker-control`                                                                                                                                                                                                                                                                    |
| `[aria-selected="true"]`                                                                       | `.sb-tabs-trigger`, `.sb-table tbody tr`                                                                                                                                                                                                                                                                                                                               |
| `[data-state="checked"]`                                                                       | `.sb-select-item`, `.sb-combobox-item`                                                                                                                                                                                                                                                                                                                                 |
| `[aria-sort="ascending"]`, `[aria-sort="descending"]`                                          | `.sb-table th` (styles its `.sb-table-sort-button`)                                                                                                                                                                                                                                                                                                                    |
| `[aria-current="page"]`                                                                        | `.sb-pagination-button`                                                                                                                                                                                                                                                                                                                                                |
| `[aria-disabled="true"]`                                                                       | `.sb-button`, `.sb-tabs-trigger`, `.sb-pagination-button`                                                                                                                                                                                                                                                                                                              |
| `:disabled`                                                                                    | `.sb-button`, `.sb-tabs-trigger`, form controls                                                                                                                                                                                                                                                                                                                        |
| `[data-disabled]`                                                                              | `.sb-tabs-trigger`, `.sb-menu-item`, `.sb-select-control`, `.sb-select-item`, `.sb-combobox-control`, `.sb-combobox-item`, `.sb-number-field-control`, `.sb-number-field-trigger`, `.sb-date-picker-control`, `.sb-date-picker-nav-trigger`, `.sb-date-picker-cell-trigger`; on `.sb-field-label`, `.sb-field-title`, `.sb-field-description`, or any ancestor of them |
| `[data-state="open"]`                                                                          | `.sb-select-trigger`, `.sb-date-picker-trigger`, `.sb-tooltip-content`                                                                                                                                                                                                                                                                                                 |
| `[data-highlighted]`                                                                           | `.sb-select-item`, `.sb-combobox-item`, `.sb-menu-item`                                                                                                                                                                                                                                                                                                                |
| `[data-placeholder-shown]`                                                                     | `.sb-select-trigger`                                                                                                                                                                                                                                                                                                                                                   |
| `[data-required]`                                                                              | `.sb-field-label`, `.sb-field-title`                                                                                                                                                                                                                                                                                                                                   |
| `[data-instant]`                                                                               | `.sb-tooltip-content` (skips the enter animation)                                                                                                                                                                                                                                                                                                                      |
| `[data-readonly]`                                                                              | `.sb-date-picker` (removes the trigger's hover state)                                                                                                                                                                                                                                                                                                                  |
| `[data-view]`, `[data-selected]`, `[data-today]`, `[data-outside-range]`, `[data-unavailable]` | `.sb-date-picker-cell-trigger`                                                                                                                                                                                                                                                                                                                                         |
| `[open]`                                                                                       | `.sb-alert-dialog-content`                                                                                                                                                                                                                                                                                                                                             |
| `[data-state="open"]`, `[data-state="closed"]`                                                 | `.sb-toaster .sb-toast`                                                                                                                                                                                                                                                                                                                                                |

### Component reference

| Component       | Root                                                                                              | Parts                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alert           | `.sb-alert`                                                                                       | `-mark`, `-content`, `-title`, `-description`, `-actions`, `-close`                                                                                       |
| Alert dialog    | `.sb-alert-dialog-content`                                                                        | `-icon`, `-header`, `-kicker`, `-title`, `-description`, `-footer`                                                                                        |
| Badge           | `.sb-badge`                                                                                       | —                                                                                                                                                         |
| Button          | `.sb-button`                                                                                      | —                                                                                                                                                         |
| Card            | `.sb-card`                                                                                        | —                                                                                                                                                         |
| Checkbox        | `.sb-checkbox`                                                                                    | —                                                                                                                                                         |
| Choice list     | `.sb-choice-list`                                                                                 | `-item`                                                                                                                                                   |
| Combobox        | `.sb-combobox`                                                                                    | `-control`, `-input`, `-trigger`, `-content`, `-list`, `-item`, `-empty`                                                                                  |
| Date picker     | `.sb-date-picker`                                                                                 | `-control`, `-input`, `-trigger`, `-content`, `-view-control`, `-view-trigger`, `-nav-trigger`, `-table`, `-table-header`, `-table-cell`, `-cell-trigger` |
| Dialog          | `.sb-dialog-content`                                                                              | `-header`, `-kicker`, `-title`, `-description`, `-footer`, `-close`                                                                                       |
| Empty state     | `.sb-empty-state`                                                                                 | `-mark`, `-title`, `-description`, `-actions`                                                                                                             |
| Field           | `.sb-field`, `.sb-fieldset`                                                                       | `-label`, `-title`, `-description`, `-error`                                                                                                              |
| Input           | `.sb-input`                                                                                       | —                                                                                                                                                         |
| Kbd             | `.sb-kbd`                                                                                         | —                                                                                                                                                         |
| Menu            | `.sb-menu-content`                                                                                | `.sb-menu-item`, `-item-shortcut`, `-group-label`, `-separator`                                                                                           |
| Number field    | `.sb-number-field`                                                                                | `-control`, `-input`, `-affix`, `-trigger`                                                                                                                |
| Pagination      | `.sb-pagination`                                                                                  | `-button`, `-ellipsis`                                                                                                                                    |
| Radio           | `.sb-radio`                                                                                       | —                                                                                                                                                         |
| Select          | `.sb-select`                                                                                      | `-control`, `-trigger`, `-value-text`, `-indicator`, `-content`, `-list`, `-item`, `-empty`                                                               |
| Status line     | `.sb-status-line`                                                                                 | `-dot`, `-content`, `-title`, `-description`                                                                                                              |
| Switch          | `.sb-switch`                                                                                      | —                                                                                                                                                         |
| Table           | `.sb-table`                                                                                       | `-wrap`, `-sort-button`, `-sort-indicator`                                                                                                                |
| Tabs            | `.sb-tabs`                                                                                        | `-list`, `-trigger`, `-content`                                                                                                                           |
| Textarea        | `.sb-textarea`                                                                                    | —                                                                                                                                                         |
| Toast           | `.sb-toaster` (region), `.sb-toast`                                                               | `-icon`, `-content`, `-title`, `-description`, `-action`, `-close`                                                                                        |
| Tooltip         | `.sb-tooltip-content`                                                                             | —                                                                                                                                                         |
| Typography      | `.sb-display`, `.sb-heading-1` … `.sb-heading-6`, `.sb-text-*`, `.sb-code-text`, `.sb-code-block` | —                                                                                                                                                         |
| Visually hidden | `.sb-visually-hidden`                                                                             | —                                                                                                                                                         |

The Alert, Status line, and Toast styles ship together in the `status` stylesheet, and Choice list in `field`.

`.sb-checkbox:indeterminate` draws a dash for a partly selected group. `indeterminate` is a DOM property with no HTML attribute, so set it from script (`input.indeterminate = true`); the browser clears it when the user toggles the box.

For a sortable column, put a `button.sb-table-sort-button` as the only child of the `th`, ending with an empty `span.sb-table-sort-indicator` marked `aria-hidden`. The indicator shows both directions while unsorted and an arrow when the `th` has `aria-sort="ascending"` or `"descending"`. Set `aria-sort` on the sorted column only; sorting stays in your app.

`.sb-kbd` styles one key. Write a shortcut as one `kbd.sb-kbd` per key, such as `Ctrl` and `K`.

### Component variables

Sizes that belong to a single component are custom properties on its root, so you can change them without overriding the rules that use them:

| Variable                                                            | Set on                     | Default                       |
| ------------------------------------------------------------------- | -------------------------- | ----------------------------- |
| `--sb-dialog-width`                                                 | `.sb-dialog-content`       | `35rem`                       |
| `--sb-alert-dialog-width`                                           | `.sb-alert-dialog-content` | `35rem`                       |
| `--sb-empty-state-min-height`                                       | `.sb-empty-state`          | `13.125rem`                   |
| `--sb-menu-min-width`                                               | `.sb-menu-content`         | `12.5rem`                     |
| `--sb-switch-width`, `--sb-switch-height`, `--sb-switch-thumb-size` | `.sb-switch`               | `3rem`, `1.75rem`, `1.125rem` |
| `--sb-textarea-min-height`                                          | `.sb-textarea`             | `7.5rem`                      |
| `--sb-toaster-width`                                                | `.sb-toaster`              | `22.5rem`                     |
| `--sb-tooltip-max-width`                                            | `.sb-tooltip-content`      | `17.5rem`                     |

### Form text

Every form component uses the same label, description, and error classes, so their text looks identical wherever it appears. Select, Combobox, Number field, and Date picker have no label, description, or error classes of their own:

```html
<div class="sb-number-field">
  <label class="sb-field-label" for="quantity" data-required>Quantity</label>
  <div class="sb-number-field-control">…</div>
  <p class="sb-field-description" id="quantity-description">Whole units only.</p>
  <p class="sb-field-error" id="quantity-error">Enter at least 1.</p>
</div>
```

These classes live in the `field` stylesheet. The `select`, `combobox`, `number-field`, and `date-picker` stylesheets import it themselves, so loading any of them alone still styles its text.

### Element selectors

These rules style the markup a component renders where it has no part class.

| Parent                                                                                                                                        | Elements                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `.sb-button`, `.sb-alert-dialog-icon`, `.sb-alert-mark`, `.sb-select-indicator`, `.sb-combobox-trigger`                                       | `svg`                                                  |
| `.sb-menu-item`, `.sb-tabs-trigger`, `.sb-pagination-button`, `.sb-empty-state-mark`, `.sb-alert-close`                                       | `svg`                                                  |
| `.sb-number-field-trigger`, `.sb-date-picker-trigger`, `.sb-date-picker-nav-trigger`, `.sb-dialog-close`, `.sb-toast-icon`, `.sb-toast-close` | `svg`                                                  |
| `.sb-tooltip-content`                                                                                                                         | `.sb-kbd`                                              |
| `.sb-fieldset`                                                                                                                                | `legend`                                               |
| `.sb-choice-list-item`                                                                                                                        | `span`, `input` (via `:has`)                           |
| `.sb-table`                                                                                                                                   | `caption`, `th`, `td`, `thead`, `tbody`, `tfoot`, `tr` |

### Positioned popups

Select, combobox, date picker, menu, and tooltip content are positioned the same way: the [Zag.js](https://zagjs.com) popper writes `--x`, `--y`, `--z-index`, `--available-width`, `--available-height`, `--reference-width`, and `--transform-origin` on the positioner, and the content reads them. The tooltip sets `--arrow-size` and `--arrow-background` for the Zag arrow. `@simple-base/solid` provides that behavior for select, combobox, date picker, menu, and tooltip. Without the Solid package, position the content yourself.

### Toast region

Toast styles ship with `status`. Inside `.sb-toaster`, toasts are positioned by the `--x`, `--y`, `--scale`, `--height`, `--opacity`, and `--z-index` variables that the [Zag.js toast machine](https://zagjs.com/components/solid/toast) writes, and the region reads `--viewport-offset-left` and `--viewport-offset-right`; `@simple-base/solid` provides that behavior. Outside a toaster, `.sb-toast` is a static surface.

## Versioning

Simple Base is on 0.x. All its packages go to 1.0.0 together, once `@simple-base/react` ships the same components as `@simple-base/solid`. Until then a minor release can include breaking changes.

## Links

- [Repository](https://github.com/redasalmi/simple-base)
- [Design tokens](https://www.npmjs.com/package/@simple-base/tokens)
- [Solid components](https://www.npmjs.com/package/@simple-base/solid)

## License

[MIT](https://github.com/redasalmi/simple-base/blob/main/LICENSE)
