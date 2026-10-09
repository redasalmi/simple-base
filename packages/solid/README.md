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

`solid-js` is a peer dependency and is not bundled.

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
| `Switch`   | `input[role=switch]`   | Native props; requires `aria-label` or `aria-labelledby`                             |

**Composable components** use named exports so bundlers can remove unused parts. Each part is prefixed with its root name:

| Root            | Named parts                                                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AlertDialog`   | `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogIcon`, `AlertDialogHeader`, `AlertDialogKicker`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogCancel`, `AlertDialogAction`                |
| `Dialog`        | `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogKicker`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`, `DialogAction`                                                                                 |
| `Field`         | `FieldLabel`, `FieldInput`, `FieldTextArea`, `FieldDescription`, `FieldError`                                                                                                                                                       |
| `Fieldset`      | `FieldsetLegend`, `FieldsetDescription`, `FieldsetError`                                                                                                                                                                            |
| `RadioGroup`    | `RadioGroupItem` (inside a `Fieldset`)                                                                                                                                                                                              |
| `CheckboxGroup` | `CheckboxGroupItem` (inside a `Fieldset`)                                                                                                                                                                                           |
| `NumberField`   | `NumberFieldLabel`, `NumberFieldControl`, `NumberFieldInput`, `NumberFieldDecrement`, `NumberFieldIncrement`, `NumberFieldAffix`, `NumberFieldDescription`, `NumberFieldError`                                                      |
| `Combobox`      | `ComboboxLabel`, `ComboboxControl`, `ComboboxInput`, `ComboboxTrigger`, `ComboboxPortal`, `ComboboxPositioner`, `ComboboxContent`, `ComboboxList`, `ComboboxEmpty`, `ComboboxItem`                                                  |
| `DatePicker`    | `DatePickerLabel`, `DatePickerControl`, `DatePickerInput`, `DatePickerTrigger`, `DatePickerPortal`, `DatePickerPositioner`, `DatePickerContent`, `DatePickerCalendar`, `DatePickerDescription`, `DatePickerError`, plus `parseDate` |
| `Select`        | `SelectLabel`, `SelectControl`, `SelectTrigger`, `SelectValueText`, `SelectIndicator`, `SelectPortal`, `SelectPositioner`, `SelectContent`, `SelectList`, `SelectEmpty`, `SelectItem`                                               |
| `EmptyState`    | `EmptyStateMark`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateActions`                                                                                                                                                   |
| `Alert`         | `AlertMark`, `AlertContent`, `AlertTitle`, `AlertDescription`, `AlertActions`, `AlertClose`                                                                                                                                         |
| `StatusLine`    | `StatusLineDot`, `StatusLineContent`, `StatusLineTitle`, `StatusLineDescription`                                                                                                                                                    |
| `Table`         | `TableWrap`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableColumnHeader`, `TableRowHeader`, `TableCell`                                                                                              |
| `Toaster`       | `Toast`, `ToastIcon`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, plus `createToaster`                                                                                                           |

The CSS package ships more components than this adapter currently covers. Until a Solid component exists, use them through their selector-level APIs:

- **Planned for 1.0:** menu, tooltip, tabs, and pagination.
- **Planned after 1.0:** breadcrumb, disclosure, keyboard shortcut, progress, range, and segmented control.

Typography stays CSS-only: the `.sb-display`, `.sb-heading-*`, and `.sb-text-*` classes are the API.

The library styles native elements and states and leaves app-specific affordances, such as loading states and spinners, to your application.

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

Put `FieldsetLegend` first; `required` adds its marker. The fieldset lists `FieldsetDescription`, and `FieldsetError` while it is rendered, in its `aria-describedby`. `FieldsetError` renders only while `invalid` is set. Omit `id` to generate one.

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

- `RadioGroup` takes a string `value` (`""` selects nothing), `defaultValue`, and `onValueChange`. `name` is shared by every radio and generated when omitted. A required fieldset makes the radios natively required.
- `CheckboxGroup` takes a `string[]` `value`, `defaultValue`, and `onValueChange`, which receives the checked values in document order. The checkboxes are not natively required, since any one of them may satisfy the group: validate in your app, or pass `required` to a single item that must be checked.
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
- `name` submits the value with the form; `form` associates the input with a form elsewhere on the page.

`NumberFieldDecrement` and `NumberFieldIncrement` render `−` and `+` unless you pass children, and are labeled "decrease value" and "increment value" unless you pass `aria-label`. `NumberFieldAffix` renders decorative text, such as a unit, inside the control and is hidden from assistive technology, so state the unit in the label or description too. `NumberFieldError` renders only while the field is invalid.

## Select

`label` and `options` are required. `onValueChange` receives the selected option's value, not its label. Omit `id` to generate one.

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
  const [timezone, setTimezone] = createSignal("");

  return (
    <Select
      id="timezone"
      label="Timezone"
      placeholder="Select a timezone"
      options={timezones}
      onValueChange={setTimezone}
    >
      <SelectLabel />
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

Additional root props: `value` makes selection controlled (`""` means cleared), `defaultValue` sets the initial selection of an uncontrolled select, `name` adds a hidden native select so the value submits with the form, `disabled`, `invalid`, and `required` drive state styling and labeling, `placement` picks the popup side, and `onOpenChange` reports visibility.

With `name` and `defaultValue`, a `Select` works uncontrolled inside a `<form>`: no `onValueChange` is needed, and `form.reset()` restores the initial selection.

`SelectEmpty` renders beside `SelectList` and appears only while the popup is open with no options. `SelectPortal` accepts `mount` — pass a dialog element's node to keep the popup interactive inside a native modal.

## Combobox

Same root props as `Select`, with a text input that filters options by label.

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
  label="Country"
  placeholder="Search countries"
  options={countries}
  onValueChange={setCountry}
>
  <ComboboxLabel />
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
        <ComboboxEmpty>No countries found. Try another search.</ComboboxEmpty>
      </ComboboxContent>
    </ComboboxPositioner>
  </ComboboxPortal>
</Combobox>;
```

