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

| Component  | Renders                | Options                                                    |
| ---------- | ---------------------- | ---------------------------------------------------------- |
| `Button`   | `button`               | `variant`, `size`                                          |
| `Badge`    | `span`                 | `variant`, `size`                                          |
| `Card`     | `div`                  | `variant`                                                  |
| `Input`    | `input`                | Native input props; `type` excludes `radio` and `checkbox` |
| `TextArea` | `textarea`             | Native props                                               |
| `Checkbox` | `input[type=checkbox]` | Native props                                               |
| `Radio`    | `input[type=radio]`    | Native props                                               |
| `Switch`   | `input[role=switch]`   | Native props; requires `aria-label` or `aria-labelledby`   |

**Composable components** use named exports so bundlers can remove unused parts. Each part is prefixed with its root name:

| Root          | Named parts                                                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AlertDialog` | `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogIcon`, `AlertDialogHeader`, `AlertDialogKicker`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogCancel`, `AlertDialogAction` |
| `Dialog`      | `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogKicker`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`, `DialogAction`                                                                  |
| `Combobox`    | `ComboboxLabel`, `ComboboxControl`, `ComboboxInput`, `ComboboxTrigger`, `ComboboxPortal`, `ComboboxPositioner`, `ComboboxContent`, `ComboboxList`, `ComboboxEmpty`, `ComboboxItem`                                   |
| `Select`      | `SelectLabel`, `SelectControl`, `SelectTrigger`, `SelectValueText`, `SelectIndicator`, `SelectPortal`, `SelectPositioner`, `SelectContent`, `SelectList`, `SelectEmpty`, `SelectItem`                                |
| `Table`       | `TableWrap`, `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableColumnHeader`, `TableRowHeader`, `TableCell`                                                                               |
| `Toaster`     | `Toast`, `ToastIcon`, `ToastContent`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, plus `createToaster`                                                                                            |

The CSS package ships more components than this adapter currently covers. Breadcrumb, disclosure, empty state, field, keyboard shortcut, menu, pagination, progress, range, segmented control, status lines and alerts, tabs, and typography are available as styles with selector-level APIs.

## Select

`id`, `label`, `options`, and `onValueChange` are required. `onValueChange` receives the selected option's value, not its label.

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

Additional root props: `value` makes selection controlled (`""` means cleared), `name` adds a hidden native select so the value submits with the form, `disabled`, `invalid`, and `required` drive state styling and labeling, `placement` picks the popup side, and `onOpenChange` reports visibility.

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

`TableWrap` provides the horizontal scroll container the table styles expect.

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

`createToaster` accepts `placement` (default `bottom-end`) and a default `duration` in milliseconds (default `5000`). The returned toaster has two methods:

- `create({ title, description?, action?, duration?, id?, status? })` shows a toast and returns its id. Reusing an `id` updates that toast; `duration: Infinity` keeps it until dismissed.
- `dismiss(id?)` dismisses one toast, or every toast when `id` is omitted.

Toasts pause while the region is hovered or focused. `Alt+T` moves focus to the region, and Escape dismisses the focused toast. `ToastDescription` and `ToastAction` render nothing when the toast has no description or action; the action runs its callback, then dismisses the toast. `ToastClose` is labeled "Dismiss notification" unless you pass `aria-label`. `Toaster` accepts `label` to rename the live region (default "Notifications").

## Props conventions

- `class` is reactive and merged with the component's own classes; it never replaces them.
- Native attributes pass through, except the ones the component owns (such as `id`, `role`, and `aria-*` that describe the widget's own structure).
- Event handlers compose: your `onClick` runs alongside the component's internal handling, not instead of it.
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
