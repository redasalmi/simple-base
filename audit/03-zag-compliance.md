# Zag compliance: workarounds against Zag's API

The goal is that no Zag-based component works around Zag's limits, and every component uses Zag's API as Zag intends. I compared each component against Zag 1.44.0's `connect` and `machine` source in `node_modules` and against the Solid examples on zagjs.com.

Each item falls into one of three groups:

- **Fights Zag**: rewrites or overrides what Zag returns.
- **Fills a Zag gap**: adds behavior Zag doesn't have.
- **Configuration**: uses a Zag prop with a different default. This is fine and kept only for completeness.

## Summary

| #   | Component                                        | What it does                                                                                           | Type          | Recommendation                          |
| --- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------- | --------------------------------------- |
| Z1  | ComboboxInput, NumberFieldInput, DatePickerInput | Removes `value` from `getInputProps()` and re-adds it as `prop:defaultValue`                           | Fights Zag    | Remove; upstream any confirmed bug      |
| Z2  | Combobox                                         | Renders its own hidden `<select>` and a copied `visuallyHiddenStyle`; doesn't pass `name` to Zag       | Fights Zag    | Remove, or upstream a hidden-input part |
| Z3  | Select, Combobox                                 | `SelectContent` and `ComboboxContent` toggle `hidden` themselves; Zag's content props go on the `<ul>` | Fights Zag    | Use Zag's `content` and `list` parts    |
| Z4  | Select, Combobox                                 | `SelectEmpty` and `ComboboxEmpty` are custom parts with `role="status"`                                | Fills a gap   | Keep, outside the listbox               |
| Z5  | Select, Combobox                                 | `aria-label` added on the trigger, input, and list                                                     | Fights Zag    | Remove; always render the Label part    |
| Z6  | Select                                           | `attr:selected` on hidden-select options so native form reset agrees with Zag                          | Fills a gap   | Upstream; keep until fixed, with a test |
| Z7  | DatePicker                                       | Its own form `reset` listener, found with `document.getElementById`                                    | Fills a gap   | Upstream; remove, or keep with a test   |
| Z8  | DatePicker                                       | Hidden `<input type="hidden">` that submits the ISO date                                               | Fills a gap   | Upstream; keep for v1                   |
| Z9  | DatePickerLabel                                  | Sets `data-required` by hand                                                                           | Fills a gap   | Upstream; drop or keep                  |
| Z10 | DatePicker                                       | Defaults `timeZone` to the user's zone and `placement` to `bottom-start`                               | Configuration | Keep                                    |

Menu, Tooltip, Tabs, and Toast are clean. They spread Zag's props through `mergeProps(api().getXProps(), rest)`, which is the documented Solid pattern.

## Details

### Z1. Rewriting `getInputProps()` (High)

`Combobox.tsx:213-216`, `NumberField.tsx:220-223`, and `DatePicker.tsx:255-258` do the following:

```ts
const { value, ...inputProps } = api().getInputProps();
return { ...inputProps, "prop:defaultValue": value };
```

Zag returns `defaultValue`. `@zag-js/solid`'s `normalizeProps` maps `defaultValue` to `value` on purpose (`eventMap` in `normalize-props.mjs`), because Zag owns the input text. The comments give the reasons for the rewrite: "typing isn't overwritten" and "a form reset keeps the text". Those describe how Zag's Solid adapter behaves, and the zagjs.com Solid examples spread `getInputProps()` unchanged.

Recommendation: remove all three. Write the behavior tests from [Q1](07-code-quality.md) first: typing a partial number such as `1.`, typing a date, and form reset. If a test fails with plain Zag props, that is a Zag bug. Report it to `chakra-ui/zag` with the repro and accept the behavior until it's fixed. Number-input already handles form reset through `trackFormControl` (`number-input.machine.mjs:273-279`).

### Z2. Combobox's hidden `<select>` (High)

`Combobox.tsx:152-163` renders its own `<select aria-hidden tabIndex={-1}>` with a copied `visuallyHiddenStyle` (`:20-31`). It never passes `name` to the machine, because Zag puts `name` on the text input, which would submit the typed label instead of the option value.

The zagjs.com "Usage within forms" section says to pass `name`. Zag 1.44's combobox has no hidden-input or hidden-select part (unlike select's `getHiddenSelectProps`).

Recommendation: decide whether v1 Combobox needs native form submission.

- If not, remove the hidden select and the `name` and `required` options. Apps read `onValueChange`.
- If yes, pass `name` to Zag, test what `FormData` contains, and open an upstream issue asking for a hidden value input like select's. Until that ships, the honest option under this rule is not to support `name` at all.