## DatePicker

A text input and a popup calendar for one date. Values are `DateValue` objects from [`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/); create them with `parseDate`, which this package re-exports. `id`, `required`, `disabled`, `readOnly`, and `invalid` are set on the root only, as with `Field`.

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
  parseDate,
  type DateValue,
} from "@simple-base/solid";

export function DueDate() {
  const [due, setDue] = createSignal<DateValue[]>([parseDate("2026-10-12")]);

  return (
    <DatePicker
      value={due()}
      onValueChange={(value) => setDue(value)}
      min={parseDate("2026-10-05")}
      max={parseDate("2026-11-20")}
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

- `value` and `defaultValue` take a `DateValue[]`; an empty array means no date. `onValueChange` receives the dates and the text shown in the input.
- `min` and `max` disable the days outside the range. A typed date outside it is clamped to the nearest bound when the input loses focus; the picker never sets `invalid` on its own.
- `locale` (default `en-US`) sets the input format, the first day of the week, and the calendar's labels. `timeZone` decides which day is today and defaults to the user's time zone.
- `name` adds a hidden input that submits the date as `YYYY-MM-DD`, since the visible input holds locale-formatted text. `form` associates both inputs with a form elsewhere on the page.
- `placement` picks the popup side (default `bottom-start`), `fixedWeeks` always shows six weeks so the popup keeps its height, and `onOpenChange` reports visibility.

`DatePickerCalendar` renders the navigation and the day, month, and year views; select the month heading to switch views. `DatePickerTrigger` renders a calendar icon unless you pass children. `DatePickerPortal` accepts `mount`, like `SelectPortal`.

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

Provides controlled or uncontrolled modal state around a native `<dialog>`. Content wires `aria-labelledby` and `aria-describedby` to the title and description automatically.

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

`DialogClose` is the icon-sized close control; give it an accessible name when it contains only an icon. `DialogAction` uses the standard button API, closes the modal, and copies its `value` to the native dialog `returnValue`.

Use `open` with `onOpenChange` for controlled state, or `defaultOpen` for uncontrolled initial state. Native dialog attributes, events, and the `HTMLDialogElement` ref belong to `DialogContent`.

## AlertDialog

Provides controlled or uncontrolled modal state around a native `<dialog>` with `role="alertdialog"`. Content wires `aria-labelledby` and `aria-describedby` to the title and description automatically.

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

Use `open` with `onOpenChange` for controlled state, or `defaultOpen` for uncontrolled initial state. Native dialog attributes, events, and the `HTMLDialogElement` ref belong to `AlertDialogContent`.

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

- `create({ title, description?, action?, duration?, id?, status? })` shows a toast and returns its id. Reusing an `id` updates that toast; `duration: Infinity` keeps it until dismissed.
- `dismiss(id?)` dismisses one toast, or every toast when `id` is omitted.

Toasts pause while the region is hovered or focused. `Alt+T` moves focus to the region, and Escape dismisses the focused toast. `ToastDescription` and `ToastAction` render nothing when the toast has no description or action; the action runs its callback, then dismisses the toast. `ToastClose` is labeled "Dismiss notification" unless you pass `aria-label`. `Toaster` accepts `label` to rename the live region (default "Notifications").

## Forms

Every form control takes `name` and works uncontrolled inside a `<form>`. Set the initial state with the default prop, not the controlled one:

| Component                                                         | Initial state                |
| ----------------------------------------------------------------- | ---------------------------- |
| `Input`, `TextArea`, `FieldInput`, `FieldTextArea`, `NumberField` | `defaultValue`               |
| `Checkbox`, `Radio`, `Switch`                                     | `defaultChecked`             |
| `RadioGroup`                                                      | `defaultValue`               |
| `CheckboxGroup`                                                   | `defaultValue` (`string[]`)  |
| `Select`, `Combobox`                                              | `defaultValue` (`""` = none) |
| `DatePicker`                                                      | `defaultValue` (`[]` = none) |

```tsx
<form>
  <Input name="email" type="email" defaultValue="you@example.com" />
  <Checkbox name="newsletter" defaultChecked />
  <Select label="Timezone" name="timezone" options={timezones} defaultValue="utc">
    {/* parts */}
  </Select>
</form>
```

`form.reset()` limitations:

- On `Input`, `TextArea`, `Checkbox`, `Radio`, and `Switch`, Solid sets `value` and `checked` as DOM properties, so a reset clears a starting value given that way. Use `defaultValue` or `defaultChecked`.
- `RadioGroup` and `CheckboxGroup` restore `defaultValue` on reset without calling `onValueChange`. A controlled `value` is cleared like a `checked` prop, so set your state back in the form's `onReset` handler.
- `Combobox` ignores `form.reset()` and keeps its current selection. To reset it, use a controlled `value` and set it back in the form's `onReset` handler.
- `Select`, `NumberField`, and `DatePicker` reset their value even when a reset listener calls `preventDefault()` after theirs has run.

## Props conventions

- `class` is reactive and merged with the component's own classes; it never replaces them.
- Native attributes pass through, except the ones the component owns (such as `id`, `role`, and `aria-*` that describe the widget's own structure).
- Event handlers compose: your `onClick` runs alongside the component's internal handling, not instead of it. Pass handlers as functions; Solid's `[handler, data]` array form replaces the internal handler instead of composing with it.
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
