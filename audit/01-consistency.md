# Consistency of patterns and API

All 27 components share the same base. Each one types its props as `JSX.*HTMLAttributes` plus its contract options. Each one calls `splitProps(props, ["class", ...])`, sets `class={cn("sb-…", local.class)}`, spreads the rest, and passes variants through `data-*` attributes. That base is solid. The gaps are in the compound components, where each one evolved slightly differently.

## Component matrix

| Component           | Root renders an element | `id` prop        | Label                                               | Description and Error parts | Value shape   |
| ------------------- | ----------------------- | ---------------- | --------------------------------------------------- | --------------------------- | ------------- |
| Field               | yes                     | yes              | `FieldLabel`                                        | yes                         | native        |
| Fieldset            | yes                     | via attrs        | `FieldsetLegend`                                    | yes                         | native        |
| NumberField         | yes                     | yes              | `NumberFieldLabel` (children)                       | yes                         | `string`      |
| DatePicker          | yes                     | yes              | `DatePickerLabel` (children)                        | yes                         | `DateValue[]` |
| Select              | yes                     | yes              | **`label` prop required**, `SelectLabel` optional   | **no**                      | `string`      |
| Combobox            | yes                     | yes              | **`label` prop required**, `ComboboxLabel` optional | **no**                      | `string`      |
| Tabs                | yes                     | **no** (omitted) | n/a                                                 | n/a                         | `string`      |
| Menu, Tooltip       | no (provider)           | **no**           | n/a                                                 | n/a                         | n/a           |
| Dialog, AlertDialog | no (provider)           | **no**           | n/a                                                 | n/a                         | n/a           |
| Pagination          | yes (`nav`)             | via attrs        | n/a                                                 | n/a                         | `number`      |

## Findings

### C1. Select and Combobox are built differently from the other form controls (High)

`Select.tsx` and `Combobox.tsx` require a `label: string` option. They use it as an `aria-label` fallback on the trigger, the input, and the list. `SelectLabel` and `ComboboxLabel` render that string when they have no children. NumberField and DatePicker instead take the label only as children of a Label part, and they offer `*Description` and `*Error` parts wired to `aria-describedby`. Select and Combobox have no such parts (see [A1](02-accessibility.md)).

Recommendation: give Select and Combobox the same shape as NumberField and DatePicker. Add `SelectDescription`, `SelectError`, `ComboboxDescription`, and `ComboboxError`, built on the shared message helper in [R1](05-refactoring-helpers.md). Then decide whether `label` stays required. If the Label part is always rendered, the `aria-label` fallbacks are redundant (see [Z5](03-zag-compliance.md)).

### C2. Root prop type names differ (High, public API)

- Most compound roots export `XRootProps`: `SelectRootProps`, `ComboboxRootProps`, `MenuRootProps`, `TabsRootProps`, `FieldRootProps`, and so on.
- `NumberFieldProps` and `DatePickerProps` drop the `Root`.
- `DialogProps` and `AlertDialogProps` are aliases that sit next to `DialogRootProps` and `AlertDialogRootProps` (`Dialog.tsx:250`, `AlertDialog.tsx:269`).
- `NumberFieldTriggerProps` is shared by Increment and Decrement, while Pagination exports a `PaginationTriggerProps` for two different parts.

Recommendation: before 1.0, rename to `NumberFieldRootProps` and `DatePickerRootProps`, and drop the `DialogProps` and `AlertDialogProps` aliases. Renaming after 1.0 is a breaking change.

### C3. Some components accept a caller `id` and others don't (Medium)

Select, Combobox, NumberField, DatePicker, and Field read `local.id ?? createUniqueId()`. Menu, Tooltip, and Tabs always use `createUniqueId()` (`Menu.tsx:44`, `Tooltip.tsx:39`, `Tabs.tsx:36`), and `TabsRootProps` omits `id`. Apps that deep-link to a tab panel, or tests that query by id, can't set one.

Recommendation: accept an optional `id` on every Zag root, read the same way.

### C4. Value shape for a single selection (High, public API)

