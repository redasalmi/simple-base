# @simple-base/contracts

Framework-neutral component options and default values for Simple Base adapters.

CSS owns styling. Adapters own rendering, native props, and behavior. This package holds the shared custom options that more than one adapter needs — the types you pass to a component and the defaults applied when you omit them. Its one peer dependency is [`@internationalized/date`](https://www.npmjs.com/package/@internationalized/date), for the `DateValue` type used by the date picker options. It is only used as a type.

**Most applications don't need this package directly.** Install [@simple-base/solid](https://www.npmjs.com/package/@simple-base/solid) and it re-exports the option types it uses. Install this package when you are writing an adapter for another framework, or when you need the shared option types without a renderer.

## Install

```sh
pnpm add @simple-base/contracts
```

## Usage

```ts
import {
  buttonDefaults,
  type ButtonOptions,
  type ButtonSize,
  type ButtonVariant,
} from "@simple-base/contracts";

export function Button(props: ButtonOptions) {
  const variant = props.variant ?? buttonDefaults.variant;
  const size = props.size ?? buttonDefaults.size;

  return { "data-variant": variant, "data-size": size };
}
```

The same exports are available per component, which keeps imports narrow:

```ts
import { buttonDefaults, type ButtonVariant } from "@simple-base/contracts/button";
```

Subpaths: `/badge` · `/button` · `/card` · `/combobox` · `/date-picker` · `/dialog` · `/field` · `/fieldset` · `/listbox` · `/menu` · `/number-field` · `/pagination` · `/placement` · `/select` · `/status` · `/table` · `/tabs` · `/tooltip`

Subpaths without a `*Defaults` or `*Labels` constant, such as `/card`, `/dialog`, and `/select`, are type-only. Their JavaScript files are empty, so import them with `import type`.

## Options reference

| Component      | Types                                               | Defaults                                                                                                        |
| -------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Button         | `ButtonVariant`, `ButtonSize`, `ButtonOptions`      | `buttonDefaults`: `primary`, `medium`                                                                           |
| Badge          | `BadgeVariant`, `BadgeSize`, `BadgeOptions`         | `badgeDefaults`: `default`, `medium`                                                                            |
| Card           | `CardVariant`, `CardOptions`                        | —                                                                                                               |
| Combobox       | `ComboboxOption`, `ComboboxOptions`                 | —                                                                                                               |
| Date picker    | `DatePickerOptions`                                 | `datePickerDefaults`: `placement: "bottom-start"`                                                               |
| Dialog         | `DialogOptions`                                     | —                                                                                                               |
| Field          | `FieldOptions`                                      | —                                                                                                               |
| Fieldset       | `FieldsetOptions`, `FieldsetLabels`                 | `fieldsetLabels`: the English text read after a required legend                                                 |
| Radio group    | `RadioGroupOptions`                                 | —                                                                                                               |
| Checkbox group | `CheckboxGroupOptions`                              | —                                                                                                               |
| Listbox        | `ListboxOption`, `ListboxOptions`                   | —                                                                                                               |
| Menu           | `MenuOptions`, `MenuItemOptions`, `MenuItemVariant` | —                                                                                                               |
| Number field   | `NumberFieldOptions`                                | —                                                                                                               |
| Pagination     | `PaginationOptions`, `PaginationLabels`             | `paginationDefaults`: `defaultPage: 1`, `siblingCount: 1`; `paginationLabels`: the English accessible names     |
| Placement      | `Placement`                                         | —                                                                                                               |
| Select         | `SelectOption`, `SelectOptions`                     | —                                                                                                               |
| Status line    | `StatusValue`, `StatusOptions`                      | —                                                                                                               |
| Alert          | `AlertStatus`, `AlertOptions`                       | —                                                                                                               |
| Toast          | `ToastStatus`, `ToastOptions`, `ToasterOptions`     | `toastDefaults`: `status: "success"`; `toasterDefaults`: `placement: "bottom-end"`, `duration: 5000`, `max: 24` |
| Table cell     | `TableCellVariant`, `TableCellOptions`              | —                                                                                                               |
| Tabs           | `TabsOptions`                                       | —                                                                                                               |
| Tooltip        | `TooltipOptions`                                    | —                                                                                                               |

Types are erased at runtime. Only the `*Defaults` and `*Labels` constants are runtime exports — there are no allowed-value arrays without a runtime use case.

### Values

- **Button variants:** `primary`, `secondary`, `tertiary`, `ghost`, `danger`, `danger-subtle`. **Sizes:** `small`, `medium`, `large`. Apply the default attributes explicitly — the bare CSS class is not identical to every default variant rule.
- **Badge variants:** `default`, `success`, `danger`, `warning`, `info`, `accent`, `command`, `outline`, `muted`. **Sizes:** `small`, `medium`.
- **Card variants:** `flat`, `rule`. Omit `variant` for the base card; there is no explicit `default` variant. Card padding is built into `.sb-card`; see the 0.2.0 migration notes in [@simple-base/css](https://www.npmjs.com/package/@simple-base/css).
- **Table cell variants:** `code`, `number`.
- **Field, number field, and date picker:** `id`, `required`, `disabled`, and `invalid` (plus `readOnly` on the number field and date picker) belong to the root, which applies them to its one control, label, and messages. Omit `id` to generate one.
- **Fieldset:** `required`, `disabled`, and `invalid` belong to the root and apply to its legend, messages, and choice groups. `disabled` is the native fieldset attribute, so it reaches every control inside. `labels` overrides any of the `fieldsetLabels`.
- **Radio and checkbox groups:** a radio group's value is a string (`""` = none); a checkbox group's value is a `string[]` of the checked values in document order. `value` is controlled and `defaultValue` is the uncontrolled initial state.
- **Number field values** are strings, so partial input such as `1.` survives; `onValueChange` also receives the parsed number. `formatOptions` takes `Intl.NumberFormatOptions`.
- **Date picker values** are a single `DateValue`, or `null` for no date. `name` submits the date as `YYYY-MM-DD`.
- **Pagination:** pages start at `1`. `count` is the total number of pages, `page` is controlled, and `defaultPage` is the uncontrolled initial page. `siblingCount` is the number of pages shown on each side of the current page before an ellipsis. `labels` overrides any of the `paginationLabels`.
- **Menu:** `onSelect` receives the picked item's `value`, which must be unique within the menu. `open` is controlled and `defaultOpen` is the uncontrolled initial state. The only item variant is `danger`.
- **Ids:** every option type for a stateful root takes an optional `id`, generated when omitted. Menus and tooltips render no root element, so their `id` is the base of the trigger and content ids.
- **Placement:** `top` or `bottom`, with `-start` and `-end` variants. Shared by every popup option.
- **Tabs:** `value` is the selected tab and is controlled; `defaultValue` is the uncontrolled initial tab. One of them is required, so a tab is selected and reachable by keyboard.
- **Dialogs and tooltips:** `open` is the controlled state, `defaultOpen` provides the initial uncontrolled state, and `onOpenChange` reports requested visibility changes.
- **Statuses are deliberately not interchangeable.** Status lines and alerts use `success`, `warning`, `danger`, `info` (`AlertStatus` is `StatusValue`). Toasts use only `success` and `warning`: a toast confirms what the user just did, and errors that need attention belong in an alert that stays on the page. All three are exported from `/status`.

### Select and Combobox

`SelectOption` and `ComboboxOption` are aliases of `ListboxOption`: `label`, a unique, non-empty `value`, and optional `disabled`. `SelectOptions` and `ComboboxOptions` are aliases of `ListboxOptions`, the root API both pickers share:

| Prop            | Required | Description                                                                                                                 |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `id`            | no       | Id of the root element. Generated when omitted.                                                                             |
| `options`       | yes      | The option list. A read-only array, such as one declared `as const`, is accepted.                                           |
| `onValueChange` | no       | Called with the selected option's value, or `null` when the selection is cleared.                                           |
| `placeholder`   | no       | Rendered in place of the value text until something is selected.                                                            |
| `value`         | no       | Controlled counterpart of `onValueChange`. `null` means no selection; omitting `value` leaves it uncontrolled.              |
| `defaultValue`  | no       | Initial value for uncontrolled state. `null` means no selection.                                                            |
| `name`          | no       | Submits the selected option's value with the form, or an empty string when nothing is selected.                             |
| `form`          | no       | Id of a form to associate the control with when it sits outside that form. Read on mount.                                   |
| `disabled`      | no       | Dims and blocks the field, and leaves it out of form submission.                                                            |
| `invalid`       | no       | Switches the border and focus ring to the danger tokens and shows the error message.                                        |
| `required`      | no       | Adds the label marker, and the browser requires a selection before submitting.                                              |
| `placement`     | no       | Shared `top`/`bottom` union with `-start` and `-end` variants; deliberately narrower than an adapter's positioning options. |
| `onOpenChange`  | no       | Reports popup visibility, for lazy loading and analytics.                                                                   |

`null` means "nothing selected" in every single-value picker, including the date picker. Adapters must treat `null` as a controlled empty selection, and only `undefined` as uncontrolled. An empty string is rejected as an option value, since a form submits it when nothing is selected.

Both pickers submit the option _value_, not its label: adapters render a hidden native select for it, because a combobox's visible input holds the label or the typed text.

## What stays in adapters

Share framework-neutral configuration and value callbacks. Children, refs, framework-specific DOM events, native element prop interfaces, internal context, and accessibility implementation belong to the adapter.

Adapters compose shared options with their framework's native element props, apply defaults when options are omitted, and emit the CSS classes and attributes directly. There are no class-name maps, attribute-name maps, CSS-property maps, or class-only contracts.

Each adapter adds Zag's own `translations` prop to the roots built on Zag, such as the number field and the date picker, with Zag's types and defaults. It isn't part of these options, since this package doesn't depend on Zag. Other roots take `labels`, a partial `*Labels` object whose English defaults live here, such as `paginationLabels` and `fieldsetLabels`.

Native-only components — checkbox, input, and the plain `.sb-select` pattern — have no shared custom options. Typography classes and the progress CSS custom property are part of the CSS package's API, not this one.

## Links

- [Repository](https://github.com/redasalmi/simple-base)
- [Styles and selector API](https://www.npmjs.com/package/@simple-base/css)
- [Design tokens](https://www.npmjs.com/package/@simple-base/tokens)
- [Solid components](https://www.npmjs.com/package/@simple-base/solid)

## License

[MIT](https://github.com/redasalmi/simple-base/blob/main/LICENSE)