### Z3. Content and list parts (Medium)

Zag's select and combobox anatomy has both `content` and `list` (`select.anatomy.mjs`, `combobox.anatomy.mjs`). Here:

- `SelectContent` and `ComboboxContent` are plain `<div hidden={!api().open}>` (`Select.tsx:267`, `Combobox.tsx:278`). The open state is mirrored by hand.
- `SelectList` and `ComboboxList` spread `getContentProps()` onto the `<ul>`.

Recommendation: `SelectContent` should spread `getContentProps()`, which already includes `hidden`, `role`, `aria-activedescendant`, and labelling. `SelectList` should spread `getListProps()`. With Zag's default `composite: true`, the content element is the `listbox` and the list is a layout wrapper. That also removes the duplicate `aria-label` (Z5).

### Z4. Empty parts (Low)

Zag has no empty part, so `SelectEmpty` and `ComboboxEmpty` are additions. After Z3 they would sit inside the `listbox`, where a `role="status"` element isn't an allowed child. Render them after the list, or make `SelectContent` hold the list and the empty part as siblings while `getContentProps` sits on the list. Test this with a screen reader (see [A8](02-accessibility.md)).

### Z5. Extra `aria-label`s (Medium)

`Select.tsx:193`, `:286`, and `Combobox.tsx:220`, `:297` add `aria-label={label()}` on top of Zag's own labelling: `aria-labelledby` to the label id on the trigger and content, and `<label for>` on the combobox input. See [A6](02-accessibility.md) for the accessibility effect.

Recommendation: remove them and make the Label part the only source of the name. That also makes the `label` string option unnecessary (see [C1](01-consistency.md)).

### Z6. `attr:selected` on hidden-select options (Low)

`Select.tsx:138` sets the `selected` attribute on the option that matches Zag's value. On reset, Zag's `trackFormControl` puts the machine value back to its initial value (`select.machine.mjs:427-435`). But when that value hasn't changed since mount, nothing re-renders, and the native `<select>` stays on whatever option the browser reset it to. The attribute keeps the DOM and Zag in agreement.

This is narrow and correct, but it fixes a Zag desync from outside. Report it upstream, keep the attribute until it's fixed, and cover it with the form reset test.

### Z7. DatePicker form reset (Medium)

`DatePicker.tsx:148-159` adds a `reset` listener, because Zag's date picker has no `trackFormControl` effect. Number-input and select both have one. The listener:

- finds the input with `document.getElementById(id())` instead of a ref,
- resets to `local.defaultValue`, while Zag's convention is to reset to `context.initial("value")`.

Recommendation: open an upstream issue asking date-picker for the same `trackFormControl` effect. Under the no-workarounds rule, remove the listener and document that DatePicker doesn't restore on `form.reset()` until Zag ships it. If form reset is a must for the invoicing app's v1, keep the listener, replace `getElementById` with the input ref, and add a test so it can be deleted when Zag catches up.

### Z8. DatePicker hidden ISO input (Low)

`DatePicker.tsx:182-190` renders `<input type="hidden" name>` holding `value[0].toString()`, because the visible input holds locale-formatted text. Zag has no hidden-input part for date-picker. This adds an element without changing anything Zag renders. It is the least invasive way to submit a date. Keep it for v1 and ask upstream for a `getHiddenInputProps()`.

### Z9. DatePickerLabel `data-required` (Low)

`DatePicker.tsx:207`: Zag's date-picker label doesn't output `data-required`, while select, combobox, and number-input do. The CSS needs the attribute for the asterisk. Ask upstream for `data-required` on the label. Until then, this is a one-attribute addition.

### Z10. Configuration, kept

- `timeZone ?? userTimeZone` (`DatePicker.tsx:79`) uses Zag's `timeZone` prop with a better default. For SSR, see [S6](08-solid-best-practices.md).
- `placement ?? "bottom-start"` (`DatePicker.tsx:81`) uses Zag's `positioning` prop.
- Combobox narrows `options` from `onInputValueChange` (`Combobox.tsx:75-78`, `:133-135`). This matches the zagjs.com Solid example.

## Non-Zag components that use `@zag-js/solid`

Dialog, AlertDialog, Pagination, RadioGroup, and CheckboxGroup import `mergeProps` from `@zag-js/solid` only to chain event handlers, with the caller's handler running first (`callAll(props[key], result[key])` in `@zag-js/core`). That is reasonable, but it ties plain components to the Zag adapter. See [R6](05-refactoring-helpers.md) for a local helper.
