# v1 audit roadmap

This roadmap orders every open finding from the v1 readiness audit into phases, and settles the places where two reports recommend different things. It was written on 2026-10-09 against `main` at `eba1d24`.

Reports [01](01-consistency.md) and [02](02-accessibility.md) are already implemented (`6c2a3bf` and `eba1d24`). A few of those changes now need adjusting, either because a later report wants something else or because the implementation introduced a new inconsistency. Those adjustments are part of this roadmap.

## Product decisions

Decided on 2026-10-09:

- **v1 supports SSR.** Every component must render on the server and hydrate without mismatches ([K8](#k8-ssr)).
- **Every form control works in a native form.** It takes a `name`, submits a usable value with `FormData`, and supports `form`, `required`, and `disabled` ([K2](#k2-form-participation)).
- **NumberField submits the number**, such as `1234`, not the formatted text ([K2](#k2-form-participation)).
- **"Nothing selected" is `null`** in every single-value picker ([K5](#k5-empty-value)).
- **The Zag date parser is re-exported as `parseDateInput`.**
- **Every form control restores its initial value on `form.reset()`.** Where Zag doesn't do it, an internal listener that follows Zag's own rule does, until Zag ships it ([K3](#k3-form-reset)).
- **An empty picker submits `""`.** Select and Combobox with nothing selected submit their `name` with an empty value, like a native `<select>` with an empty placeholder option, and like DatePicker and NumberField ([K2](#k2-form-participation)).
- **A required CheckboxGroup needs at least one box checked.** `Fieldset required` blocks submission while none is checked, as it already does for a RadioGroup ([K2](#k2-form-participation)).
- **Switch is named like Checkbox and Radio.** A wrapping `<label>` or `<label for>` is enough, and `aria-label` is no longer required ([Q8](07-code-quality.md)).

## Status of reports 01 and 02

Every finding in 01 and 02 has landed. The ones below need a follow-up, listed in the phase that handles it.

| Finding        | What landed                                                                                                                 | Follow-up                                                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| C1, A1         | `SelectDescription`, `SelectError`, `ComboboxDescription`, `ComboboxError`                                                  | The registration code was copied by hand into both files instead of using the [R1](05-refactoring-helpers.md) helper. Phase 3. |
| C4             | DatePicker exposes `DateValue \| null`                                                                                      | Select and Combobox still use `""` for "no selection", so the three pickers disagree ([K5](#k5-empty-value)). Phase 1.         |
| C6, A4         | Marks force `aria-hidden`; `NumberFieldAffix` is announced through the input                                                | Resolved correctly in favor of A4 ([K4](#k4-numberfieldaffix)). Nothing to do.                                                 |
| A5             | RadioGroup and CheckboxGroup re-sync the DOM in their handlers                                                              | RadioGroup added a fourth hand-written ref merge ([R7](05-refactoring-helpers.md)). Phase 3.                                   |
| A6, Z5         | The `label` option is gone; the Label part is the only name                                                                 | Nothing stops a Select or Combobox without a Label part. The axe tests in phase 2 must cover it.                               |
| A7             | Dialog and AlertDialog register their title and description                                                                 | Same boolean registration as R1, with the same unmount bug. Phase 3.                                                           |
| A8             | `ComboboxEmpty` keeps its `role="status"` region mounted                                                                    | That region ends up inside the `listbox` once [Z3](03-zag-compliance.md) lands ([K1](#k1-empty-part)). Phase 4.                |
| A11            | `labels` on Pagination, `requiredLabel` on FieldsetLegend, `translations` on DatePicker and NumberField, `label` on Toaster | Four shapes for one concern ([K6](#k6-translation-props)). Phase 1.                                                            |
| Token contrast | catppuccin-frappe `muted` moved to `subtext1`                                                                               | `foreground-subtle` still fails in catppuccin-latte. No component uses it; leave a comment on the token so nobody starts.      |

The "Fix before 1.0" list in [README.md](README.md) is partly out of date: items 3 and 5 are done. This roadmap replaces it.

## Conflicts and how they are settled

### K1. Empty part

[Z3](03-zag-compliance.md) puts `getContentProps()` on `SelectContent` and `ComboboxContent`. With Zag's default `composite: true`, that makes the content element the `listbox`. [Z4](03-zag-compliance.md) and [A8](02-accessibility.md) then put a `role="status"` element inside that `listbox`, which isn't an allowed child. Z4's suggested fallback, `getContentProps` on the list with the empty part as a sibling, is exactly the structure Z3 calls a workaround.

Passing `composite: false` would make the content a `dialog`, but Combobox would then announce `aria-haspopup="dialog"` instead of `listbox`.

**Decision:** apply Z3 as written. Move `SelectEmpty` and `ComboboxEmpty` out of the content, as siblings of it inside the positioner, so they are never inside the `listbox`. Keep A8's always-mounted status region for Combobox. Update the CSS so an empty list doesn't draw an empty box, and update the README examples.

### K2. Form participation

[Z2](03-zag-compliance.md) calls Combobox's hidden `<select>` a fight with Zag and suggests removing it with the `name` and `required` options. [Z8](03-zag-compliance.md) calls DatePicker's hidden `<input>` the "least invasive way to submit" and keeps it. Both add a form element Zag doesn't provide, without changing anything Zag renders. The product decision that every form control submits by `name` rules out removing them.

In Zag 1.44, and still on Zag's `main` (1.45), Combobox and DatePicker put `name` on the visible text input. Combobox would submit the option's label, and DatePicker the locale-formatted date. Ark UI, which is built on Zag, does the same: its DatePicker form example submits the visible text, and its Combobox has no hidden-input part. Only Select has one in both (`getHiddenSelectProps`, Ark's `Select.HiddenSelect`).

NumberField has the same gap. Zag puts `name` on the visible input, so with `formatOptions` a form submits the formatted text, such as `€1,234.00`. Ark's docs tell apps to add their own hidden input with `valueAsNumber`.

**Decision:** reclassify Z2 as "fills a gap", the same as Z8. Every form control submits a machine-readable value:

| Control                                  | Submits                | How                                                      |
| ---------------------------------------- | ---------------------- | -------------------------------------------------------- |
| Input, TextArea, Checkbox, Radio, Switch | native value           | native element                                           |
| RadioGroup, CheckboxGroup                | native values          | native elements, shared `name`                           |
| Select                                   | option value           | Zag's hidden select                                      |
| Combobox                                 | option value           | our hidden select (Z2), as today                         |
| DatePicker                               | ISO date, `2026-10-09` | our hidden input (Z8), as today                          |
| NumberField                              | the number, `1234`     | **new** hidden input; the visible input loses its `name` |

`required` stays on the visible control, because browsers don't validate hidden inputs. NumberField and DatePicker keep Zag's `required` on their text input, and Combobox keeps it on its hidden select, which is focusable for that reason.

The phase 2 tests found two gaps in this table, decided on 2026-10-09:

- **Empty pickers.** With nothing selected, Select and Combobox leave their `name` out of `FormData`, while DatePicker and NumberField submit `""`. Select's hidden select has an empty option that ends up unselected, and Combobox's has no option at all. Both submit `""` instead. That is what a native `<select>` with an empty placeholder option submits, it is what `validateWidgetOptions` already says ("A form submits an empty string when nothing is selected"), and it lets a server read every field the same way. `required` still works, since a selected empty first option counts as missing. `null` stays the value in the component API ([K5](#k5-empty-value)); `""` is only what the form submits.
- **Required CheckboxGroup.** `Fieldset required` marks the legend, and screen readers announce "required", but HTML has no "at least one" rule for checkboxes, so the form submits with none checked. The group sets `required` on every item while none is checked and removes it from all of them once one is. The browser then blocks submission and focuses the first box, with its own message. The checked count has to follow `form.reset()`, which fires no `change` event, so this uses the `trackFormReset` helper from [K3](#k3-form-reset). The alternative, dropping the "required" announcement and leaving validation to the app, would make `required` mean something different on this one control.

Both change what a form submits or accepts, so they land before 1.0.

Also add `form` to `SelectOptions` and `ComboboxOptions` (Zag supports it for both), so every control can sit outside its form like NumberField and DatePicker. Cover each row with a `FormData` test and a native `required` test. Open upstream issues asking for hidden-input parts on combobox, date-picker, and number-input.

### K3. Form reset

[Z7](03-zag-compliance.md) leans toward removing DatePicker's reset listener. [Q1](07-code-quality.md) asks for a reset test. [S3](08-solid-best-practices.md) asks for a ref instead of `getElementById`. [Q4](07-code-quality.md) notes that DatePicker's `form` is reactive while NumberField's is read on mount. And since C4, the listener resets to the current `defaultValue` prop, while Zag's convention is the initial value.

What Zag and Ark UI do:

- Zag's own rule, from [chakra-ui/zag#245](https://github.com/chakra-ui/zag/issues/245), is that each form machine listens for its form's `reset` event and sets its value back to the initial one. The shared helper is `trackFormControl` in `@zag-js/dom-query`. It finds the form from the element, skips a reset whose event was prevented, and calls the machine's handler.
- In 1.44, Select and NumberInput do this. Combobox and DatePicker don't, and `main` hasn't changed that. I found no open issue asking for it.
- Ark UI adds nothing of its own. Its forms guide says all components sync on reset as long as their `HiddenInput` part is rendered, which in practice means "whatever Zag does". So Ark's Combobox and DatePicker don't restore on reset either.

Where this repo stands:

| Control                    | Restores on `form.reset()` | How                                                                   |
| -------------------------- | -------------------------- | --------------------------------------------------------------------- |
| Native controls and groups | yes                        | the browser, from `defaultValue` / `defaultChecked`                   |
| Select                     | yes                        | Zag, plus `attr:selected` ([Z6](03-zag-compliance.md))                |
| NumberField                | yes                        | Zag                                                                   |
| DatePicker                 | yes                        | our listener ([Z7](03-zag-compliance.md))                             |
| Combobox                   | **no**                     | nothing; the visible text and the hidden select keep the edited value |

The alternatives were to do only what Zag does (remove the DatePicker listener and document that Combobox and DatePicker don't reset, as in Ark), or to wait for an upstream fix before shipping v1.

**Decision:** follow Zag's rule ourselves, and send the fix upstream so our code can go.

- One internal `trackFormReset(element, onReset)` in `src/internal/`, mirroring Zag's `trackFormReset`. It finds the form from the element, reads it once on mount, and skips a reset whose event was prevented.
- Combobox and DatePicker use it to call `api().setValue` with the value captured on mount, which matches Zag's `context.initial("value")`. Check that Combobox's input text follows, showing the initial option's label or nothing.
- The element comes from a ref, not `getElementById` ([S3](08-solid-best-practices.md)). Reading `form` on mount matches NumberField and settles [Q4](07-code-quality.md).
- The listener runs on the client only, so SSR is unaffected ([K8](#k8-ssr)).
- Open an issue on `chakra-ui/zag` and offer a PR that adds `trackFormControl` to the combobox and date-picker machines, the way select and number-input have it. Each call site gets a comment with the issue link, and is deleted when a Zag release includes the fix.

### K4. NumberFieldAffix

[C6](01-consistency.md) listed `NumberFieldAffix` with the decorative marks that force `aria-hidden`. [A4](02-accessibility.md) needs the affix to be announced. The 02 implementation chose A4, which is right: a unit isn't decoration. No change. Say in the README that the affix is not a mark.

### K5. Empty value

[C4](01-consistency.md) asked DatePicker to expose a single value "the way Select exposes `string`". It now uses `null` for no selection, while Select and Combobox use `""`. A `DateValue` can't use `""`, so the only way to have one rule is `null`.

**Decision:** Select and Combobox take and report `string | null`, with `null` meaning no selection. `validateWidgetOptions` already rejects empty option values, so nothing is lost. This is a breaking change, so it lands in phase 1 with the rest of the API freeze.

### K6. Translation props

After A11, localization has four shapes: `labels` on the Pagination root, `requiredLabel` on `FieldsetLegend`, Zag's `translations` on DatePicker and NumberField, and `label` on Toaster. [Q5](07-code-quality.md) and [C10](01-consistency.md) want one place per component, with English defaults in contracts.

**Decision:** one rule per kind of component.

- Zag roots take Zag's `translations`, with Zag's type and Zag's defaults. Contracts don't depend on Zag, so this prop stays in the adapter's root props. Note in the contracts README that each adapter adds it.
- Other roots take `labels?: Partial<XLabels>`, with an `xLabels` defaults object in contracts, as Pagination does.
- `FieldsetLegend requiredLabel` becomes `Fieldset labels={{ required }}`.
- Toaster's `label` stays. It is the region's accessible name, like an `aria-label`, not a set of strings.

### K7. Typed `prop:` and `attr:`

[S1](08-solid-best-practices.md) adds a `jsx.d.ts` for `prop:defaultValue`, `prop:indeterminate`, and `attr:selected`. [Z1](03-zag-compliance.md) removes three of the `prop:defaultValue` uses. [B4](06-build-and-ci.md) decides the `solid-js` floor, and with a floor of 1.9.15 Checkbox can set `indeterminate` directly.

**Decision:** do S1 after Z1 and B4. The augmentation then only needs `defaultValue` for Input and TextArea and `selected` for Select's hidden options.

### K8. SSR

[P5](04-performance.md) wants the user's time zone computed once per module. [S6](08-solid-best-practices.md) warns that on a server that captures the server's zone, so the server and the client disagree about "today", and hydration fails. S6 also notes that description and error ids join `aria-describedby` only after mount.

**Decision:** v1 supports SSR, so S6 moves from "after 1.0" into v1.

- **Time zone.** On the server and during hydration, DatePicker uses the `timeZone` prop, or UTC when there is none. After mount it switches to the user's zone. P5's module-level cache applies on the client only, guarded with `isServer`. Document that an app can pass `timeZone` from the request to avoid the switch.
- **`aria-describedby`.** It is missing from server HTML and added after hydration. That doesn't cause a mismatch, since the first client render matches the server. Document it.
- **Browser APIs.** Only `onMount` and effects may touch `document` or `window`. Lint for it if eslint-plugin-solid or oxlint can, and test it with a server render of every component.
- **Packaging.** SSR goes through the `solid` export condition (`dist/index.jsx`), which the app's own `vite-plugin-solid` compiles for the server and the client. The `default` build is compiled for the DOM only. Check that this matches how solid-js libraries ship today, and prove it with an SSR smoke test.

### K9. Source export condition

[B7](06-build-and-ci.md) suggests a `"@simple-base/source": "./src/index.ts"` export condition so typecheck doesn't need a build. [B5](06-build-and-ci.md) adds publint, and `src/` isn't in the published `files`, so the published `exports` would point at a missing file.

**Decision:** skip the source condition for v1. Revisit after 1.0 with a `publishConfig.exports` override.

### K10. Order of tests, API changes, and refactors

[05](05-refactoring-helpers.md) says refactor only after tests exist, and [Z1](03-zag-compliance.md) says write the tests before removing workarounds. But tests written against `""` empty values, `requiredLabel`, or the old Empty structure would be rewritten a few days later.

**Decision:** make the small public API changes first (phase 1), then write the behavior tests (phase 2), then refactor (phase 3) and remove Zag workarounds (phase 4) under those tests. Structural changes from K1 land in phase 4 with their own test updates.

### K11. Handler order

[R6](05-refactoring-helpers.md) and [S8](08-solid-best-practices.md) skip the built-in handler when the caller's handler calls `preventDefault()`. That looks like a new rule, but most Zag `connect` handlers already return early on `event.defaultPrevented`. Adopting R6 makes non-Zag parts behave the same as Zag parts. Document it once in the README: "call `preventDefault()` in your handler to skip the built-in behavior".

## Phases

Each phase leaves `pnpm quality` and `pnpm build` passing and can ship on its own.

### Phase 0. Foundations

The tools the later phases rely on.

- [x] **Build race** ([B1](06-build-and-ci.md)). Set `dts: false, clean: false` on the `.jsx` config in `packages/solid/tsdown.config.ts`. Add a post-build check that `dist/` has `index.js`, `index.jsx`, and `index.d.ts`.
- [x] **Zag versions** ([B4](06-build-and-ci.md)). Pin every `@zag-js/*` package in the catalog to one exact version. Tests in phase 2 depend on Zag's exact behavior.
- [x] **Test harness** ([Q1](07-code-quality.md)). Vitest browser mode with the Playwright provider, `@solidjs/testing-library`, `@testing-library/user-event`, and `axe-core`. Add a second Vitest project in Node for server rendering with `renderToString` from `solid-js/web` ([K8](#k8-ssr)). Add a `test` task to `turbo.json` and run it in `ci.yml` and `publish.yml` ([B10](06-build-and-ci.md), [B12](06-build-and-ci.md)). Start with one passing test in each project so CI proves the setup.
- [x] **Lint** ([Q2](07-code-quality.md)). Extend `.oxlintrc.json` with the `jsx-a11y`, `import`, and `typescript` plugins and the `suspicious` and `perf` categories. Add `eslint-plugin-solid` for `packages/solid`, through oxlint's JS plugins if the installed version supports it, otherwise through ESLint with only that plugin. Fix what turns up, except the manual ref merges and `prop:` spreads that phases 3 and 4 rewrite; mark those with a TODO pointing here.

### Phase 1. Freeze the public API

Everything that is a breaking change after 1.0. Each item updates contracts, the Solid package, the READMEs, and the playground together.

- [x] **Empty value** ([K5](#k5-empty-value)). `SelectOptions` and `ComboboxOptions`: `value?: string | null`, `defaultValue?: string | null`, `onValueChange(value: string | null)`.
- [x] **Translation props** ([K6](#k6-translation-props)). Add `fieldsetLabels` to the `labels` pattern: `Fieldset labels={{ required }}`, drop `FieldsetLegend requiredLabel`. Document the Zag-vs-other rule in the Solid and contracts READMEs.
- [x] **Contracts cleanup** ([R9](05-refactoring-helpers.md), [Q4](07-code-quality.md)).
  - `ListboxOption` and `ListboxOptions` as the base, with `SelectOption`, `ComboboxOption`, `SelectOptions`, and `ComboboxOptions` as aliases.
  - `options: readonly ListboxOption[]`.
  - `type AlertStatus = StatusValue`.
  - JSDoc for `DialogOptions`, and for `disabled`, `invalid`, `required`, `placement`, and `onOpenChange` on Select and Combobox.
  - State in `ToastStatus`'s JSDoc why it is only `success` and `warning`.
  - `DatePickerOptions.form`: "Read on mount", matching NumberField ([K3](#k3-form-reset)).
- [x] **Dependencies** ([B4](06-build-and-ci.md)). Raise the `solid-js` peer to `^1.9.15`, the version tested. Make `@internationalized/date` a peer dependency of `solid` and a peer plus dev dependency of `contracts`.
- [x] **`parseDateInput`** ([Q6](07-code-quality.md)). Rename the `parseDate` re-export of Zag's `parse` to `parseDateInput`, so it doesn't share a name with `@internationalized/date`'s `parseDate`, which has different semantics.
- [x] **Form options** ([K2](#k2-form-participation)). Add `form` to `SelectOptions` and `ComboboxOptions`. Check that every form control accepts `name`, `form`, `required`, and `disabled`, including RadioGroup and CheckboxGroup items.
- [x] **Private hooks** ([Q6](07-code-quality.md)). Move `useFieldset` to `src/internal/` so it is visibly private.
- [x] **Switch name** ([Q8](07-code-quality.md)). Remove the `AccessibleName` union from `Switch.tsx`, so `SwitchProps` is typed like `CheckboxProps`. A wrapping `<label>`, a `<label for>` (including `FieldLabel`), `aria-label`, and `aria-labelledby` all stay valid. In the README's Switch section, show the wrapping `<label>` first and keep `aria-label` for a switch with no visible text. Loosening isn't breaking, but doing it now keeps the 1.0 types final.
- [x] **Docs for intentional limits** ([Q8](07-code-quality.md), [B5](06-build-and-ci.md)). `Input`'s restricted `type`, the Table parts as optional pass-throughs, the type-only contracts subpaths, that a Select or Combobox needs its Label part, and that `NumberFieldAffix` is announced, unlike the decorative marks ([K4](#k4-numberfieldaffix)). In `tokens`, note that `foreground-subtle` fails 4.5:1 in catppuccin-latte and `border-default` fails 3:1 everywhere, so neither goes on text or control boundaries.

### Phase 2. Behavior tests

Pin the current behavior, including every Zag workaround, before phases 3 and 4 change the code. Each workaround test names the finding it covers, so it can be deleted with the workaround. Tests for behavior that a later phase fixes use `test.fails`, so CI stays green and the test flips when the fix lands.

- [x] **Form controls.** Typing a partial number (`1.`) and typing a date ([Z1](03-zag-compliance.md)). For every row of the [K2](#k2-form-participation) table: what `FormData` contains, native `required` validation, and `form.reset()` ([Z6](03-zag-compliance.md), [Z7](03-zag-compliance.md), [K3](#k3-form-reset)). The NumberField number and the Combobox reset are expected to fail until phase 4.
- [x] **Server rendering.** Every component renders with `renderToString`, and a hydration test shows no mismatch, including DatePicker with and without `timeZone` ([K8](#k8-ssr)).
- [x] **Controlled and uncontrolled modes.** Dialog, AlertDialog, Pagination, Tabs, Select, Combobox, RadioGroup, and CheckboxGroup, including a parent that rejects a change ([A5](02-accessibility.md)).
- [x] **Description and error wiring.** `aria-describedby` on Field, Fieldset, NumberField, DatePicker, Select, and Combobox as the parts mount and unmount, including two Description parts in one root (the [R1](05-refactoring-helpers.md) bug, expected to fail until phase 3).
- [x] **Dialogs.** `aria-labelledby` and `aria-describedby` only when the parts render ([A7](02-accessibility.md)), Escape, and `returnValue`.
- [x] **Toast.** Queueing, update by `id`, `dismiss`, and `Infinity` duration with an action ([A10](02-accessibility.md)).
- [x] **Axe.** Each component's default rendering, a Switch named only by a wrapping `<label>`, and Select and Combobox without a Label part (expected to fail, which documents the requirement).

The phase 2 tests found four problems no report covered. Each is pinned with `test.fails` and scheduled below: the dialog `close` race (R3, phase 3), and the default state missing from server HTML, the Combobox drift on a rejected change, and the date picker's view trigger name (phase 4). They also found two gaps that [K2](#k2-form-participation) now closes in phase 4, pinned with `test.fails` too: an empty Select or Combobox leaves its `name` out of `FormData`, and a required CheckboxGroup submits with no box checked.

### Phase 3. Internal helpers

Under `packages/solid/src/internal/`, none of them exported. The test suite from phase 2 must stay green.

- [x] **R1, registration** ([R1](05-refactoring-helpers.md)). One helper that counts mounts instead of setting a boolean. It replaces the description and error code in Field, Fieldset, NumberField, DatePicker, Select, and Combobox, the title and description registration in Dialog and AlertDialog, and NumberField's affix list. Add internal `MessageDescription` and `MessageError` parts.
- [x] **R2, contexts** ([R2](05-refactoring-helpers.md)). `createRequiredContext(name)` for all compound components.
- [x] **R4, controllable state** ([R4](05-refactoring-helpers.md)). `createControllableSignal` for Dialog, AlertDialog, and Pagination.
- [x] **R3, dialogs** ([R3](05-refactoring-helpers.md), [S5](08-solid-best-practices.md)). One internal `createDialog` and `DialogContentBase`. The title-tag difference R3 lists is already gone, so only `role`, the class prefix, and the button variants remain. Add the `onCleanup` that closes an open dialog on unmount. Ignore a `close` event that arrives after the dialog was reopened: today the event from the previous close calls `setOpen(false)` and closes it again (`dialogs.test.tsx`).
- [x] **R6, handlers** ([R6](05-refactoring-helpers.md), [S8](08-solid-best-practices.md), [K11](#k11-handler-order)). `composeHandler` in Dialog, AlertDialog, Pagination, RadioGroup, and CheckboxGroup, which then stop importing `@zag-js/solid`. Document the `preventDefault()` rule in the README.
- [x] **R7, refs** ([R7](05-refactoring-helpers.md), [S2](08-solid-best-practices.md)). `mergeRefs` for CheckboxGroup, RadioGroup, DialogContent, and AlertDialogContent. Leave `ref` in `rest` in the parts that only forward it.
- [x] **R5 and R8, small helpers** ([R5](05-refactoring-helpers.md), [R8](05-refactoring-helpers.md)). `PopupPortal` behind the five portal names, the positioning memo, `dataAttr`, `ariaInvalid`, `WithoutOwnedProps`, and `toZagValue` / `fromZagValue` over `T | null`, shared by Select, Combobox, and DatePicker.

### Phase 4. Zag compliance

Each item either removes a workaround or keeps it with a test and an upstream issue. The rule: anything that rewrites what Zag returns goes; anything that adds what Zag lacks stays, tested and tracked.

- [x] **Z1, input props** ([Z1](03-zag-compliance.md)). Spread `getInputProps()` unchanged in ComboboxInput, NumberFieldInput, and DatePickerInput. If a phase 2 test fails, report it to `chakra-ui/zag` with the repro and accept Zag's behavior until it's fixed.
- [x] **Z3 and Z4, content and list** ([Z3](03-zag-compliance.md), [K1](#k1-empty-part)). `getContentProps()` on the content, `getListProps()` on the list, Empty parts outside the content. Remove the hand-mirrored `hidden`. Update the CSS, README, and playground.
- [ ] **Z2, Combobox hidden select** ([K2](#k2-form-participation)). Keep it. Open the upstream issue.
- [ ] **NumberField hidden input** ([K2](#k2-form-participation)). Submit the number through a hidden input and take `name` off the visible input. Open the upstream issue.
- [x] **Form reset** ([K3](#k3-form-reset), [Z7](03-zag-compliance.md), [S3](08-solid-best-practices.md)). Add the internal `trackFormReset`. Replace DatePicker's listener with it, and add it to Combobox, both resetting to the value captured on mount. The phase 2 reset tests for Combobox and DatePicker must pass.
- [ ] **Form reset upstream** ([K3](#k3-form-reset)). Open the `chakra-ui/zag` issue and offer the PR adding `trackFormControl` to the combobox and date-picker machines. Link the issue in a comment at both call sites.
- [ ] **Empty pickers submit `""`** ([K2](#k2-form-participation)). Select selects its hidden empty option while nothing is selected, and Combobox renders one. If Zag's hidden select is what leaves the option unselected, report it upstream. Do it with Z2 and Z6, which touch the same hidden selects. The K2 `test.fails` for both in `forms.test.tsx` must pass.
- [x] **Required CheckboxGroup** ([K2](#k2-form-participation)). `required` on every item while none is checked, tracking the checked count through `change` and `trackFormReset`, for controlled and uncontrolled groups. The K2 `test.fails` for `required` and `form.reset()` in `forms.test.tsx` must pass; add one for a rejected change ([A5](02-accessibility.md)). Say in the README that `Fieldset required` means "at least one" for a CheckboxGroup.
- [ ] **Z6, Z8, Z9.** Keep. Open upstream issues for select reset sync, a date-picker hidden input, and `data-required` on the date-picker label. Record each issue link in a comment next to the workaround.
- [x] **Z10.** Keep the `placement` default. The `timeZone` default changes in phase 5 ([K8](#k8-ssr)).
- [x] **S1, typed `prop:` and `attr:`** ([S1](08-solid-best-practices.md), [K7](#k7-typed-prop-and-attr)). Internal `src/jsx.d.ts` for `defaultValue` and `selected`. Checkbox sets `indeterminate` directly. Confirm the augmentation doesn't appear in `dist/index.d.ts`.
- [x] **Default state in server HTML** ([K8](#k8-ssr)). The server leaves out every default value: `defaultValue` goes through `prop:`, which Solid's server build drops, and `defaultChecked` is written as an attribute the browser ignores. So until hydration, `Input` and `TextArea` are empty and `Checkbox`, `Radio`, `Switch`, `RadioGroup`, and `CheckboxGroup` show nothing checked. Render them as the `value` and `checked` attributes (and `TextArea`'s text), which are also what `form.reset()` restores. Decide it together with S1, since it changes which `prop:` uses remain. The hydration tests for these fixtures must pass.
- [ ] **Combobox drift on a rejected change** ([A5](02-accessibility.md)). When a controlling parent keeps its `value`, Zag leaves the rejected option's label in the input, and only syncs the text when the value changes. Report it to `chakra-ui/zag`. Until it's fixed, restore the text the way RadioGroup re-syncs the DOM, for example with `api().syncSelectedItems()` when the value didn't change (`controlled.test.tsx`).
- [ ] **Date picker view trigger name** (WCAG 2.5.3). Zag labels the heading button "Switch to month view" while it shows "October 2026", so its name doesn't contain its visible text, and axe fails the open calendar. Zag's `viewTrigger` translation doesn't receive the visible text. Report it upstream, and until then have `DatePickerCalendar` set an `aria-label` that starts with the visible text (`axe.test.tsx`).
- [x] Remove the lint TODOs from phase 0.

The code for every item above has landed; the unchecked ones only wait for their upstream issue. [zag-issues.md](zag-issues.md) holds the drafts (U1 to U11), and each workaround's comment names its draft until the issue link replaces it. The implementation settled four things the items above didn't:

- **Z1 keeps one addition.** With Zag's props spread unchanged, `form.reset()` blanked the three inputs whenever their value didn't change, because `@zag-js/solid` turns Zag's `defaultValue` into a live `value` and the browser resets text inputs from the `value` attribute. Each input now also sets `prop:defaultValue` to Zag's text, without removing or renaming anything Zag returns (U11, with a test per input). So `jsx.d.ts` types `defaultValue`, as S1 expected.
- **The list doesn't spread `getListProps()`.** In composite mode the list props name the list, and select's make it focusable, so axe fails the open popup with `aria-required-children`. `SelectList` and `ComboboxList` stay `ul` elements with `role="presentation"` and no Zag props, which keeps their public types (U10).
- **Select's empty option** is selected by an effect that runs after Zag's sync, since Zag sets `selectedIndex = -1` for an empty value (U6). Combobox's hidden select renders a single option whose value is `""` while nothing is selected.
- **Native defaults** render as `attr:value` on `Input`, the text of `TextArea`, and `bool:checked` on `Checkbox`, `Radio`, and `Switch`, so no `prop:` remains in the native controls. There were no lint TODOs left from phase 0 to remove.

### Phase 5. Runtime fixes

- [ ] **Dev-only validation** ([P2](04-performance.md), [Q3](07-code-quality.md)). Guard `validateWidgetOptions` with `isDev` from `solid-js/web`.
- [ ] **Calendar** ([P1](04-performance.md), [Q8](07-code-quality.md)). Wrap each `DatePickerCalendar` view in `<Show>` on `api().view`, read `getDecade()` once, and give the calendar root a class and `splitProps`. Test that keyboard focus moves correctly between views.
- [ ] **Combobox filter** ([P3](04-performance.md)). `Intl.Collator(locale, { sensitivity: "base" })` so "e" matches "é". Precomputing lowercased labels isn't needed at invoice-app sizes.
- [ ] **Time zone** ([P5](04-performance.md), [S6](08-solid-best-practices.md), [K8](#k8-ssr)). The `timeZone` prop or UTC on the server and during hydration, the user's zone after mount, cached per module on the client only. Document passing `timeZone` from the request.
- [ ] **SSR docs** ([K8](#k8-ssr)). A README section: SSR goes through the `solid` export condition, `aria-describedby` completes after hydration, and DatePicker's time zone behavior.

### Phase 6. Packaging

- [ ] **Package contents** ([B5](06-build-and-ci.md)). A LICENSE in each package, `description`, `keywords`, `homepage`, `bugs`, and `author` in each manifest, and a `default` condition next to `import` in `contracts` and `tokens`.
- [ ] **Published-shape checks** ([B5](06-build-and-ci.md)). publint and attw through tsdown for `contracts` and `solid`. Check the option names in the installed tsdown docs.
- [ ] **Declarations** ([B3](06-build-and-ci.md)). Diff `dist/index.d.ts` from TypeScript 7 against one from the stable compiler tsdown fully supports. If they differ, emit declarations with the stable one. Consider `isolatedDeclarations` for `contracts` ([B8](06-build-and-ci.md)), which lets declarations skip the TypeScript API altogether.
- [ ] **tsconfig** ([B8](06-build-and-ci.md), [B2](06-build-and-ci.md)). A shared `tsconfig.base.json` with `verbatimModuleSyntax` and the unused checks. Drop `@types/node`, `allowJs`, and `strictNullChecks` from `solid`. Make the preserve build's `jsx` override explicit so the build log is quiet.
- [ ] **Turbo** ([B7](06-build-and-ci.md)). A `typecheck` script for `tokens`, and no `.env*` in the `build` inputs. No source export condition ([K9](#k9-source-export-condition)).
- [ ] **Leftovers** ([B9](06-build-and-ci.md)). Delete `packages/solid/.gitignore` and the empty `.npmrc`.
- [ ] **Smoke test** ([B6](06-build-and-ci.md)). Pack the four packages, install them in a scratch Vite and Solid app, build it, and check that `Button` and `Select` render and the CSS resolves `@simple-base/tokens/css`. Do it a second time with server rendering and hydration, through Vite SSR or SolidStart ([K8](#k8-ssr)).

### Phase 7. CI and release

- [ ] **CI** ([B10](06-build-and-ci.md), [B11](06-build-and-ci.md)). Run tests, publint and attw, the smoke test, and axe on the playground. Pin actions to commit SHAs, add `timeout-minutes`, and cache `.turbo`.
- [ ] **Examples** ([Q7](07-code-quality.md)). Move the playground code strings into real `.tsx` files that are both rendered and shown as source, so the examples are type-checked and the axe run in CI covers them.
- [ ] **Publishing** ([B12](06-build-and-ci.md)). npm trusted publishing instead of `NPM_TOKEN`, after confirming the pinned pnpm supports it. Changesets for versions and changelogs. Keep the `dry_run` default.
- [ ] **Release 1.0.0** across the four packages (`todo.md`).

## After 1.0

- [P4](04-performance.md): tsdown `unbundle` output, measured against the smoke test.
- [K9](#k9-source-export-condition): the source export condition, with a `publishConfig.exports` override.
- [S7](08-solid-best-practices.md): `ComponentProps` and `ParentProps` for new components only.
- [S9](08-solid-best-practices.md): Solid 2.0, once Zag's Solid adapter supports it. The phase 3 helpers keep that change small.
- Remove Z2, Z6, Z7, Z8, Z9, the NumberField hidden input, and the reset listeners as their upstream issues ship.
