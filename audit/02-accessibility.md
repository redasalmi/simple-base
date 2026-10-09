# Accessibility audit

This review covers the ARIA wiring in every Solid component, the Zag-generated ARIA that the components add to or override, the CSS (focus, motion, forced colors, `[hidden]`), and the color contrast of the tokens. It is a code review, not a test with a screen reader. A1 through A6 should be confirmed with NVDA or JAWS on Firefox and VoiceOver on Safari before release, and [Q1](07-code-quality.md) should add automated axe checks.

## What already works

- Native elements come first: `<dialog>` with `showModal()`, native checkbox, radio, and switch inputs, `<fieldset>` and `<legend>`, `<label for>`, `<table>` with `scope`, and `<nav>` for pagination.
- Field, Fieldset, NumberField, and DatePicker connect description and error ids through `aria-describedby`. The error id only joins while the field is invalid (`Field.tsx:63-69`).
- `PaginationPrevious` and `PaginationNext` use `aria-disabled` rather than `disabled`, so focus stays put at the first or last page (`Pagination.tsx:129-145`). The current page gets `aria-current="page"`.
- `AlertDialogCancel` autofocuses by default, so the least destructive action gets focus first.
- The required marker is drawn with `content: "*" / ""`, so screen readers don't read "star". The `required` attribute on the control announces the state instead.
- The CSS has `:focus-visible` rings on every interactive part I checked. 14 files have `prefers-reduced-motion` blocks and 18 have `forced-colors` blocks. `.sb-toast[hidden]` keeps Zag's `hidden` from being overridden by `display: flex`.

## Findings

### A1. Select and Combobox can't explain an error (High, WCAG 1.3.1 and 3.3.1)

`invalid` sets `aria-invalid` on the trigger or input through Zag, but neither component has a Description or Error part, and nothing sets `aria-describedby`. Neither component can sit inside `Field` either, because `FieldInput` is the only control `Field` wires. A screen reader user hears "invalid entry" with no reason.

Fix: add Description and Error parts that put their ids on the trigger (Select) and the input (Combobox), the way NumberField does at `NumberField.tsx:229`. Use the shared helper in [R1](05-refactoring-helpers.md).

### A2. A required checkbox group is required only visually (Medium, WCAG 1.3.1)

`Fieldset required` sets `data-required` on the legend, which draws an asterisk hidden from assistive technology. For `RadioGroup`, every radio also gets `required` (`RadioGroup.tsx:90`), so the requirement is announced. `CheckboxGroupItem` deliberately doesn't set `required`, which is correct because that would make every box required. But nothing else is set either, so a required checkbox group gives no programmatic signal.

Fix: when the fieldset is required, add visually hidden text such as "(required)" to the legend. `aria-required` isn't allowed on `role="group"`.

### A3. Tooltip triggers rely on the caller to name icon-only buttons (Medium, WCAG 4.1.2)

Zag wires tooltip content to the trigger through `aria-describedby`, and only while the tooltip is open. The tooltip is a description, never the name. The playground correctly passes `aria-label`, but `TooltipTriggerProps` doesn't require it. `Switch` does require an accessible name, through the `AccessibleName` union at `Switch.tsx:4-6`.

Fix: document it in the README next to `TooltipTrigger`. Optionally add an `aria-label` / `aria-labelledby` union to `TooltipTriggerProps`, but that would also force a label on triggers that have visible text, so documentation is probably enough.

### A4. NumberFieldAffix hides units from screen readers (Medium, WCAG 1.3.1)

`NumberFieldAffix` is always `aria-hidden="true"` (`NumberField.tsx:272`). When the affix is the only place the unit appears, such as "€", "%", or "days", screen reader users get a bare number.

Fix: pick one of these:

- Give the affix an id and add it to the input's `aria-describedby`, keeping it visible to assistive technology.
- Document that the unit must also appear in the label or in `formatOptions` (for example `style: "currency"`).

### A5. A controlled RadioGroup can drift from its state (Medium)

`RadioGroupItem` sets `checked={group.value() === local.value}` (`RadioGroup.tsx:88`). A native radio changes its checked state on click before Solid runs. If the parent rejects the change and leaves `value` as it is, the computed `checked` values don't change, Solid writes nothing, and the DOM keeps showing the new radio as checked. The checked state that assistive technology reports then differs from app state.

Fix: in the change handler, when `value` is controlled, re-apply the controlled state to the DOM once the parent has had a chance to respond, or document that a controlled group must always accept changes. CheckboxGroup has the same issue (`CheckboxGroup.tsx:101`).

### A6. Select and Combobox override labelling that Zag already provides (Medium)

- `SelectTrigger` sets `aria-label={label()}` (`Select.tsx:193`), but Zag also sets `aria-labelledby` to the label's id. `aria-labelledby` wins, so the `aria-label` only matters when `SelectLabel` isn't rendered. In that case `aria-labelledby` points at an id that doesn't exist.
- `SelectList` and `ComboboxList` set `aria-label` next to Zag's `aria-labelledby`, which again wins. The `aria-label` is dead.
- `ComboboxInput` sets `aria-label={label()}` (`Combobox.tsx:220`). Zag labels the input natively through `<label for>`, and `aria-label` overrides that. If `ComboboxLabel` has rich children, the name the input gets differs from the visible label, which breaks WCAG 2.5.3 when the texts differ.