Select and Combobox flatten Zag's `string[]` to `string`, with `""` meaning no selection. DatePicker is single-date for v1, but it still exposes Zag's array: `value?: DateValue[]` and `onValueChange(value: DateValue[], valueAsString: string[])`. Callers write `value={[date]}` and read `value[0]`.

Recommendation: decide now. Either expose `DateValue | null` the way Select exposes `string`, or document that the array leaves room for range mode after v1. Changing the shape later is a breaking change.

### C5. Contract type exports and subpath names (High, public API)

- `@simple-base/solid` re-exports some contract types, such as `DialogOptions`, `FieldOptions`, and `PaginationOptions`. It does not re-export `SelectOption`, `ComboboxOption`, `SelectOptions`, `ComboboxOptions`, or `Placement`. `SelectOption` is the type callers need for their own options arrays, so today they have to install `@simple-base/contracts` just to get it.
- Contract subpaths mix styles: `./numberField` and `./datePicker` are camelCase, while the CSS package uses `./number-input` and `./date-picker`. `./field` is missing; it is already in `todo.md`.
- The CSS name for NumberField is `sb-number-input*`. Other components match their CSS name, such as `sb-select*` for Select.

Recommendation: re-export every option type that a component's props reference. Pick one subpath style (kebab-case matches the CSS package) and add `./field`.

### C6. Decorative "mark" parts handle `aria-hidden` two ways (Low)

`AlertMark`, `StatusLineDot`, `EmptyStateMark`, `ToastIcon`, and `NumberFieldAffix` omit `aria-hidden` from their types and force `true`. `AlertDialogIcon` (`AlertDialog.tsx:157-163`) lets callers override it and defaults to `true`.

Recommendation: pick one approach. Forcing `true` is simpler. If an icon ever needs a name, the caller can use a different element.

### C7. Title parts (Medium)

- `AlertTitle` and `StatusLineTitle` render a bare `<strong>` with no `sb-` class and no `splitProps`. `ToastTitle` renders `<strong class="sb-toast-title">`.
- `DialogTitle` is a fixed `h2` and `AlertDialogTitle` is a fixed `h3` (`AlertDialog.tsx:190`). `EmptyStateTitle` takes a `level` prop.

Recommendation: give every title part a class. Give Dialog and AlertDialog titles the same `level` prop as `EmptyStateTitle`, or at least the same default level (see [A7](02-accessibility.md)).

### C8. Triggers (Low)

`MenuTrigger`, `TooltipTrigger`, `DialogTrigger`, and `AlertDialogTrigger` render a styled `Button` and forward `variant` and `size`. `SelectTrigger`, `ComboboxTrigger`, `DatePickerTrigger`, `ToastClose`, and `AlertClose` render a plain `<button>`. That split is reasonable, since the first group are standalone buttons and the second sit inside a control. It should be written down in the README so new parts follow it.

`TooltipTrigger` sets `type="button"` but `MenuTrigger` doesn't. This is harmless, because Zag's menu trigger props already set `type`.

### C9. Context error messages (Low)

Some hooks throw `"useSelect must be used within a Select"`, `"useNumberField …"`, or `"useDatePicker …"`, which name a hook that isn't public. Others throw `"Menu parts must be used within a Menu"`.

Recommendation: use the "X parts must be used within an X" form everywhere. [R2](05-refactoring-helpers.md) does this as a side effect.

### C10. Where defaults live (Low)

`badgeDefaults`, `buttonDefaults`, `paginationDefaults`, and `toastDefaults` live in contracts. The toaster defaults (`placement: "bottom-end"`, `duration: 5000`) are inline in `Toast.tsx:48-50`. The DatePicker placement default (`"bottom-start"`) is inline in `DatePicker.tsx:81`. The Pagination labels `"Previous page"`, `"Next page"`, and `"Page N"` are hard-coded.

Recommendation: keep every documented default in contracts, so the future React adapter shares them.

### C11. Import order and style (Low)

`NumberField.tsx` and `DatePicker.tsx` import Zag first and `solid-js` second. Every other file imports `solid-js` first. Specifier order inside the `solid-js` import also varies. Turning on oxfmt's import sorting option settles it. Check the option name in the installed oxfmt's configuration schema.
