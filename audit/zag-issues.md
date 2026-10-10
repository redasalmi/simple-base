# Upstream issues for chakra-ui/zag

Drafts for the issues that phase 4 of the [roadmap](ROADMAP.md) opens on `chakra-ui/zag`. Each one backs a workaround in `packages/solid`, and the comment next to it names the draft, such as `U4 in audit/zag-issues.md`. Once an issue is open, replace that reference with its link. When a Zag release fixes it, delete the workaround and the test that names it.

All of them were checked against Zag 1.44.0, the version pinned in the catalog. A keyword search of the repository's issues on 2026-10-10 found none of them reported yet.

| #   | Machine               | Gap                                                                  | Workaround                                           |
| --- | --------------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| U1  | combobox              | No hidden input; `name` on the text input submits the label          | Hidden `<select>` in `Combobox` (Z2)                 |
| U2  | number-input          | No hidden input; `name` on the text input submits the formatted text | Hidden input in `NumberField`                        |
| U3  | date-picker           | No hidden input; `name` on the text input submits the formatted date | Hidden input in `DatePicker` (Z8)                    |
| U4  | combobox, date-picker | No `trackFormControl`, so `form.reset()` keeps the current value     | `trackFormReset` in `Combobox` and `DatePicker` (K3) |
| U5  | select                | Form reset leaves the hidden select out of sync                      | `selected` attribute on the hidden options (Z6)      |
| U6  | select                | Empty value unselects every option, so the form leaves `name` out    | `Select` selects its empty option after Zag's sync   |
| U7  | date-picker           | Label has no `data-required`                                         | `DatePickerLabel` sets it (Z9)                       |
| U8  | combobox              | Input keeps a label the controlling parent rejected                  | `Combobox` calls `syncSelectedItems()`               |
| U9  | date-picker           | View trigger's name doesn't contain its visible text                 | `DatePickerCalendar` prefixes the label              |
| U10 | select, combobox      | List props name the list (and select's focus it) in composite mode   | `SelectList` and `ComboboxList` don't spread them    |
| U11 | solid adapter         | `defaultValue` becomes a live `value`, so `form.reset()` blanks text | `prop:defaultValue` beside Zag's input props (Z1)    |

## U1. combobox: a hidden input that submits the value

`getInputProps()` puts `name` and `form` on the text input, so a form submits the typed text or the selected item's label, not its value. Select solves this with `getHiddenSelectProps()`.

Repro: a combobox with `name="currency"` and items `{ label: "Euro", value: "eur" }`. Select Euro and submit: `FormData` holds `currency=Euro`.

Ask: a `getHiddenInputProps()` (or a hidden select, like select's) that carries `name`, `form`, `disabled`, and `required`, holds the selected value or `""`, and leaves `name` off the text input. With `multiple`, one entry per value.

## U2. number-input: a hidden input that submits the number

`getInputProps()` puts `name` on the visible input, which holds `formattedValue`. With `formatOptions: { style: "currency", currency: "EUR" }`, a form submits `€1,234.00`, which a server has to parse with the user's locale.

Ask: a `getHiddenInputProps()` that submits `valueAsNumber` (`""` when empty), with `name` moved off the visible input. Ark's docs currently tell apps to add this input themselves.

## U3. date-picker: a hidden input that submits the ISO date

`getInputProps()` puts `name` on the visible input, which holds the locale-formatted date, such as `10/12/2026`.

Ask: a `getHiddenInputProps()` that submits `value[i].toString()` (`2026-10-12`), with `name` and `form` on it instead of on the visible input.

## U4. combobox and date-picker: restore the initial value on form reset

Select and number-input call `trackFormControl` from `@zag-js/dom-query`, which sets the value back to `context.initial("value")` on the form's `reset` event and follows a disabled `<fieldset>`. Combobox and date-picker don't, so after `form.reset()` they keep the edited value while every other control in the form returns to its initial one. Ark's forms guide says all components sync on reset, which isn't the case for these two.

Repro: a combobox with `defaultValue: ["usd"]` inside a form. Select another item, call `form.reset()`: the value and the input text stay on the new item.

Offer: a PR adding a `trackFormControl` effect to both machines, the way select and number-input have it: `onFormReset` sets `value` to its initial value (and combobox's `inputValue` to the matching label), and `onFieldsetDisabledChange` sets `fieldsetDisabled`.

## U5. select: the hidden select is out of sync after a form reset

`syncSelectElement` sets each option's `selected` property. A form reset restores options from their `selected` attribute, which nothing sets, and runs after the `reset` event. When `onFormReset` sets the value back to one it already had, nothing re-syncs, so the hidden select ends on the browser's default option while the trigger shows the initial value.

Repro: `defaultValue: ["usd"]`, `name` set, render the options without a `selected` attribute. Call `form.reset()` without changing anything: `FormData` holds the first option's value, not `usd`.

Ask: re-run `syncSelectElement` after the native reset (for example in a microtask from `onFormReset`), or document that the options need the `selected` attribute.

## U6. select: an empty value submits nothing

With no value, `syncSelectElement` sets `selectedIndex = -1`, even when the hidden select has an empty option. A form then leaves `name` out of `FormData`, while a native `<select>` with an empty placeholder option submits `name=""`, and `required` already treats a selected empty first option as missing.

Repro: `name="currency"`, no value, render `<option value="" />` first in the hidden select. `new FormData(form)` has no `currency` entry.

Ask: select the empty option when there is one, or render one from `getHiddenSelectProps` in single mode.

## U7. date-picker: `data-required` on the label

Select, combobox, and number-input labels output `data-required` when `required` is set, so CSS can draw a marker. Date-picker's `getLabelProps()` doesn't.

## U8. combobox: input text after a rejected controlled change

With a controlled `value`, selecting an item calls `onValueChange` and writes the item's label into the input. If the parent keeps its value, the value doesn't change, so the `inputValue` sync never runs and the input shows the rejected label until the next change.

Repro: `value: ["eur"]` and an `onValueChange` that ignores the change. Select "US dollar": the input shows "US dollar" while the value is still `eur`.

Ask: after `onValueChange`, set `inputValue` from the effective (controlled) value, as `syncSelectedItems` does.

## U9. date-picker: the view trigger's name doesn't contain its text

`getViewTriggerProps()` sets `aria-label` from `translations.viewTrigger(view, nextView)`, such as "Switch to month view", while the button shows the visible range, such as "October 2026". Its accessible name doesn't contain its visible text, which fails WCAG 2.5.3 (Label in Name) and axe's `label-content-name-mismatch`. The translation doesn't receive the visible text, so apps can't fix it through `translations`.

Ask: pass the visible range text to `viewTrigger`, and default to a label that starts with it, such as "October 2026, Switch to month view".

## U10. select and combobox: list props in composite mode

With `composite: true` (the default), the content is the `listbox`. `getListProps()` still sets `aria-labelledby` on the list, and select's also sets `tabIndex: 0`. A named or focusable element without a role is exposed between the listbox and its options, so axe reports `aria-required-children` on the listbox. Zag's own examples render items directly inside the content.

Ask: in composite mode, leave `aria-labelledby` and `tabIndex` off the list, so it stays a plain layout wrapper.

## U11. solid adapter: form reset blanks inputs whose text Zag owns

`normalizeProps` in `@zag-js/solid` maps `defaultValue` to `value`, so Solid sets the input text as the live `value` property and never writes the `value` attribute. `form.reset()` restores text inputs from that attribute, so it blanks them. The machines re-sync the text only when their value changes, so after a reset that doesn't change the value (or a client-rendered page reset straight after load) the number-input, date-picker, and combobox inputs stay empty while the value is set.

Repro, Solid: a number-input with `defaultValue: "1234"` in a form. Call `form.reset()` without editing: the input is empty, and `api.value` is still `1234`.

Ask: keep the default value in sync as well, for example by mapping `defaultValue` to both `value` and `prop:defaultValue` in the Solid adapter, or re-sync the input element in each machine's `onFormReset`.
