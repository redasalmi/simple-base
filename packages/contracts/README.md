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
subpaths are `/badge`, `/card`, `/combobox`, and `/status`.

Adapters compose the shared options with their framework's native element props,
apply defaults when options are omitted, and emit the appropriate CSS classes and
attributes directly. Share framework-neutral public configuration and value
callbacks. Children, refs, framework-specific DOM events, native element prop
interfaces, internal context, and accessibility implementation stay in the adapters.

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
  and `onValueChange`, plus optional `placeholder`. The callback receives the
  selected option's string value, or an empty string when selection is cleared.
  Adapters add their own children type and keep context and rendering internal.
- Status line statuses: `success`, `danger`, `info`.
- Alert statuses: `danger`, `info`. Only the border changes with status; the CSS
  keeps the alert mark danger-colored.
- Toast status: `success` only. Status line, alert, and toast types are exported
  from `/status`, but intentionally do not share an interchangeable status union.

Native-only components such as checkbox, input, and select do not need shared
custom options. Typography classes and the progress CSS custom property remain
part of the CSS API, not this package.

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
