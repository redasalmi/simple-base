import { datePickerDefaults, type DatePickerOptions } from "@simple-base/contracts";
import * as datepicker from "@zag-js/date-picker";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import {
  type Accessor,
  createMemo,
  createUniqueId,
  Index,
  type JSX,
  Show,
  splitProps,
  untrack,
} from "solid-js";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import { trackFormReset } from "../internal/form";
import {
  createMessages,
  MessageDescription,
  MessageError,
  type MessageProps,
  type Messages,
} from "../internal/messages";
import { createPositioning, PopupPortal, type PopupPortalProps } from "../internal/popup";
import { dataAttr, mergeRefs, type WithoutOwnedProps } from "../internal/props";
import { fromZagValue, toZagValue } from "../internal/zagValue";

type DatePickerContextType = Messages & {
  required: Accessor<boolean>;
  form: Accessor<string | undefined>;
  setInput: (input: HTMLInputElement) => void;
  api: Accessor<datepicker.Api>;
};

const [DatePickerProvider, useDatePicker] =
  createRequiredContext<DatePickerContextType>("DatePicker");

export type DatePickerRootProps = DatePickerOptions & {
  /** Zag's labels for the trigger, the calendar navigation, and the day cells, for example to translate them. */
  translations?: datepicker.IntlTranslations;
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof DatePickerOptions | "translations" | "children">;

export function DatePicker(props: DatePickerRootProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "id",
    "name",
    "form",
    "value",
    "defaultValue",
    "min",
    "max",
    "locale",
    "timeZone",
    "fixedWeeks",
    "required",
    "disabled",
    "readOnly",
    "invalid",
    "placement",
    "translations",
    "onValueChange",
    "onOpenChange",
  ]);
  const fallbackId = createUniqueId();

  const id = () => local.id ?? fallbackId;
  // Zag defaults to UTC, which marks the wrong day as today for users far from it.
  const userTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Zag centers the calendar under the field; align it with the field's start like Select.
  const positioning = createPositioning(() => local.placement ?? datePickerDefaults.placement);

  const service = useMachine(datepicker.machine, {
    get id() {
      return id();
    },
    get ids() {
      return {
        input: (index: number) => (index === 0 ? id() : `${id()}-${index}`),
      };
    },
    get value() {
      return toZagValue(local.value);
    },
    get defaultValue() {
      return toZagValue(local.defaultValue);
    },
    get min() {
      return local.min;
    },
    get max() {
      return local.max;
    },
    get locale() {
      return local.locale;
    },
    get timeZone() {
      return local.timeZone ?? userTimeZone;
    },
    get fixedWeeks() {
      return local.fixedWeeks;
    },
    get positioning() {
      return positioning();
    },
    get disabled() {
      return local.disabled;
    },
    get readOnly() {
      return local.readOnly;
    },
    get invalid() {
      return local.invalid;
    },
    get required() {
      return local.required;
    },
    get translations() {
      return local.translations;
    },
    onValueChange({ value, valueAsString }) {
      local.onValueChange?.(fromZagValue(value), valueAsString[0] ?? "");
    },
    onOpenChange({ open }) {
      local.onOpenChange?.(open);
    },
  });
  const api = createMemo(() => datepicker.connect(service, normalizeProps));

  let input: HTMLInputElement | undefined;
  const initialValue = untrack(() => api().value);
  // Zag's date picker, unlike its number input, doesn't restore its initial value on a form reset
  // (Z7, U4 in audit/zag-issues.md).
  trackFormReset(
    () => input,
    () => api().setValue(initialValue),
  );

  const context = {
    ...createMessages(id, () => api().invalid),
    required: () => local.required ?? false,
    form: () => local.form,
    setInput: (element) => (input = element),
    api,
  } satisfies DatePickerContextType;

  return (
    <DatePickerProvider value={context}>
      <div {...mergeProps(api().getRootProps(), rest)} class={cn("sb-date-picker", local.class)}>
        {/* The visible input holds locale-formatted text, so the form submits the ISO date instead
            (Z8, U3 in audit/zag-issues.md). */}
        <Show when={local.name}>
          <input
            type="hidden"
            name={local.name}
            form={local.form}
            disabled={local.disabled}
            value={api().value[0]?.toString() ?? ""}
          />
        </Show>
        {local.children}
      </div>
    </DatePickerProvider>
  );
}

export type DatePickerLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id" | "for">;

export function DatePickerLabel(props: DatePickerLabelProps) {
  const { api, required } = useDatePicker();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <label
      {...mergeProps(api().getLabelProps(), rest)}
      // Zag's date picker label, unlike its number input label, doesn't mark required
      // (Z9, U7 in audit/zag-issues.md).
      data-required={dataAttr(required())}
      class={cn("sb-field-label", local.class)}
    >
      {local.children}
    </label>
  );
}

