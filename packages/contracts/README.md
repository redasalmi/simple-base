# @simple-base/contracts

Framework-neutral component options and default values for Simple Base adapters.

CSS owns styling. Adapters own rendering, native props, and behavior. This package holds the shared custom options that more than one adapter needs — the types you pass to a component and the defaults applied when you omit them. It has no runtime dependencies.

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

Subpaths: `/badge` · `/button` · `/card` · `/combobox` · `/dialog` · `/placement` · `/select` · `/status` · `/table`

## Options reference

| Component   | Types                                          | Defaults                              |
| ----------- | ---------------------------------------------- | ------------------------------------- |
| Button      | `ButtonVariant`, `ButtonSize`, `ButtonOptions` | `buttonDefaults`: `primary`, `medium` |
| Badge       | `BadgeVariant`, `BadgeSize`, `BadgeOptions`    | `badgeDefaults`: `default`, `medium`  |
| Card        | `CardVariant`, `CardOptions`                   | —                                     |
| Combobox    | `ComboboxOption`, `ComboboxOptions`            | —                                     |
| Dialog      | `DialogOptions`                                | —                                     |
| Select      | `SelectOption`, `SelectOptions`                | —                                     |
| Status line | `StatusValue`, `StatusOptions`                 | —                                     |
| Alert       | `AlertStatus`, `AlertOptions`                  | —                                     |
| Toast       | `ToastStatus`, `ToastOptions`                  | `toastDefaults`: `status: "success"`  |
| Table cell  | `TableCellVariant`, `TableCellOptions`         | —                                     |

Types are erased at runtime. Only the `*Defaults` constants are runtime exports — there are no allowed-value arrays without a runtime use case.

### Values

- **Button variants:** `primary`, `secondary`, `tertiary`, `ghost`, `danger`, `danger-subtle`. **Sizes:** `small`, `medium`, `large`. Apply the default attributes explicitly — the bare CSS class is not identical to every default variant rule.
- **Badge variants:** `default`, `success`, `danger`, `warning`, `info`, `accent`, `command`, `outline`, `muted`. **Sizes:** `small`, `medium`.
- **Card variants:** `flat`, `rule`. Omit `variant` for the base card; there is no explicit `default` variant. Card padding is built into `.sb-card`; see the 0.2.0 migration notes in [@simple-base/css](https://www.npmjs.com/package/@simple-base/css).
- **Table cell variants:** `code`, `number`.
- **Dialogs:** `open` is the controlled state, `defaultOpen` provides the initial uncontrolled state, and `onOpenChange` reports requested visibility changes.
- **Statuses are deliberately not interchangeable.** Status lines and alerts use `success`, `warning`, `danger`, `info`. Toasts use `success` and `warning`. All three are exported from `/status`.

### Select and Combobox

`SelectOption` and `ComboboxOption` both contain `label`, a unique, non-empty `value`, and optional `disabled`. Empty string is reserved for no selection and is rejected as an option value.

`SelectOptions` and `ComboboxOptions` define the shared root API:

| Prop            | Required | Description                                                                                                                 |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `id`            | yes      | Unique identifier for the instance.                                                                                         |
| `label`         | yes      | Visible label text.                                                                                                         |
| `options`       | yes      | The option list.                                                                                                            |
| `onValueChange` | yes      | Called with the selected option's string value, or `""` when selection is cleared.                                          |
| `placeholder`   | no       | Rendered in place of the value text until something is selected.                                                            |
| `value`         | no       | Controlled counterpart of `onValueChange`. `""` means no selection; omitting `value` leaves it uncontrolled.                |
| `disabled`      | no       | Dims and blocks the field.                                                                                                  |
| `invalid`       | no       | Switches the border and focus ring to the danger tokens.                                                                    |
| `required`      | no       | Adds the label marker.                                                                                                      |
| `name`          | no       | See below — semantics differ per component.                                                                                 |
| `placement`     | no       | Shared `top`/`bottom` union with `-start` and `-end` variants; deliberately narrower than an adapter's positioning options. |
| `onOpenChange`  | no       | Reports popup visibility, for lazy loading and analytics.                                                                   |

Adapters must treat `""` as a controlled empty selection, not as uncontrolled.

The two option lists stay independent so each adapter can evolve its own surface.

**`name` differs per component.** Combobox applies it to the visible input, so the submitted value is the option _label_. Select keeps a hidden native select for the option _value_ and always renders it, so the label stays associated and form reset and fieldset state are tracked — `name` alone decides whether the control is submitted.

## What stays in adapters

Share framework-neutral configuration and value callbacks. Children, refs, framework-specific DOM events, native element prop interfaces, internal context, and accessibility implementation belong to the adapter.

Adapters compose shared options with their framework's native element props, apply defaults when options are omitted, and emit the CSS classes and attributes directly. There are no class-name maps, attribute-name maps, CSS-property maps, or class-only contracts.

Native-only components — checkbox, input, and the plain `.sb-select` pattern — have no shared custom options. Typography classes and the progress CSS custom property are part of the CSS package's API, not this one.

## Links

- [Repository](https://github.com/redasalmi/simple-base)
- [Styles and selector API](https://www.npmjs.com/package/@simple-base/css)
- [Design tokens](https://www.npmjs.com/package/@simple-base/tokens)
- [Solid components](https://www.npmjs.com/package/@simple-base/solid)

## License

[MIT](https://github.com/redasalmi/simple-base/blob/main/LICENSE)
