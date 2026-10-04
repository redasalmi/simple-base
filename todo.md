# Roadmap

Simple Base stays as close to native HTML as possible. Components style and wire native elements and ARIA states; app-specific affordances such as loading states, spinners, and skeletons belong in the consuming app.

v1 covers `@simple-base/tokens`, `@simple-base/css`, `@simple-base/contracts`, and `@simple-base/solid`. The first consumer is an invoicing app, so v1 is scoped to what it needs.

## Shipped

Solid components with styles: Button, Badge, Card, Input, TextArea, Checkbox, Radio, Switch, Field, NumberField, DatePicker (single date), Select, Combobox, Table, Dialog, AlertDialog, Toast.

## v1 components

These already have styles in `@simple-base/css` unless noted.

- [ ] **Menu** — Solid component for the popup menu (`.sb-menu-content`), positioned like Select. Row actions on lists.
- [ ] **Tooltip** — Solid component, positioned like Select. Names icon-only buttons.
- [ ] **Tabs** — Solid component over `.sb-tabs`, `.sb-tab`, `.sb-tab-panel`. Status filters and settings pages.
- [ ] **Pagination** — Solid component over `.sb-pagination` and `.sb-page-button`.
- [ ] **Alert and StatusLine** — thin Solid wrappers over `.sb-alert` and `.sb-status-line`.
- [ ] **Fieldset, RadioGroup, CheckboxGroup** — Solid wrappers over the native `fieldset` with `.sb-fieldset`, `.sb-choice-list`, and `.sb-choice`.
- [ ] **EmptyState** — thin Solid wrapper over `.sb-empty-state`.
- [x] **Checkbox indeterminate** — new CSS: `.sb-checkbox:indeterminate` draws a dash. `appearance: none` currently hides the native state. `indeterminate` is a DOM property, not an attribute; the Solid `Checkbox` takes an `indeterminate` prop and sets it under `prop:`.
- [ ] **Sortable table headers** — new CSS: a header button and a direction indicator driven by `aria-sort` on `th`. Sorting stays in the app.

## v1 tasks

- [x] Bring the package and playground READMEs up to date with the exports
- [ ] Tokens: generate better JS consts and TS types
- [ ] Tokens: refactor and improve the `tailwind.css` output
- [ ] Contracts: add a `./field` subpath export (`FieldOptions` is only exported from the root)
- [ ] Add behavior tests for the stateful components (Select, Combobox, DatePicker, NumberField, Toast, form reset)
- [ ] Release 1.0.0 across all four packages and start a changelog

## After v1

Components:

- DatePicker range selection and presets (the styles already exist)
- Segmented control, Breadcrumb, Disclosure, Progress, Range, Keyboard shortcut as Solid components (the styles already exist)
- Popover, Drawer, Avatar, file upload
- Compact density mode

Packages and tooling (see `structure.md`):

- React adapter and React playground
- Vanilla playground
- Documentation site
- End-to-end and package-consumer tests

## Out of scope

- Loading states, spinners, and skeletons — build them in the app.
- Typography components — the `.sb-display`, `.sb-heading-*`, and `.sb-text-*` classes are the API.
