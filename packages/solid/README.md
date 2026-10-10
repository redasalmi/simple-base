# @simple-base/solid

Accessible [SolidJS](https://www.solidjs.com/) components for Simple Base — native element behavior, a small props surface, and styling that lives in plain CSS.

## Install

```sh
pnpm add @simple-base/solid
```

Install the stylesheet alongside it, since the components only emit class names and attributes:

```sh
pnpm add @simple-base/css
```

`solid-js` and `@internationalized/date` are peer dependencies and are not bundled. Sharing one copy of `@internationalized/date` keeps the `DateValue` objects you create compatible with the date picker.

## Quick start

Import the stylesheet once in your entry point:

```ts
import "@simple-base/css";
```

Then use the components. Every component accepts `class` plus the native attributes for the element it renders:

```tsx
import { Badge, Button, Input } from "@simple-base/solid";

export function Toolbar() {
  return (
    <form>
      <Input name="email" type="email" placeholder="you@example.com" required />
      <Button type="submit">Save</Button>
      <Button variant="ghost" size="small">
        Cancel
      </Button>
      <Badge variant="success">Active</Badge>
    </form>
  );
}
```

Prefer importing only the stylesheets you use:

```ts
import "@simple-base/tokens/css";
import "@simple-base/css/button";
import "@simple-base/css/badge";
```

## Components

**Simple components** render one element and take native props:

| Component  | Renders                | Options                                                                              |
| ---------- | ---------------------- | ------------------------------------------------------------------------------------ |
| `Button`   | `button`               | `variant`, `size`                                                                    |
| `Badge`    | `span`                 | `variant`, `size`                                                                    |
| `Card`     | `div`                  | `variant`                                                                            |
| `Input`    | `input`                | Native input props; `type` is `text`, `email`, `password`, `search`, `tel`, or `url` |
| `TextArea` | `textarea`             | Native props                                                                         |
| `Checkbox` | `input[type=checkbox]` | Native props; `indeterminate` shows the mixed state                                  |
| `Radio`    | `input[type=radio]`    | Native props                                                                         |
| `Switch`   | `input[role=switch]`   | Native props                                                                         |

**Composable components** use named exports so bundlers can remove unused parts. Each part is prefixed with its root name:

| Root            | Named parts                                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AlertDialog`   | `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogIcon`, `AlertDialogHeader`, `AlertDialogKicker`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogCancel`, `AlertDialogAction`                     |
| `Dialog`        | `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogKicker`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`, `DialogAction`                                                                                      |
| `Field`         | `FieldLabel`, `FieldInput`, `FieldTextArea`, `FieldDescription`, `FieldError`                                                                                                                                                            |
| `Fieldset`      | `FieldsetLegend`, `FieldsetDescription`, `FieldsetError`                                                                                                                                                                                 |
| `RadioGroup`    | `RadioGroupItem` (inside a `Fieldset`)                                                                                                                                                                                                   |
| `CheckboxGroup` | `CheckboxGroupItem` (inside a `Fieldset`)                                                                                                                                                                                                |
| `NumberField`   | `NumberFieldLabel`, `NumberFieldControl`, `NumberFieldInput`, `NumberFieldDecrement`, `NumberFieldIncrement`, `NumberFieldAffix`, `NumberFieldDescription`, `NumberFieldError`                                                           |
| `Combobox`      | `ComboboxLabel`, `ComboboxControl`, `ComboboxInput`, `ComboboxTrigger`, `ComboboxPortal`, `ComboboxPositioner`, `ComboboxContent`, `ComboboxList`, `ComboboxEmpty`, `ComboboxItem`, `ComboboxDescription`, `ComboboxError`               |
| `DatePicker`    | `DatePickerLabel`, `DatePickerControl`, `DatePickerInput`, `DatePickerTrigger`, `DatePickerPortal`, `DatePickerPositioner`, `DatePickerContent`, `DatePickerCalendar`, `DatePickerDescription`, `DatePickerError`, plus `parseDateInput` |
| `Menu`          | `MenuTrigger`, `MenuPortal`, `MenuPositioner`, `MenuContent`, `MenuItem`, `MenuItemShortcut`, `MenuGroup`, `MenuGroupLabel`, `MenuSeparator`                                                                                             |
| `Tooltip`       | `TooltipTrigger`, `TooltipPortal`, `TooltipPositioner`, `TooltipContent`, `TooltipArrow`                                                                                                                                                 |
| `Tabs`          | `TabsList`, `TabsTrigger`, `TabsContent`                                                                                                                                                                                                 |
| `Select`        | `SelectLabel`, `SelectControl`, `SelectTrigger`, `SelectValueText`, `SelectIndicator`, `SelectPortal`, `SelectPositioner`, `SelectContent`, `SelectList`, `SelectEmpty`, `SelectItem`, `SelectDescription`, `SelectError`                |
| `EmptyState`    | `EmptyStateMark`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateActions`                                                                                                                                                        |
| `Alert`         | `AlertMark`, `AlertContent`, `AlertTitle`, `AlertDescription`, `AlertActions`, `AlertClose`                                                                                                                                              |
| `StatusLine`    | `StatusLineDot`, `StatusLineContent`, `StatusLineTitle`, `StatusLineDescription`                                                                                                                                                         |
| `Table`         | `TableWrap`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableColumnHeader`, `TableRowHeader`, `TableCell`, `TableSortButton`                                                                                |
| `Pagination`    | `PaginationPrevious`, `PaginationPages`, `PaginationNext`                                                                                                                                                                                |
| `Toaster`       | `Toast`, `ToastIcon`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, plus `createToaster`                                                                                                                |

The CSS package ships more components than this adapter currently covers. Until a Solid component exists, use them through their selector-level APIs. Breadcrumb, disclosure, keyboard shortcut, progress, range, and segmented control are planned after 1.0.

`Input` deliberately accepts only text-like types. Numbers and dates have their own components, `NumberField` and `DatePicker`, and checkboxes and radios have `Checkbox` and `Radio`.

Typography stays CSS-only: the `.sb-display`, `.sb-heading-*`, and `.sb-text-*` classes are the API.

The library styles native elements and states and leaves app-specific affordances, such as loading states and spinners, to your application.

## Switch

A native checkbox with `role="switch"`, for a setting that applies immediately. Name it like a `Checkbox`: wrap it in a `<label>`, or point a `<label for>` at its `id`.

```tsx
import { Switch } from "@simple-base/solid";

<label>
  <Switch name="digest" defaultChecked />
  Weekly digest
</label>;
```

Give a switch with no visible text an `aria-label` instead, such as `<Switch aria-label="Live preview" />`.

## Field

Wraps one `FieldInput` or `FieldTextArea` with its label, description, and error. `id`, `required`, `disabled`, and `invalid` are set on the root only; the control, label, and messages read them from it.

```tsx
import { createSignal } from "solid-js";
import { Field, FieldDescription, FieldError, FieldInput, FieldLabel } from "@simple-base/solid";

export function EmailField() {
  const [email, setEmail] = createSignal("");

  return (
    <Field id="email" required invalid={email() !== "" && !email().includes("@")}>
      <FieldLabel>Email</FieldLabel>
      <FieldInput
        type="email"
        name="email"
        value={email()}
        onInput={(event) => setEmail(event.currentTarget.value)}
      />
      <FieldDescription>We never share it.</FieldDescription>
      <FieldError>Enter a full email address.</FieldError>
    </Field>
  );
}
```

`FieldInput` and `FieldTextArea` take the same props as `Input` and `TextArea`, except `id`, `required`, `disabled`, `aria-invalid`, and `aria-describedby`, which come from the root. `aria-describedby` lists the description and the error while they are rendered. `FieldError` renders only while `invalid` is set. Omit `id` to generate one.

Use one control per `Field`: every control in a field gets the same `id`. `Select`, `Combobox`, `NumberField`, `DatePicker`, `Checkbox`, `Radio`, and `Switch` carry their own labeling and are not used inside a `Field`.

## Fieldset

Groups related controls under a native `<fieldset>` and `<legend>`. `required`, `disabled`, and `invalid` are set on the root only. `disabled` is the native attribute, so every control inside is disabled with it.

```tsx
import {
  Field,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
} from "@simple-base/solid";

<Fieldset>
  <FieldsetLegend>Billing address</FieldsetLegend>
  <FieldsetDescription>Printed on every invoice.</FieldsetDescription>
  <Field>
    <FieldLabel>Street</FieldLabel>
    <FieldInput name="street" />
  </Field>
  <Field>
    <FieldLabel>City</FieldLabel>
    <FieldInput name="city" />
  </Field>
</Fieldset>;
```

Put `FieldsetLegend` first; `required` adds its marker, plus visually hidden text read after the legend. `labels` on the root sets that text, for example to translate it: `labels={{ required: "(obligatoire)" }}`. It defaults to "(required)" from `fieldsetLabels` in `@simple-base/contracts`. The fieldset lists `FieldsetDescription`, and `FieldsetError` while it is rendered, in its `aria-describedby`. `FieldsetError` renders only while `invalid` is set. Omit `id` to generate one.

## RadioGroup and CheckboxGroup

Render a list of choice rows inside a `Fieldset`, which names the group and supplies `required` and `invalid`. Each item is a `label` holding a native `Radio` or `Checkbox` and its text.

```tsx
import { createSignal } from "solid-js";
import {
  CheckboxGroup,
  CheckboxGroupItem,
  Fieldset,
  FieldsetError,
  FieldsetLegend,
  RadioGroup,
  RadioGroupItem,
} from "@simple-base/solid";

const [reminders, setReminders] = createSignal(["due"]);

<form>
  <Fieldset required>
    <FieldsetLegend>Currency</FieldsetLegend>
    <RadioGroup name="currency" defaultValue="eur">
      <RadioGroupItem value="eur">Euro</RadioGroupItem>
      <RadioGroupItem value="usd">US dollar</RadioGroupItem>
    </RadioGroup>
  </Fieldset>
  <Fieldset invalid={reminders().length === 0}>
    <FieldsetLegend>Payment reminders</FieldsetLegend>
    <CheckboxGroup name="reminders" value={reminders()} onValueChange={setReminders}>
      <CheckboxGroupItem value="before">3 days before the due date</CheckboxGroupItem>
      <CheckboxGroupItem value="due">On the due date</CheckboxGroupItem>
    </CheckboxGroup>
    <FieldsetError>Pick at least one reminder.</FieldsetError>
  </Fieldset>
</form>;
```

- `RadioGroup` takes a string `value` (`""` selects nothing), `defaultValue`, and `onValueChange`. `name` is shared by every radio and generated when omitted. A required fieldset makes the radios natively required. A controlled group shows `value` after `onValueChange` returns, so a change the parent rejects is undone.
- `CheckboxGroup` takes a `string[]` `value`, `defaultValue`, and `onValueChange`, which receives the checked values in document order. As with `RadioGroup`, a controlled group undoes a change the parent rejects. A required fieldset means "at least one": while no box is checked, every box is natively required, so the browser blocks submission and points at the first one; once a box is checked, none is. Pass `required` to a single item that must be checked whatever the others.
- On an item, `value` is required and `children` is the label text. `class` goes on the row; every other prop goes to the input. `name`, `checked`, `defaultChecked`, and `aria-invalid` (plus `required` on radios) come from the group and fieldset.

## NumberField

A numeric input with optional step buttons and affixes. `id`, `required`, `disabled`, `readOnly`, and `invalid` are set on the root only, as with `Field`.

```tsx
import { createSignal } from "solid-js";
import {
  NumberField,
  NumberFieldControl,
  NumberFieldDecrement,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@simple-base/solid";

export function UnitPrice() {
  const [price, setPrice] = createSignal("120");

  return (
    <NumberField
      name="unitPrice"
      value={price()}
      onValueChange={(value) => setPrice(value)}
      min={0}
      step={0.01}
      formatOptions={{ style: "currency", currency: "EUR" }}
    >
      <NumberFieldLabel>Unit price</NumberFieldLabel>
      <NumberFieldControl>
        <NumberFieldInput />
        <NumberFieldDecrement />
        <NumberFieldIncrement />
      </NumberFieldControl>
      <NumberFieldDescription>Excluding VAT.</NumberFieldDescription>
      <NumberFieldError>Enter a price of 0 or more.</NumberFieldError>
    </NumberField>
  );
}
```

Additional root props:

- `value` and `defaultValue` are strings, so partial input such as `1.` survives while typing. `onValueChange` receives the string and its parsed number (`NaN` when empty).
- `min`, `max`, and `step` bound and step the value. When `invalid` is omitted, a value outside `min` and `max` is invalid and shows `NumberFieldError`.
- `formatOptions` takes `Intl.NumberFormatOptions`, such as a currency or percent style, to format the displayed value.
- `name` adds a hidden input that submits the number, such as `1234`, rather than the formatted text, such as `€1,234.00`; it is empty while the field is. `form` associates both inputs with a form elsewhere on the page.
- `translations` takes Zag's number input labels: `incrementLabel`, `decrementLabel`, and `valueText`.

`NumberFieldDecrement` and `NumberFieldIncrement` render `−` and `+` unless you pass children, and are labeled "decrease value" and "increment value" unless you set `translations` or pass `aria-label`. `NumberFieldAffix` renders text, such as a unit, inside the control; the input lists each affix in its `aria-describedby`, so the unit is announced with the value. Unlike the decorative marks (`AlertMark`, `EmptyStateMark`, `StatusLineDot`), an affix is not hidden from assistive technology. `NumberFieldError` renders only while the field is invalid.

## Select

`options` is required. `SelectLabel` holds the visible label, which also names the trigger and the list, so every `Select` needs one; there is no `aria-label` fallback. `onValueChange` receives the selected option's value, not its label, or `null` when the selection is cleared. Omit `id` to generate one. `options` may be a read-only array, such as one declared `as const`.

```tsx
import { createSignal } from "solid-js";
import {
  Select,
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from "@simple-base/solid";

const timezones = [
  { label: "Central European Time (UTC+01:00)", value: "cet" },
  { label: "Coordinated Universal Time", value: "utc" },
  { label: "Japan Standard Time", value: "jst", disabled: true },
];

export function TimezonePicker() {
  const [timezone, setTimezone] = createSignal<string | null>(null);

  return (
    <Select
      id="timezone"
      placeholder="Select a timezone"
      options={timezones}
      onValueChange={setTimezone}
    >
      <SelectLabel>Timezone</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText />
          <SelectIndicator>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </SelectIndicator>
        </SelectTrigger>
      </SelectControl>
      <SelectPortal>
        <SelectPositioner>
          <SelectContent>
            <SelectList>{(option) => <SelectItem option={option} />}</SelectList>
          </SelectContent>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  );
}
```

Additional root props: `value` makes selection controlled (`null` means nothing is selected), `defaultValue` sets the initial selection of an uncontrolled select, `name` adds a hidden native select so the value submits with the form (an empty value while nothing is selected, like a native placeholder option), `form` associates it with a form elsewhere on the page, `disabled`, `invalid`, and `required` drive state styling and labeling, `placement` picks the popup side, and `onOpenChange` reports visibility.

`SelectDescription` and `SelectError` work like `NumberFieldDescription` and `NumberFieldError`: the trigger lists them in its `aria-describedby` while they are rendered, and `SelectError` renders only while `invalid` is set.

With `name` and `defaultValue`, a `Select` works uncontrolled inside a `<form>`: no `onValueChange` is needed, and `form.reset()` restores the initial selection.

`SelectContent` is the listbox, so it holds only `SelectList` and its items. `SelectEmpty` goes after it, inside `SelectPositioner`, and appears only while the popup is open with no options; the empty content then draws no box. `SelectPortal` accepts `mount` — pass a dialog element's node to keep the popup interactive inside a native modal.

## Combobox

Same root props and parts as `Select`, with a text input that filters options by label, ignoring case and accents, so "etienne" finds "Saint-Étienne". `ComboboxLabel` names the input and the list, so every `Combobox` needs one. `ComboboxDescription` and `ComboboxError` are linked to the input. `name` adds a hidden native select that submits the option value, not the typed text, or an empty value while nothing is selected. `ComboboxEmpty` goes after `ComboboxContent`, as with `SelectEmpty`, and announces itself through a status region when a search has no matches.

```tsx
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@simple-base/solid";

<Combobox
  id="country"
  placeholder="Search countries"
  options={countries}
  onValueChange={setCountry}
>
  <ComboboxLabel>Country</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput />
    <ComboboxTrigger>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </ComboboxTrigger>
  </ComboboxControl>
  <ComboboxPortal>
    <ComboboxPositioner>
      <ComboboxContent>
        <ComboboxList>{(option) => <ComboboxItem option={option} />}</ComboboxList>
      </ComboboxContent>
      <ComboboxEmpty>No countries found. Try another search.</ComboboxEmpty>
    </ComboboxPositioner>
  </ComboboxPortal>
</Combobox>;
```

## DatePicker

A text input and a popup calendar for one date. Values are `DateValue` objects from [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/); create them with `parseDateInput`, Zag's date parser, which this package re-exports. It takes an ISO date such as `"2026-10-12"`, or a `Date`, read in local time. It is not `@internationalized/date`'s `parseDate`, which only takes ISO strings. `id`, `required`, `disabled`, `readOnly`, and `invalid` are set on the root only, as with `Field`.

```tsx
import { createSignal } from "solid-js";
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerControl,
  DatePickerDescription,
  DatePickerError,
  DatePickerInput,
  DatePickerLabel,
  DatePickerPortal,
  DatePickerPositioner,
  DatePickerTrigger,
  parseDateInput,
  type DateValue,
} from "@simple-base/solid";

export function DueDate() {
  const [due, setDue] = createSignal<DateValue | null>(parseDateInput("2026-10-12"));

  return (
    <DatePicker
      value={due()}
      onValueChange={(value) => setDue(value)}
      min={parseDateInput("2026-10-05")}
      max={parseDateInput("2026-11-20")}
    >
      <DatePickerLabel>Due date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput />
        <DatePickerTrigger />
      </DatePickerControl>
      <DatePickerDescription>Between October 5 and November 20.</DatePickerDescription>
      <DatePickerError>Pick a date in range.</DatePickerError>
      <DatePickerPortal>
        <DatePickerPositioner>
          <DatePickerContent>
            <DatePickerCalendar />
          </DatePickerContent>
        </DatePickerPositioner>
      </DatePickerPortal>
    </DatePicker>
  );
}
```

Additional root props:

- `value` and `defaultValue` take a `DateValue`, or `null` for no date. `onValueChange` receives the date (`null` when cleared) and the text shown in the input.
- `min` and `max` disable the days outside the range. A typed date outside it is clamped to the nearest bound when the input loses focus; the picker never sets `invalid` on its own.
- `locale` (default `en-US`) sets the input format, the first day of the week, and the calendar's month and day names. `timeZone` decides which day is today and defaults to the user's time zone, which is only known once the picker has mounted; see [Server rendering](#server-rendering).
- `translations` takes Zag's date picker labels, such as `trigger`, `prevTrigger`, `nextTrigger`, `viewTrigger`, and `dayCell`. They are English unless you set them, whatever the `locale`.
- `name` adds a hidden input that submits the date as `YYYY-MM-DD`, since the visible input holds locale-formatted text. `form` associates both inputs with a form elsewhere on the page.
- `placement` picks the popup side (default `bottom-start`), `fixedWeeks` always shows six weeks so the popup keeps its height, and `onOpenChange` reports visibility.

`DatePickerCalendar` renders the navigation and the current view, day, month, or year; select the month heading to switch views. Each heading's name starts with the text it shows, followed by the `viewTrigger` translation, such as "October 2026, Switch to month view". `DatePickerTrigger` renders a calendar icon unless you pass children. `DatePickerPortal` accepts `mount`, like `SelectPortal`.

## Menu

A button that opens a list of commands, such as the actions for a table row. `onSelect` receives the picked item's `value`; the menu then closes and returns focus to the trigger.

```tsx
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPortal,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
} from "@simple-base/solid";

export function InvoiceActions(props: { id: string }) {
  return (
    <Menu placement="bottom-end" onSelect={(action) => runAction(props.id, action)}>
      <MenuTrigger variant="ghost" size="small" aria-label={`Actions for ${props.id}`}>
        ⋯
      </MenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuContent>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem value="delete" variant="danger">
              Delete
            </MenuItem>
          </MenuContent>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  );
}
```

Root props: `onSelect`, `open` with `onOpenChange` for controlled state, `defaultOpen` for uncontrolled initial state, `placement` for the popup side (default `bottom-start`), and `id`, the base of the trigger and content ids (generated when omitted). The root renders no element of its own.

`MenuTrigger` takes the `Button` props, including `variant` and `size`; give an icon-only trigger an `aria-label`. `MenuItem` takes `value`, `disabled`, and `variant="danger"`. Typeahead matches the start of an item's text. Wrap items in `MenuGroup` with a `MenuGroupLabel` to name a set, and put display-only key hints in `MenuItemShortcut`; binding the keys stays in your app. Like `SelectPortal`, `MenuPortal` accepts `mount` for use inside a native modal.

## Tooltip

A short label shown on hover or keyboard focus, most often to name an icon-only button.

```tsx
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@simple-base/solid";

<Tooltip>
  <TooltipTrigger variant="ghost" aria-label="Download PDF">
    <DownloadIcon />
  </TooltipTrigger>
  <TooltipPortal>
    <TooltipPositioner>
      <TooltipContent>
        <TooltipArrow />
        Download PDF
      </TooltipContent>
    </TooltipPositioner>
  </TooltipPortal>
</Tooltip>;
```

Root props: `open` with `onOpenChange` for controlled state, `defaultOpen` for uncontrolled initial state, `placement` for the preferred side (default `bottom`), and `id`, the base of the trigger and content ids (generated when omitted). The root renders no element of its own.

`TooltipTrigger` takes the `Button` props, including `variant` and `size`, and defaults to `type="button"`. The trigger points `aria-describedby` at the content only while it is open, so an icon-only trigger still needs its own `aria-label`. The content is not interactive; keep it to a short label. `TooltipArrow` is optional and goes first inside `TooltipContent`. Like `SelectPortal`, `TooltipPortal` accepts `mount` for use inside a native modal.

## Tabs

A set of tabs, each showing its own panel. Arrow keys move between tabs and select them as they go; Home and End jump to the ends.

```tsx
import { createSignal } from "solid-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@simple-base/solid";

export function InvoiceFilters() {
  const [status, setStatus] = createSignal("all");

  return (
    <Tabs value={status()} onValueChange={setStatus}>
      <TabsList aria-label="Invoice status">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="paid">Paid</TabsTrigger>
        <TabsTrigger value="overdue">Overdue</TabsTrigger>
      </TabsList>
      <TabsContent value="all">…</TabsContent>
      <TabsContent value="paid">…</TabsContent>
      <TabsContent value="overdue">…</TabsContent>
    </Tabs>
  );
}
```

Root props: `value` with `onValueChange` for controlled state, or `defaultValue` for uncontrolled initial state. One of them is required, since with no tab selected no tab can be reached with Tab. The root renders a `div` without a class of its own; `id` sets its id and is the base of the tab and panel ids, such as `tabs:{id}:content-{value}`. Omit `id` to generate one.

Give `TabsList` an `aria-label` that names the set. Each `TabsTrigger` takes a `value` that matches its `TabsContent`, and `disabled` to keep a tab visible but unselectable. Panels stay hidden unless selected and are focusable, so keyboard users can reach panels with no focusable content.

## Table

`ColumnHeader` defaults `scope` to `col` and `RowHeader` to `row`. `Cell` accepts `variant`: `code` or `number`.

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableRowHeader,
  TableWrap,
} from "@simple-base/solid";

<TableWrap>
  <Table>
    <TableCaption>Recent invoices</TableCaption>
    <TableHeader>
      <TableRow>
        <TableColumnHeader>Invoice</TableColumnHeader>
        <TableColumnHeader>Status</TableColumnHeader>
        <TableColumnHeader>Amount</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableRowHeader>INV-001</TableRowHeader>
        <TableCell>Paid</TableCell>
        <TableCell variant="number">$250.00</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableWrap>;
```

`TableWrap` provides the horizontal scroll container the table styles expect. `TableFooter` renders a `tfoot`, for example for totals.

`TableHeader`, `TableBody`, `TableFooter`, `TableRow`, and `TableCaption` add no class or behavior: the styles target them as descendants of `Table`. Use them for consistent naming, or use the native `thead`, `tbody`, `tfoot`, `tr`, and `caption` instead.

### Sortable columns

Put a `TableSortButton` inside a column header and set `aria-sort` on the sorted header only. The button's direction indicator follows `aria-sort`; sorting the rows stays in your app.

```tsx
const [sort, setSort] = createSignal<{ key: string; direction: "ascending" | "descending" }>({
  key: "amount",
  direction: "descending",
});
const ariaSort = (key: string) => (sort().key === key ? sort().direction : undefined);
const toggleSort = (key: string) =>
  setSort((current) => ({
    key,
    direction:
      current.key === key && current.direction === "ascending" ? "descending" : "ascending",
  }));

<TableColumnHeader aria-sort={ariaSort("amount")}>
  <TableSortButton onClick={() => toggleSort("amount")}>Amount</TableSortButton>
</TableColumnHeader>;
```

`TableSortButton` renders a `type="button"` followed by a decorative indicator. Keep it the only child of the header, since the indicator styles read `aria-sort` from its parent `th`.

## Pagination

Renders a `nav` with previous and next buttons and a page list. `count` is the total number of pages; slicing the records stays in your app.

```tsx
import { createSignal } from "solid-js";
import {
  Pagination,
  PaginationNext,
  PaginationPages,
  PaginationPrevious,
} from "@simple-base/solid";

const [page, setPage] = createSignal(1);

<Pagination aria-label="Invoice pages" count={12} page={page()} onPageChange={setPage}>
  <PaginationPrevious>‹</PaginationPrevious>
  <PaginationPages />
  <PaginationNext>›</PaginationNext>
</Pagination>;
```

- `page` is controlled and clamped to `1`–`count`. Use `defaultPage` for uncontrolled state. `onPageChange` receives the page the user picked.
- `PaginationPages` always shows the first and last pages, plus `siblingCount` pages (default `1`) on each side of the current one, and replaces the gaps with ellipses. Its buttons are named "Page N" (override with `getPageLabel`) and the current one has `aria-current="page"`.
- `PaginationPrevious` and `PaginationNext` are named "Previous page" and "Next page" unless you pass `aria-label`. At either end they set `aria-disabled` instead of `disabled`, so focus stays on them.
- The `nav` is labeled "Pagination" by default. Pass `aria-label` to name it after what it pages, especially when a page has more than one.
- `labels` on the root sets these names in one place, for example to translate them: `{ root, previous, next, page }`, where `page` is a function of the page number. Each one you omit keeps its English default from `paginationLabels` in `@simple-base/contracts`.

## EmptyState

Stands in for a list or table with nothing to show: what is missing, why, and the next action.

```tsx
import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMark,
  EmptyStateTitle,
} from "@simple-base/solid";

<EmptyState>
  <EmptyStateMark>∅</EmptyStateMark>
  <EmptyStateTitle level={3}>No invoices yet</EmptyStateTitle>
  <EmptyStateDescription>Create an invoice to start tracking payments.</EmptyStateDescription>
  <EmptyStateActions>
    <Button>Create invoice</Button>
  </EmptyStateActions>
</EmptyState>;
```

`EmptyStateTitle` renders an `h2` unless you pass `level`; pick the level that fits the surrounding headings. `EmptyStateMark` is decorative and hidden from assistive technology, so the title carries the meaning. Every part is optional.

## Alert

An inline message about the page or a form, with an optional recovery action and dismiss control. `status` is `success`, `warning`, `danger`, or `info`.

```tsx
import { createSignal, Show } from "solid-js";
import {
  Alert,
  AlertActions,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertMark,
  AlertTitle,
  Button,
} from "@simple-base/solid";

const [open, setOpen] = createSignal(true);

<Show when={open()}>
  <Alert status="warning" role="status">
    <AlertMark>!</AlertMark>
    <AlertContent>
      <AlertTitle>2 invoices are overdue</AlertTitle>
      <AlertDescription>Send a reminder or record a payment to clear them.</AlertDescription>
      <AlertActions>
        <Button size="small" variant="secondary">
          Send reminders
        </Button>
      </AlertActions>
    </AlertContent>
    <AlertClose aria-label="Dismiss overdue invoices alert" onClick={() => setOpen(false)}>
      ×
    </AlertClose>
  </Alert>
</Show>;
```

`AlertMark` is decorative and hidden from assistive technology, so the title carries the meaning. `AlertClose` renders a `type="button"` that never submits a form; it does not hide the alert, so remove it from your own state and give the button an accessible name. `role` is not set for you: use `alert` for urgent messages inserted after load, `status` for polite updates, and nothing for alerts present when the page renders.

## StatusLine

A compact status summary: a colored dot beside a title and a short description. `status` is `success`, `warning`, `danger`, or `info`.

```tsx
import {
  StatusLine,
  StatusLineContent,
  StatusLineDescription,
  StatusLineDot,
  StatusLineTitle,
} from "@simple-base/solid";

<StatusLine status="success">
  <StatusLineDot />
  <StatusLineContent>
    <StatusLineTitle>Changes saved</StatusLineTitle>
    <StatusLineDescription>Your preferences are up to date.</StatusLineDescription>
  </StatusLineContent>
</StatusLine>;
```

`StatusLineDot` is decorative and hidden from assistive technology; color only supports the title.

## Dialog

Provides controlled or uncontrolled modal state around a native `<dialog>`. Content wires `aria-labelledby` and `aria-describedby` to the title and description while they are rendered.

```tsx
import {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@simple-base/solid";

<Dialog>
  <DialogTrigger variant="secondary">View details</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Workspace details</DialogTitle>
      <DialogClose aria-label="Close workspace details">×</DialogClose>
    </DialogHeader>
    <DialogDescription>Twelve members can access this workspace.</DialogDescription>
    <DialogFooter>
      <DialogAction value="done">Done</DialogAction>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

`DialogTitle` renders an `h2` unless you pass `level`. `DialogClose` is the icon-sized close control; give it an accessible name when it contains only an icon. `DialogAction` uses the standard button API, closes the modal, and copies its `value` to the native dialog `returnValue`.

Use `open` with `onOpenChange` for controlled state, or `defaultOpen` for uncontrolled initial state. Native dialog attributes, events, and the `HTMLDialogElement` ref belong to `DialogContent`.

## AlertDialog

Provides controlled or uncontrolled modal state around a native `<dialog>` with `role="alertdialog"`. Content wires `aria-labelledby` and `aria-describedby` to the title and description while they are rendered.

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@simple-base/solid";

<AlertDialog>
  <AlertDialogTrigger variant="danger-subtle">Delete project</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete project?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;
```

Use `open` with `onOpenChange` for controlled state, or `defaultOpen` for uncontrolled initial state. Native dialog attributes, events, and the `HTMLDialogElement` ref belong to `AlertDialogContent`. `AlertDialogTitle` renders an `h2` unless you pass `level`, and `AlertDialogIcon` is always hidden from assistive technology.

## Toast

`createToaster` creates the store; render its `Toaster` once near the app root. The `Toaster` children function is the template used for every toast, and each part reads its content from the options passed to `create`.

```tsx
import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastTitle,
  Toaster,
  createToaster,
} from "@simple-base/solid";

const toaster = createToaster({ placement: "bottom-end" });

<Toaster toaster={toaster}>
  {() => (
    <Toast>
      <ToastIcon>✓</ToastIcon>
      <ToastContent>
        <ToastTitle />
        <ToastDescription />
        <ToastAction />
      </ToastContent>
      <ToastClose>×</ToastClose>
    </Toast>
  )}
</Toaster>;

<Button
  onClick={() =>
    toaster.create({
      title: "Project archived",
      description: "Northwind moved to the archive.",
      action: { label: "Undo", onClick: restoreProject },
    })
  }
>
  Archive project
</Button>;
```

`createToaster` accepts `placement` (default `bottom-end`), a default `duration` in milliseconds (default `5000`), and `max`, the most toasts shown at once (default `24`). Later toasts wait in a queue, and a queued toast ignores `dismiss(id)` and updates through a reused `id` until it is shown. The returned toaster has two methods:

- `create({ title, description?, action?, duration?, id?, status? })` shows a toast and returns its id. Reusing an `id` updates that toast; `duration: Infinity` keeps it until dismissed. A toast with an `action` defaults to `Infinity`, so keyboard and screen reader users have time to reach the action.
- `dismiss(id?)` dismisses one toast, or every toast when `id` is omitted.

Toasts pause while the region is hovered or focused. `Alt+T` moves focus to the region, and Escape dismisses the focused toast. `ToastDescription` and `ToastAction` render nothing when the toast has no description or action; the action runs its callback, then dismisses the toast. `ToastClose` is labeled "Dismiss notification" unless you pass `aria-label`. `Toaster` accepts `label` to rename the live region (default "Notifications").

## Forms

Every form control takes `name`, `form`, `required`, and `disabled`, and works uncontrolled inside a `<form>`. `Field`, `NumberField`, and `DatePicker` take `required` and `disabled` on the root. In a `RadioGroup` or `CheckboxGroup`, `name` goes on the group, `required` and `disabled` come from the `Fieldset`, and `form` and `disabled` also go on each item. Set the initial state with the default prop, not the controlled one:

| Component                                                         | Initial state                  |
| ----------------------------------------------------------------- | ------------------------------ |
| `Input`, `TextArea`, `FieldInput`, `FieldTextArea`, `NumberField` | `defaultValue`                 |
| `Checkbox`, `Radio`, `Switch`                                     | `defaultChecked`               |
| `RadioGroup`                                                      | `defaultValue`                 |
| `CheckboxGroup`                                                   | `defaultValue` (`string[]`)    |
| `Select`, `Combobox`                                              | `defaultValue` (`null` = none) |
| `DatePicker`                                                      | `defaultValue` (`null` = none) |

```tsx
<form>
  <Input name="email" type="email" defaultValue="you@example.com" />
  <Checkbox name="newsletter" defaultChecked />
  <Select name="timezone" options={timezones} defaultValue="utc">
    {/* parts */}
  </Select>
</form>
```

`form.reset()` limitations:

- On `Input`, `TextArea`, `Checkbox`, `Radio`, and `Switch`, Solid sets `value` and `checked` as DOM properties, so a reset clears a starting value given that way. Use `defaultValue` or `defaultChecked`.
- `RadioGroup` and `CheckboxGroup` restore `defaultValue` on reset without calling `onValueChange`. A controlled `value` is cleared like a `checked` prop, so set your state back in the form's `onReset` handler.
- `Select`, `Combobox`, `NumberField`, and `DatePicker` restore their initial value even when a reset listener calls `preventDefault()` after theirs has run.

Errors are not announced as they appear, since an announcement on every keystroke is noisy; each control reads its error through `aria-describedby` when it is focused. On submit, move focus to the first invalid control so its error is read:

```tsx
const [submitted, setSubmitted] = createSignal(false);

<form
  onSubmit={(event) => {
    event.preventDefault();
    // Each field's `invalid` reads `submitted()`, so the errors render before the query runs.
    setSubmitted(true);
    event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }}
>
  {/* fields */}
</form>;
```

## Localization

Every string the components read to assistive technology has an English default you can replace:

- **Zag-based roots** (`NumberField`, `DatePicker`) take Zag's own `translations`, with Zag's types and defaults.
- **Other roots** take `labels`, a partial object whose defaults live in `@simple-base/contracts`: `Pagination` (`paginationLabels`) and `Fieldset` (`fieldsetLabels`).
- `Toaster` takes `label`, the accessible name of its live region, like an `aria-label`.

## Server rendering

Every component renders on the server and hydrates without a mismatch, for example in SolidStart.

- Server rendering goes through the `solid` export condition, which points at `dist/index.jsx`: JSX left untransformed, so your app's `vite-plugin-solid` compiles it for the server and for the client. Vite with `vite-plugin-solid` and SolidStart pick that condition on their own. The `default` condition is compiled for the browser only and can't render on a server.
- `aria-describedby` on `Field`, `Fieldset`, `NumberField`, `DatePicker`, `Select`, and `Combobox`, and `aria-labelledby` and `aria-describedby` on dialog content, list their parts once the parts have mounted. The server's HTML leaves them out, and hydration adds them. The first client render matches the server, so this causes no mismatch.
- The server can't know the user's time zone. Without `timeZone`, `DatePicker` uses UTC on the server and while hydrating, then switches to the user's zone once mounted. Where the user's date differs from UTC's, today's outline, and the day the calendar focuses when there is no value, move by one day after hydration. To render the user's day from the start, pass `timeZone` from the request, for example from a cookie the browser sets to `Intl.DateTimeFormat().resolvedOptions().timeZone`.

## Props conventions

- `class` is reactive and merged with the component's own classes; it never replaces them.
- Native attributes pass through, except the ones the component owns (such as `id`, `role`, and `aria-*` that describe the widget's own structure).
- Triggers that stand on their own (`MenuTrigger`, `TooltipTrigger`, `DialogTrigger`, `AlertDialogTrigger`) render a `Button` and take its `variant` and `size`. Buttons that sit inside a control or a message (`SelectTrigger`, `ComboboxTrigger`, `DatePickerTrigger`, `ToastClose`, `AlertClose`) render a plain `<button>` styled by that component.
- Event handlers compose: your handler runs first, then the component's internal handling. Call `event.preventDefault()` in your handler to skip the built-in behavior, for example to keep a dialog closed when its trigger is clicked. Parts built on Zag (`Select`, `Combobox`, `NumberField`, `DatePicker`, `Menu`, `Tooltip`, `Tabs`, and `Toast`) follow Zag's handlers, which honor `preventDefault()` for many events but not all, and replace the internal handler when you pass Solid's `[handler, data]` array form. Pass handlers as functions there.
- Pass `style` as an object on parts that set their own styles, such as popup positioners. A string `style` is parsed into declarations, and `!important` does not survive.
- Shared option names and defaults come from [@simple-base/contracts](https://www.npmjs.com/package/@simple-base/contracts), and the unmodified option types are re-exported from this package.

## Tailwind CSS

The components emit only class names and `data-*` attributes, so Tailwind utilities can override them — provided the cascade layers are ordered before the imports:

```css
@layer theme, base, sb, components, utilities;

@import "tailwindcss";
@import "@simple-base/css";
```

Resets stay before the library's defaults and utilities stay after them, so `p-0` on a `Card` needs no `!important`. See [Cascade layer](https://www.npmjs.com/package/@simple-base/css) in the CSS package for the full order, the other override options, and the 0.2.0 migration notes.

## Themes

Themes come from the token layer. Set `data-theme` on the root or any nested region:

```html
<html data-theme="nord"></html>
```

## Links

- [Repository](https://github.com/redasalmi/simple-base)
- [Styles and selector API](https://www.npmjs.com/package/@simple-base/css)
- [Design tokens](https://www.npmjs.com/package/@simple-base/tokens)

## License

[MIT](https://github.com/redasalmi/simple-base/blob/main/LICENSE)