export type DatePickerControlProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id">;

export function DatePickerControl(props: DatePickerControlProps) {
  const { api } = useDatePicker();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getControlProps(), rest)}
      class={cn("sb-date-picker-control", local.class)}
    >
      {local.children}
    </div>
  );
}

type DatePickerInputOwnedProps =
  | "id"
  | "name"
  | "form"
  | "value"
  | "disabled"
  | "readOnly"
  | "readonly"
  | "required"
  | "aria-invalid"
  | "aria-describedby";

export type DatePickerInputProps = WithoutOwnedProps<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  DatePickerInputOwnedProps
>;

export function DatePickerInput(props: DatePickerInputProps) {
  const { api, describedBy, form, setInput } = useDatePicker();
  const [local, rest] = splitProps(props, ["class", "ref"]);

  const inputProps = () => api().getInputProps();

  return (
    <input
      {...mergeProps(inputProps(), rest)}
      // Zag's Solid adapter renders the text as a live `value`, which a form reset doesn't read, so
      // keep it as the default value too. A reset then shows Zag's text instead of an empty input,
      // even when the value didn't change (Z1, U11 in audit/zag-issues.md).
      prop:defaultValue={String(inputProps().value ?? "")}
      ref={mergeRefs(setInput, local.ref)}
      class={cn("sb-date-picker-input", local.class)}
      form={form()}
      aria-describedby={describedBy()}
    />
  );
}

export type DatePickerTriggerProps = WithoutOwnedProps<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "type" | "disabled" | "aria-controls" | "aria-expanded" | "aria-haspopup"
>;

export function DatePickerTrigger(props: DatePickerTriggerProps) {
  const { api } = useDatePicker();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <button
      {...mergeProps(api().getTriggerProps(), rest)}
      class={cn("sb-date-picker-trigger", local.class)}
    >
      {local.children ?? <CalendarIcon />}
    </button>
  );
}

export type DatePickerPortalProps = PopupPortalProps;

export const DatePickerPortal = PopupPortal;

export type DatePickerPositionerProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "style">;

export function DatePickerPositioner(props: DatePickerPositionerProps) {
  const { api } = useDatePicker();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getPositionerProps(), rest)}
      class={cn("sb-date-picker-positioner", local.class)}
    >
      {local.children}
    </div>
  );
}

export type DatePickerContentProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "id" | "hidden" | "role" | "tabIndex"
>;

export function DatePickerContent(props: DatePickerContentProps) {
  const { api } = useDatePicker();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getContentProps(), rest)}
      class={cn("sb-date-picker-content", local.class)}
    >
      {local.children}
    </div>
  );
}

export type DatePickerCalendarProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "children">;

const GRID_COLUMNS = 4;