Fix: always render the Label part and drop the `aria-label` fallbacks (see [Z5](03-zag-compliance.md)).

### A7. Dialog semantics (Low)

- `aria-labelledby` and `aria-describedby` always point at the title and description ids (`Dialog.tsx:142-143`, `AlertDialog.tsx:145-146`), even when `DialogDescription` isn't rendered. The reference dangles. Register those parts the way `FieldDescription` does.
- `role="dialog"` on `<dialog>` repeats the implicit role (`Dialog.tsx:141`). It's harmless and can go.
- `aria-expanded` on `DialogTrigger` and `AlertDialogTrigger` (`Dialog.tsx:89`) isn't part of the APG modal dialog pattern. Some screen readers announce "collapsed" on a button that opens a modal. Keeping `aria-haspopup="dialog"` and dropping `aria-expanded` is cleaner.
- `DialogTitle` is `h2` and `AlertDialogTitle` is `h3`. A modal is its own heading context, so `h2` for both is the safer default, or accept a `level` prop (see [C7](01-consistency.md)).

### A8. The empty-state status regions are inserted with their content (Low)

`SelectEmpty` and `ComboboxEmpty` mount a `role="status"` element only when the list is empty (`Combobox.tsx:313-314`). Screen readers often skip a live region that appears already holding its text. For Select, the options list doesn't change while the popup is open, so no live region is needed. For Combobox, keep the status element mounted while the popup is open and change only its text. A `role="status"` inside or next to a `listbox` also needs testing; see [Z4](03-zag-compliance.md).

### A9. Tabs with no selected value can't be reached by keyboard (Medium)

With neither `value` nor `defaultValue`, Zag gives no tab `tabIndex=0`, so keyboard users can't reach the tab list. The contract warns about this in JSDoc (`contracts/src/tabs.ts`), but the type allows it.

Fix: make it a type error. Use a union in which at least one of `value` and `defaultValue` is required.

### A10. Toasts with an action dismiss after 5 seconds (Medium, WCAG 2.2.1)

Zag pauses on hover, focus, and hidden pages, which helps. But a toast with an `action` still disappears after 5 seconds for keyboard and screen reader users who don't reach it in time.

Fix: in `createToaster().create`, default `duration` to `Infinity` when `action` is set, unless the caller passes a duration.

### A11. Hard-coded English strings (Medium for a French-speaking user base)

- Pagination: `"Pagination"` (`Pagination.tsx:81`), `"Previous page"`, `"Next page"` (`:148`, `:152`), `"Page N"` (`:107`). `getPageLabel` and `aria-label` overrides exist, but nothing sets them all in one place.
- The NumberField trigger glyphs `"−"` and `"+"` (`NumberField.tsx:248`, `:262`) have no `aria-label`, and Zag doesn't add one. They are announced as "minus" and "plus".
- The DatePicker doesn't expose Zag's `translations` prop, so the calendar's trigger, previous/next, and day-cell labels are always Zag's English, even with `locale="fr-FR"`.
- The toaster's region label defaults to Zag's `"Notifications"`.

Fix: accept `translations` on DatePicker, as Zag does, and add label props on Pagination and NumberField with English defaults stored in contracts.

### A12. FieldError is not announced when it appears (Low)

Errors render on `invalid` with no live region. That is the right default: errors announced on every keystroke are noisy, and `aria-describedby` reads them on focus. Document the expected app pattern: on submit, move focus to the first invalid control.

## Token contrast check

I computed WCAG 2 contrast for the main pairs in all nine themes from `dist/tokens.css`, compositing alpha "soft" colors over the surface.

| Pair                                                         | Minimum | Result                                                                |
| ------------------------------------------------------------ | ------- | --------------------------------------------------------------------- |
| foreground primary, secondary, or muted on surface or canvas | 4.5     | pass in every theme                                                   |
| accent text on surface, accent on-surface on accent surface  | 4.5     | pass in every theme                                                   |
| status text on soft status backgrounds (badges, alerts)      | 4.5     | pass in every theme                                                   |
| danger on-surface on danger surface (danger button)          | 4.5     | pass in every theme                                                   |
| focus ring on surface or canvas                              | 3       | pass in every theme                                                   |
| `border-strong` on surface (input borders)                   | 3       | pass in every theme                                                   |
| `foreground-muted` on `background-raised`                    | 4.5     | **4.26 in catppuccin-frappe**                                         |
| `foreground-subtle` on surface                               | 4.5     | **3.62 in catppuccin-latte** (no component CSS uses this token today) |
| `border-default` on surface                                  | 3       | 1.3–1.8 in every theme                                                |

`border-default` fails 3:1 on purpose. Form controls use `border-strong`, which passes. Keep `border-default` off any boundary a user needs to see to find a control (WCAG 1.4.11). Check where muted text sits on raised backgrounds in catppuccin-frappe, such as hover rows and table headers, and darken `muted` slightly in that theme.
