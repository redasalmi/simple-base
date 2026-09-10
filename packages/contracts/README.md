# @simple-base/contracts

Shared component option types and default constants for framework adapters such as
Solid and React. CSS owns styling; adapters own rendering, native props, and
behavior. This package has no runtime dependencies.

`packages/css/styles/` is the source of truth for supported styling options. Only
components with shared custom options need a contract. There are no class-name
maps, attribute-name maps, CSS-property maps, or class-only contracts.

## Usage

```ts
import {
  buttonDefaults,
  type ButtonOptions,
  type ButtonSize,
  type ButtonVariant,
} from "@simple-base/contracts";
```

The same exports are available from `@simple-base/contracts/button`. Other
subpaths are `/badge`, `/card`, `/combobox`, `/placement`, `/select`, and
`/status`.

Adapters compose the shared options with their framework's native element props,
apply defaults when options are omitted, and emit the appropriate CSS classes and
attributes directly. Share framework-neutral public configuration and value
callbacks. Children, refs, framework-specific DOM events, native element prop
interfaces, internal context, and accessibility implementation stay in the adapters.
Every adapter part accepts a `class` plus the native attributes for the element it
renders, excluding the attributes the widget owns.

```ts
export type ButtonOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const buttonDefaults = {
  variant: "primary",
  size: "medium",
} as const satisfies Required<ButtonOptions>;
```

Types are erased from runtime JavaScript. Only the default constants are runtime
exports; there are no allowed-value arrays without a runtime use case.

## Available options

| Component   | Types                                          | Defaults                              |
| ----------- | ---------------------------------------------- | ------------------------------------- |
| Button      | `ButtonVariant`, `ButtonSize`, `ButtonOptions` | `buttonDefaults`: `primary`, `medium` |
| Badge       | `BadgeVariant`, `BadgeSize`, `BadgeOptions`    | `badgeDefaults`: `default`, `medium`  |
| Card        | `CardVariant`, `CardOptions`                   | `cardDefaults`: `padding: false`      |
| Combobox    | `ComboboxOption`, `ComboboxOptions`            | No defaults                           |
| Select      | `SelectOption`, `SelectOptions`                | No defaults                           |
| Status line | `StatusValue`, `StatusOptions`                 | No default status                     |
| Alert       | `AlertStatus`, `AlertOptions`                  | No default status                     |
| Toast       | `ToastStatus`, `ToastOptions`                  | `toastDefaults`: `status: "success"`  |

- Button variants: `primary`, `secondary`, `tertiary`, `ghost`, `danger`,
  `danger-subtle`. Sizes: `small`, `medium`, `large`. Apply the default attributes
  explicitly; the bare CSS class is not identical to every default variant rule.
- Badge variants: `default`, `success`, `danger`, `warning`, `info`, `accent`,
  `command`, `outline`, `muted`. Sizes: `small`, `medium`.
- Card variants: `flat`, `rule`. Omit `variant` for the base card; there is no
  explicit `default` variant. `padding` is boolean and maps to
  `data-padding="true"` when enabled.
- `ComboboxOption` contains `label`, a unique `value`, and optional `disabled`.
  `ComboboxOptions` defines the shared root API: required `id`, `label`, `options`,
  and `onValueChange`, plus optional `placeholder`, `value`, `disabled`,
  `invalid`, `required`, `name`, `placement`, and `onOpenChange`. The callback
  receives the selected option's string value, or an empty string when selection
  is cleared. Adapters add their own children type and keep context and rendering
  internal.
- `SelectOption` mirrors `ComboboxOption`, and `SelectOptions` mirrors
  `ComboboxOptions` for the keyboard-driven single-select. The `placeholder`
  string renders in place of the value text until an option is selected. Both
  option lists stay independent so each adapter can evolve its own surface.
- `value` is the controlled counterpart of `onValueChange`. An empty string means
  no selection, and omitting `value` leaves the component uncontrolled. Adapters
  must therefore treat `""` as a controlled empty selection, not as uncontrolled.
- `disabled` dims and blocks the field, `invalid` switches the border and focus
  ring to the danger tokens, and `required` adds the label marker. `placement` is
  the shared `top`/`bottom` union with `-start` and `-end` variants and picks the
  popup side; it is deliberately narrower than the adapter's positioning options,
  not a pass-through. `onOpenChange` reports popup visibility for lazy loading
  and analytics.
- `name` has different meaning per component. Combobox applies it to the visible
  input, so the submitted value is the option label, not its value. Select renders
  a hidden native select for the option value, and only when `name` is set.
- Status line statuses: `success`, `danger`, `info`.
- Alert statuses: `danger`, `info`. Only the border changes with status; the CSS
  keeps the alert mark danger-colored.
- Toast status: `success` only. Status line, alert, and toast types are exported
  from `/status`, but intentionally do not share an interchangeable status union.

Native-only components such as checkbox, input, and the plain `.sb-select`
pattern do not need shared custom options. Typography classes and the progress
CSS custom property remain part of the CSS API, not this package.

## Migration from the class-map contracts

Use `buttonDefaults`, `badgeDefaults`, `cardDefaults`, and `toastDefaults` instead
of the corresponding `*Contract.defaults`. Use CSS class and attribute names
directly in adapters. Class-only contracts and their subpaths have been removed.
Existing option type names are unchanged.

## Verification

```sh
pnpm --filter @simple-base/contracts typecheck
pnpm --filter @simple-base/contracts build
```

These commands check the shared types and build the runtime defaults and type
declarations.
