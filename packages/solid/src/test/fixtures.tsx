import type { JSX } from "solid-js";

import {
  Alert,
  AlertActions,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogKicker,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertMark,
  AlertTitle,
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxDescription,
  ComboboxEmpty,
  ComboboxError,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
  createToaster,
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
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogKicker,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMark,
  EmptyStateTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldsetDescription,
  FieldsetError,
  FieldsetLegend,
  FieldTextArea,
  Input,
  type ListboxOption,
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemShortcut,
  MenuPortal,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  NumberField,
  NumberFieldAffix,
  NumberFieldControl,
  NumberFieldDecrement,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
  Pagination,
  PaginationNext,
  PaginationPages,
  PaginationPrevious,
  parseDateInput,
  Radio,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectControl,
  SelectDescription,
  SelectEmpty,
  SelectError,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
  StatusLine,
  StatusLineContent,
  StatusLineDescription,
  StatusLineDot,
  StatusLineTitle,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableFooter,
  TableHeader,
  TableRow,
  TableRowHeader,
  TableSortButton,
  TableWrap,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TextArea,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  ToastIcon,
  ToastTitle,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "../index";

// Each component's default rendering, shared by the server rendering, hydration, and axe tests.

export const currencies = [
  { label: "Euro", value: "eur" },
  { label: "US dollar", value: "usd" },
  { label: "Japanese yen", value: "jpy", disabled: true },
] as const satisfies readonly ListboxOption[];

export const toaster = createToaster();

export const fixtures = {
  Alert: () => (
    <Alert status="warning">
      <AlertMark>!</AlertMark>
      <AlertContent>
        <AlertTitle>Payment overdue</AlertTitle>
        <AlertDescription>Invoice 1042 is ten days late.</AlertDescription>
        <AlertActions>
          <Button size="small">Send reminder</Button>
        </AlertActions>
      </AlertContent>
      <AlertClose aria-label="Dismiss">×</AlertClose>
    </Alert>
  ),
  AlertDialog: () => (
    <AlertDialog>
      <AlertDialogTrigger variant="danger-subtle">Delete project</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogIcon>!</AlertDialogIcon>
        <AlertDialogHeader>
          <AlertDialogKicker>Northwind</AlertDialogKicker>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction value="delete">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  Badge: () => <Badge variant="success">Paid</Badge>,
  Button: () => <Button>Save</Button>,
  Card: () => (
    <Card>
      <p>Northwind</p>
    </Card>
  ),
  Checkbox: () => (
    <label>
      <Checkbox name="terms" defaultChecked /> Accept terms
    </label>
  ),
  CheckboxGroup: () => (
    <Fieldset>
      <FieldsetLegend>Notifications</FieldsetLegend>
      <CheckboxGroup name="notify" defaultValue={["email"]}>
        <CheckboxGroupItem value="email">Email</CheckboxGroupItem>
        <CheckboxGroupItem value="sms">SMS</CheckboxGroupItem>
      </CheckboxGroup>
    </Fieldset>
  ),
  Combobox: () => (
    <Combobox
      id="currency"
      name="currency"
      placeholder="Search currencies"
      options={currencies}
      defaultValue="eur"
    >
      <ComboboxLabel>Currency</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger aria-label="Show currencies">▾</ComboboxTrigger>
      </ComboboxControl>
      <ComboboxDescription>Used on every invoice.</ComboboxDescription>
      <ComboboxError>Pick a currency.</ComboboxError>
      <ComboboxPortal>
        <ComboboxPositioner>
          <ComboboxContent>
            <ComboboxList>{(option) => <ComboboxItem option={option} />}</ComboboxList>
          </ComboboxContent>
          <ComboboxEmpty>No currencies found.</ComboboxEmpty>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  ),
  DatePicker: () => (
    <DatePicker id="due" name="due" defaultValue={parseDateInput("2026-10-12")}>
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
  ),
  // The calendar renders inline, so the server renders the days and marks today.
  DatePickerCalendar: () => (
    <DatePicker id="due">
      <DatePickerLabel>Due date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput />
      </DatePickerControl>
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  ),
  DatePickerCalendarTimeZone: () => (
    <DatePicker id="due" timeZone="Europe/Paris">
      <DatePickerLabel>Due date</DatePickerLabel>
      <DatePickerControl>
        <DatePickerInput />
      </DatePickerControl>
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  ),
  Dialog: () => (
    <Dialog>
      <DialogTrigger variant="secondary">View details</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogKicker>Workspace</DialogKicker>
          <DialogTitle>Workspace details</DialogTitle>
          <DialogClose aria-label="Close workspace details">×</DialogClose>
        </DialogHeader>
        <DialogDescription>Twelve members can access this workspace.</DialogDescription>
        <DialogFooter>
          <DialogAction value="done">Done</DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  EmptyState: () => (
    <EmptyState>
      <EmptyStateMark>∅</EmptyStateMark>
      <EmptyStateTitle>No invoices yet</EmptyStateTitle>
      <EmptyStateDescription>Create one to get started.</EmptyStateDescription>
      <EmptyStateActions>
        <Button>New invoice</Button>
      </EmptyStateActions>
    </EmptyState>
  ),
  Field: () => (
    <Field required>
      <FieldLabel>Email</FieldLabel>
      <FieldInput name="email" type="email" />
      <FieldDescription>We send receipts here.</FieldDescription>
      <FieldError>Enter an email address.</FieldError>
    </Field>
  ),
  FieldTextArea: () => (
    <Field>
      <FieldLabel>Notes</FieldLabel>
      <FieldTextArea name="notes" />
    </Field>
  ),
  Fieldset: () => (
    <Fieldset required>
      <FieldsetLegend>Billing</FieldsetLegend>
      <FieldsetDescription>Shown on invoices.</FieldsetDescription>
      <FieldsetError>Choose a plan.</FieldsetError>
      <RadioGroup name="plan" defaultValue="monthly">
        <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
        <RadioGroupItem value="yearly">Yearly</RadioGroupItem>
      </RadioGroup>
    </Fieldset>
  ),
  Input: () => <Input aria-label="Search" type="search" name="q" defaultValue="Northwind" />,
  Menu: () => (
    <Menu>
      <MenuTrigger variant="secondary">Actions</MenuTrigger>
      <MenuPortal>
        <MenuPositioner>
          <MenuContent>
            <MenuGroup>
              <MenuGroupLabel>Invoice</MenuGroupLabel>
              <MenuItem value="duplicate">
                Duplicate <MenuItemShortcut>⌘D</MenuItemShortcut>
              </MenuItem>
            </MenuGroup>
            <MenuSeparator />
            <MenuItem value="delete" variant="danger">
              Delete
            </MenuItem>
          </MenuContent>
        </MenuPositioner>
      </MenuPortal>
    </Menu>
  ),
  NumberField: () => (
    <NumberField id="price" name="price" defaultValue="120" min={0}>
      <NumberFieldLabel>Unit price</NumberFieldLabel>
      <NumberFieldControl>
        <NumberFieldInput />
        <NumberFieldAffix>EUR</NumberFieldAffix>
        <NumberFieldDecrement />
        <NumberFieldIncrement />
      </NumberFieldControl>
      <NumberFieldDescription>Excluding VAT.</NumberFieldDescription>
      <NumberFieldError>Enter a price of 0 or more.</NumberFieldError>
    </NumberField>
  ),
  Pagination: () => (
    <Pagination count={20} defaultPage={10}>
      <PaginationPrevious>‹</PaginationPrevious>
      <PaginationPages />
      <PaginationNext>›</PaginationNext>
    </Pagination>
  ),
  Radio: () => (
    <label>
      <Radio name="size" value="small" defaultChecked /> Small
    </label>
  ),
  RadioGroup: () => (
    <Fieldset>
      <FieldsetLegend>Plan</FieldsetLegend>
      <RadioGroup name="plan" defaultValue="monthly">
        <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
        <RadioGroupItem value="yearly">Yearly</RadioGroupItem>
      </RadioGroup>
    </Fieldset>
  ),
  Select: () => (
    <Select
      id="currency"
      name="currency"
      placeholder="Select a currency"
      options={currencies}
      defaultValue="eur"
    >
      <SelectLabel>Currency</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText />
          <SelectIndicator>▾</SelectIndicator>
        </SelectTrigger>
      </SelectControl>
      <SelectDescription>Used on every invoice.</SelectDescription>
      <SelectError>Pick a currency.</SelectError>
      <SelectPortal>
        <SelectPositioner>
          <SelectContent>
            <SelectList>{(option) => <SelectItem option={option} />}</SelectList>
          </SelectContent>
          <SelectEmpty>No currencies.</SelectEmpty>
        </SelectPositioner>
      </SelectPortal>
    </Select>
  ),
  StatusLine: () => (
    <StatusLine status="success">
      <StatusLineDot />
      <StatusLineContent>
        <StatusLineTitle>Synced</StatusLineTitle>
        <StatusLineDescription>Two minutes ago.</StatusLineDescription>
      </StatusLineContent>
    </StatusLine>
  ),
  Switch: () => (
    <label>
      <Switch name="reminders" /> Send reminders
    </label>
  ),
  Table: () => (
    <TableWrap>
      <Table>
        <TableCaption>Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader aria-sort="ascending">
              <TableSortButton>Number</TableSortButton>
            </TableColumnHeader>
            <TableColumnHeader>Amount</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowHeader>1042</TableRowHeader>
            <TableCell variant="number">120.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowHeader>Total</TableRowHeader>
            <TableCell variant="number">120.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableWrap>
  ),
  Tabs: () => (
    <Tabs defaultValue="details">
      <TabsList aria-label="Invoice">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Invoice details</TabsContent>
      <TabsContent value="history">Invoice history</TabsContent>
    </Tabs>
  ),
  TextArea: () => <TextArea aria-label="Notes" name="notes" defaultValue="Net 30" />,
  Toaster: () => (
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
    </Toaster>
  ),
  Tooltip: () => (
    <Tooltip>
      <TooltipTrigger variant="secondary">Status</TooltipTrigger>
      <TooltipPortal>
        <TooltipPositioner>
          <TooltipContent>
            Paid on October 9
            <TooltipArrow />
          </TooltipContent>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  ),
} satisfies Record<string, () => JSX.Element>;

export type FixtureName = keyof typeof fixtures;
