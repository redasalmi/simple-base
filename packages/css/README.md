# @simple-base/css

Simple Base component styles and typography.

Styles cover components and their internal parts, including functional wrappers
such as select arrows and scrollable tables. Page layouts, component galleries,
and external grouping or showcase helpers belong in the consuming application.

## Visual defaults

- Use `.sb-heading-1` through `.sb-heading-6` for utility headings: sans serif,
  sized 32, 24, 20, 18, 16, and 14px. Reserve `.sb-display` for an intentional
  expressive serif heading, not routine page sections or dialogs.
- Write captions, table headings, and optional dialog kickers in sentence case.
  Monospace is for code, identifiers, shortcuts, and alignment-dependent values;
  omit eyebrows that repeat the heading or add no context.
- Cards group content through surfaces and borders, without default elevation.
  Menus and dialogs use restrained shadows, lighter in light themes. Modal
  backdrops separate context with a scrim, not blur.
- Generic dialog kickers are neutral. Danger styling belongs to destructive
  confirmations, not ordinary settings or editing dialogs.
- Buttons stay in place on hover and press. Color and border changes provide
  feedback; focus rings remain visible.

## All styles

Import the stylesheet for its side effects through a CSS-aware bundler:

```ts
import "@simple-base/css";
```

Or import it from CSS:

```css
@import "@simple-base/css";
```

The package root includes the token stylesheet. Stylesheet imports do not export
a JavaScript value or CSS string.

## Individual stylesheets

Load tokens once, then select the component styles you need:

```css
@import "@simple-base/tokens/css";
@import "@simple-base/css/button";
@import "@simple-base/css/badge";
```

Individual stylesheets use explicit, extensionless exports such as `/button`,
`/badge`, `/alert-dialog`, and `/typography`. The internal `styles/` directory and
`.css` filenames are not public import paths. These exports also support
side-effect imports in TypeScript:

```ts
import "@simple-base/css/button";
```

## Selector API

The selectors are the public API of this package. Component roots and parts are
classes; configuration and state are attributes, never modifier classes.

### Cascade layer

Every rule is wrapped in the `sb` cascade layer and declared before the imports:

```css
@layer sb;
```

Because the library is layered, any unlayered CSS in the consuming app wins over
it regardless of specificity, so overrides do not need `!important`:

```css
/* app styles, unlayered */
.sb-button {
  border-radius: 0;
}
```

Note on order: if a layered framework such as Tailwind CSS is imported _before_
this package, the `sb` layer is declared after the framework layers and wins on
ties. Import this package first if framework utilities need the higher priority.

### Conventions

- `.sb-<component>` is the required root class.
- `.sb-<component>-<part>` is a part of that component.
- Configuration uses `data-*` attributes; state uses `data-*`, `aria-*`, or
  native pseudo-classes (`:checked`, `:disabled`, `:hover`, `:focus-visible`,
  `[open]`).
- Element selectors are only used as descendants of a root class, to style the
  structure a component renders. They are not standalone hooks and imply the
  markup contract listed below.

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
| `data-padding` | `.sb-card`                                  | `true`                                                                                     |

### State attributes

- `[aria-invalid="true"]` — `.sb-input`, `.sb-textarea`.
- `[data-invalid]` — `.sb-select-control`, `.sb-combobox-control`, `.sb-field-help`.
- `[aria-selected="true"]` — `.sb-tab`, and `.sb-table tbody tr`.
- `[aria-pressed="true"]` — `.sb-segment`.
- `[aria-current="page"]` — `.sb-page-button`.
- `[aria-disabled="true"]`, `:disabled` — `.sb-button`, `.sb-select`, form controls.
- `[data-state="open"]` — `.sb-select-trigger`, `.sb-combobox-trigger`.
- `[data-highlighted]` — `.sb-select-item`, `.sb-combobox-item`.
- `[data-placeholder-shown]`, `[data-required]` — `.sb-select`, `.sb-combobox`.
- `[open]` — `.sb-dialog`, `.sb-alert-dialog`, `.sb-disclosure`, `.sb-menu`.

### Component reference

| Component         | Root                                                                         | Parts                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Alert dialog      | `.sb-alert-dialog`                                                           | `-icon`, `-content`, `-kicker`, `-title`, `-description`, `-actions`, `-close`                        |
| Badge             | `.sb-badge`                                                                  | —                                                                                                     |
| Breadcrumb        | `.sb-breadcrumb`                                                             | `-separator`                                                                                          |
| Button            | `.sb-button`                                                                 | —                                                                                                     |
| Card              | `.sb-card`                                                                   | —                                                                                                     |
| Checkbox          | `.sb-checkbox`                                                               | —                                                                                                     |
| Combobox          | `.sb-combobox`                                                               | `-label`, `-control`, `-input`, `-trigger`, `-content`, `-list`, `-item`, `-empty`                    |
| Dialog            | `.sb-dialog`                                                                 | `-head`, `-title`, `-kicker`, `-copy`, `-actions`, `-close`                                           |
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

These rules style the markup a component renders. Use the listed elements, or
add a part class where one is available.

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