export function DatePickerCalendar(props: DatePickerCalendarProps) {
  const { api } = useDatePicker();

  // Zag's label, such as "Switch to month view", leaves out the heading the button shows, so its
  // name wouldn't contain its visible text (WCAG 2.5.3, U9 in audit/zag-issues.md).
  const viewTriggerProps = (view: datepicker.DateView, text: string) => {
    const zagProps = api().getViewTriggerProps({ view });
    return { ...zagProps, "aria-label": `${text}, ${zagProps["aria-label"]}` };
  };

  return (
    <div {...props}>
      <div {...api().getViewProps({ view: "day" })}>
        <div {...api().getViewControlProps({ view: "day" })} class="sb-date-picker-view-control">
          <button
            {...api().getPrevTriggerProps({ view: "day" })}
            class="sb-date-picker-nav-trigger"
          >
            <ChevronIcon direction="prev" />
          </button>
          <button
            {...viewTriggerProps("day", api().visibleRangeText.start)}
            class="sb-date-picker-view-trigger"
          >
            {api().visibleRangeText.start}
          </button>
          <button
            {...api().getNextTriggerProps({ view: "day" })}
            class="sb-date-picker-nav-trigger"
          >
            <ChevronIcon direction="next" />
          </button>
        </div>

        <table {...api().getTableProps({ view: "day" })} class="sb-date-picker-table">
          <thead {...api().getTableHeadProps({ view: "day" })}>
            <tr {...api().getTableRowProps({ view: "day" })}>
              <Index each={api().weekDays}>
                {(day) => (
                  <th
                    {...api().getTableHeaderProps({ view: "day" })}
                    scope="col"
                    aria-label={day().long}
                    class="sb-date-picker-table-header"
                  >
                    {day().narrow}
                  </th>
                )}
              </Index>
            </tr>
          </thead>
          <tbody {...api().getTableBodyProps({ view: "day" })}>
            <Index each={api().weeks}>
              {(week) => (
                <tr {...api().getTableRowProps({ view: "day" })}>
                  <Index each={week()}>
                    {(value) => (
                      <td
                        {...api().getDayTableCellProps({ value: value() })}
                        class="sb-date-picker-table-cell"
                      >
                        <div
                          {...api().getDayTableCellTriggerProps({ value: value() })}
                          class="sb-date-picker-cell-trigger"
                        >
                          {value().day}
                        </div>
                      </td>
                    )}
                  </Index>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
      </div>

      <div {...api().getViewProps({ view: "month" })}>
        <div {...api().getViewControlProps({ view: "month" })} class="sb-date-picker-view-control">
          <button
            {...api().getPrevTriggerProps({ view: "month" })}
            class="sb-date-picker-nav-trigger"
          >
            <ChevronIcon direction="prev" />
          </button>
          <button
            {...viewTriggerProps("month", String(api().visibleRange.start.year))}
            class="sb-date-picker-view-trigger"
          >
            {api().visibleRange.start.year}
          </button>
          <button
            {...api().getNextTriggerProps({ view: "month" })}
            class="sb-date-picker-nav-trigger"
          >
            <ChevronIcon direction="next" />
          </button>
        </div>

        <table
          {...api().getTableProps({ view: "month", columns: GRID_COLUMNS })}
          class="sb-date-picker-table"
        >
          <tbody {...api().getTableBodyProps({ view: "month" })}>
            <Index each={api().getMonthsGrid({ columns: GRID_COLUMNS, format: "short" })}>
              {(months) => (
                <tr {...api().getTableRowProps({ view: "month" })}>
                  <Index each={months()}>
                    {(month) => (
                      <td
                        {...api().getMonthTableCellProps({ ...month(), columns: GRID_COLUMNS })}
                        class="sb-date-picker-table-cell"
                      >
                        <div
                          {...api().getMonthTableCellTriggerProps({
                            ...month(),
                            columns: GRID_COLUMNS,
                          })}
                          class="sb-date-picker-cell-trigger"
                        >
                          {month().label}
                        </div>
                      </td>
                    )}
                  </Index>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
      </div>

      <div {...api().getViewProps({ view: "year" })}>
        <div {...api().getViewControlProps({ view: "year" })} class="sb-date-picker-view-control">
          <button
            {...api().getPrevTriggerProps({ view: "year" })}
            class="sb-date-picker-nav-trigger"
          >
            <ChevronIcon direction="prev" />
          </button>
          {/* Year is the last view, so Zag disables this trigger; it only labels the decade. */}
          <button
            {...viewTriggerProps("year", `${api().getDecade().start} – ${api().getDecade().end}`)}
            class="sb-date-picker-view-trigger"
          >
            {api().getDecade().start} – {api().getDecade().end}
          </button>
          <button
            {...api().getNextTriggerProps({ view: "year" })}
            class="sb-date-picker-nav-trigger"
          >
            <ChevronIcon direction="next" />
          </button>
        </div>

        <table
          {...api().getTableProps({ view: "year", columns: GRID_COLUMNS })}
          class="sb-date-picker-table"
        >
          <tbody {...api().getTableBodyProps({ view: "year" })}>
            <Index each={api().getYearsGrid({ columns: GRID_COLUMNS })}>
              {(years) => (
                <tr {...api().getTableRowProps({ view: "year" })}>
                  <Index each={years()}>
                    {(year) => (
                      <td
                        {...api().getYearTableCellProps({ ...year(), columns: GRID_COLUMNS })}
                        class="sb-date-picker-table-cell"
                      >
                        <div
                          {...api().getYearTableCellTriggerProps({
                            ...year(),
                            columns: GRID_COLUMNS,
                          })}
                          class="sb-date-picker-cell-trigger"
                        >
                          {year().label}
                        </div>
                      </td>
                    )}
                  </Index>
                </tr>
              )}
            </Index>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type DatePickerDescriptionProps = MessageProps;

export function DatePickerDescription(props: DatePickerDescriptionProps) {
  const messages = useDatePicker();

  return <MessageDescription {...props} messages={messages} />;
}

export type DatePickerErrorProps = MessageProps;

export function DatePickerError(props: DatePickerErrorProps) {
  const messages = useDatePicker();

  return <MessageError {...props} messages={messages} />;
}

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChevronIcon(props: { direction: "prev" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d={props.direction === "prev" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}
