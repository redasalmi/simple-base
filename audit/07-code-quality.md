# Code quality and best practices

Overall the code is small, consistent, and readable. The comments explain the reasons behind non-obvious choices. Types are strict, and owned props are blocked with the `?: never` mapping, which also catches hyphenated `aria-*` attributes. The main gaps are testing and lint coverage.

## Q1. No tests (High)

The repo has no test runner, no test files, and no `test` task in turbo. The behavior most likely to regress has no coverage:

- Zag adapter behavior and every workaround in [03](03-zag-compliance.md): partial number input, date typing, form reset for Select, NumberField, DatePicker, and native inputs, and Combobox form submission.
- Controlled and uncontrolled modes: Dialog, Pagination, RadioGroup (including the drift in [A5](02-accessibility.md)), CheckboxGroup, Tabs, Select, and Combobox.
- Field and Fieldset `aria-describedby` wiring when Description and Error mount and unmount.
- Toast queueing, update by `id`, and `dismiss`.

`todo.md` already lists "behavior tests for the stateful components". Concretely:

- **Vitest browser mode** (Playwright provider) with `@solidjs/testing-library` and `@testing-library/user-event`. Zag depends on real layout, focus, and pointer events, which jsdom doesn't model well.
- **Axe checks** (`axe-core`) on each component's default rendering, and on the playground pages in CI.
- Add a `test` task to `turbo.json` and run it in both workflows.

## Q2. Lint covers only the default rules (Medium)

The root `lint` script runs `oxlint .` with no config file, so only oxlint's default `correctness` rules run. Nothing checks:

- **JSX accessibility.** oxlint ships a `jsx-a11y` plugin. Enable it.
- **Solid reactivity mistakes**, such as destructured props, reading reactive values outside a tracking scope, or `.map()` where `<For>` belongs. `eslint-plugin-solid` is the official tool. oxlint's JS-plugin support can load ESLint plugins (check its status in the installed version), or run ESLint with only `eslint-plugin-solid` on `packages/solid`.
- **Import hygiene and TypeScript rules**: oxlint's `import` and `typescript` plugins, plus the `suspicious` and `perf` categories.

Add a `.oxlintrc.json` with those plugins and categories, and fix whatever turns up before 1.0.

## Q3. Dev-only checks and errors in production (Low)

- `validateWidgetOptions` throws in production for duplicate or empty option values. Throwing during render takes down the subtree. That is right for a dev mistake but costly in production. Guard it with `isDev` (see [P2](04-performance.md)).
- Every context hook throws when a part is used outside its root. That's correct, and it should stay.

## Q4. Contract quality (Medium)

- `DialogOptions` has no JSDoc, while every other options type documents controlled and uncontrolled modes.
- `SelectOptions` and `ComboboxOptions` leave `disabled`, `invalid`, `required`, `placement`, and `onOpenChange` undocumented, while NumberField and DatePicker document theirs.
- `options: SelectOption[]` should be `readonly` (see [R9](05-refactoring-helpers.md)).
- `ToastStatus` is `"success" | "warning"` only. That fits the "toasts confirm, alerts warn" design, but it should be stated in the JSDoc, since Zag's `type` also supports `error` and `info`.
- `NumberFieldOptions.form` is "read on mount; later changes are not tracked", while `DatePickerOptions.form` is reactive. Make them behave the same, or document why they differ.

## Q5. Hard-coded strings (Medium)

See [A11](02-accessibility.md). The first consumer is an invoicing app, and French is likely. Pagination, NumberField triggers, and DatePicker translations need a way to override them. Store the English defaults in contracts so the React adapter shares them.

## Q6. Public surface and naming (High, freeze before 1.0)

Covered in [C2](01-consistency.md) (prop type names), [C4](01-consistency.md) (DatePicker value shape), and [C5](01-consistency.md) (missing type re-exports and subpath naming). After 1.0, each of these is a semver-major change.

Also worth deciding now:

- `index.ts` exports internal-looking names such as `parseDate`, a rename of Zag's `parse`. Document it, or name it after its source to avoid confusion with `@internationalized/date`'s own `parseDate`, which has different semantics.
- `useFieldset` is exported from `Fieldset.tsx` (for RadioGroup and CheckboxGroup) but not from `index.ts`. That's fine. Put such shared hooks in `internal/` so it's obvious they are private.

## Q7. Documentation drift risk (Low)

`packages/solid/README.md` (40 kB) and the playground's code strings repeat every component's usage by hand. `todo.md` says the READMEs were brought up to date. Without tests or type-checked examples, they will drift. Moving playground snippets into real `.tsx` files that are both rendered and shown as source would make the examples type-checked.

## Q8. Small items (Low)

- `Input` restricts `type` to text-like values (`Input.tsx:4`), which is intentional, since numbers and dates have their own components. Document that so people don't open issues about it.
- `Switch` requires `aria-label` or `aria-labelledby` through a union type (`Switch.tsx:4-6`). That stops a Switch from being named by a wrapping `<label>` or a `<label for>`, which are both valid native ways to name a control. `Checkbox` and `Radio` don't require it. Either loosen it, or document that Switch is meant to stand alone.
- `DatePickerCalendar` spreads `props` onto its root with no `sb-` class and no `splitProps` (`DatePicker.tsx:341`), unlike every other part.
- `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, and `TableCaption` are pass-throughs with no class. That's fine, because the CSS targets descendants of `.sb-table`. But it means they add nothing over raw elements. Either document them as optional or give them classes.
