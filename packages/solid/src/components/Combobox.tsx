import type { ComboboxOption, ComboboxOptions } from "@simple-base/contracts";
import * as combobox from "@zag-js/combobox";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import {
  type Accessor,
  createMemo,
  createSignal,
  createUniqueId,
  For,
  type JSX,
  Show,
  splitProps,
  untrack,
} from "solid-js";
import { isDev } from "solid-js/web";

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
import type { WithoutOwnedProps } from "../internal/props";
import { fromZagValue, toZagValue } from "../internal/zagValue";
import { validateWidgetOptions } from "../validateWidgetOptions";

// Matches Zag's hidden select: out of view, but focusable so native validation can report on it.
const visuallyHiddenStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: "0",
  border: "0",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  "white-space": "nowrap",
} satisfies JSX.CSSProperties;

// Base sensitivity ignores case and accents, so "e" finds "é".
const collator = new Intl.Collator(undefined, { sensitivity: "base" });

function contains(text: string, search: string) {
  const normalizedText = text.normalize("NFC");
  const normalizedSearch = search.normalize("NFC");
  for (let start = 0; start + normalizedSearch.length <= normalizedText.length; start++) {
    const slice = normalizedText.slice(start, start + normalizedSearch.length);
    if (collator.compare(slice, normalizedSearch) === 0) return true;
  }
  return false;
}

type ComboboxContextType = Messages & {
  options: Accessor<ComboboxOption[]>;
  api: Accessor<combobox.Api>;
};

const [ComboboxProvider, useCombobox] = createRequiredContext<ComboboxContextType>("Combobox");

export type ComboboxRootProps = ComboboxOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof ComboboxOptions | "children">;

export function Combobox(props: ComboboxRootProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "id",
    "name",
    "form",
    "placeholder",
    "options",
    "value",
    "defaultValue",
    "disabled",
    "placement",
    "invalid",
    "required",
    "onValueChange",
    "onOpenChange",
  ]);
  const [query, setQuery] = createSignal("");
  const validatedOptions = createMemo(() => {
    if (isDev) validateWidgetOptions("Combobox", local.options);
    return local.options;
  });
  const options = createMemo(() => {
    const search = query();
    return validatedOptions().filter((option) => contains(option.label, search));
  });

  const collection = createMemo(() =>
    combobox.collection({
      items: options(),
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
      isItemDisabled: (item) => item.disabled ?? false,
    }),
  );

  const positioning = createPositioning(() => local.placement);

  const fallbackId = createUniqueId();
  const id = () => local.id ?? fallbackId;

  const service = useMachine(combobox.machine, {
    get id() {
      return id();
    },
    get ids() {
      return { root: id() };
    },
    get placeholder() {
      return local.placeholder;
    },
    get disabled() {
      return local.disabled;
    },
    get invalid() {
      return local.invalid;
    },
    get required() {
      return local.required;
    },
    get value() {
      return toZagValue(local.value);
    },
    get defaultValue() {
      return toZagValue(local.defaultValue);
    },
    get positioning() {
      return positioning();
    },
    get collection() {
      return collection();
    },
    onOpenChange({ open, reason }) {
      if (open && reason !== "input-change") setQuery("");
      local.onOpenChange?.(open);
    },
    onInputValueChange({ inputValue, reason }) {
      setQuery(reason === "input-change" ? inputValue : "");
    },
    onValueChange({ value }) {
      local.onValueChange?.(fromZagValue(value));
      // Zag writes the chosen label into the input and only syncs it again when the value changes,
      // so put back the label of the value a controlling parent kept (U8 in audit/zag-issues.md).
      if (local.value !== undefined && local.value !== fromZagValue(value)) {
        api().syncSelectedItems();
      }
    },
  });

  const api = createMemo(() => combobox.connect(service, normalizeProps));

  let hiddenSelect: HTMLSelectElement | undefined;
  const initialValue = untrack(() => api().value);
  // Zag's combobox, unlike its select, doesn't restore its initial value on a form reset
  // (K3, U4 in audit/zag-issues.md).
  trackFormReset(
    () => hiddenSelect,
    () => {
      setQuery("");
      api().setValue(initialValue);
    },
  );

  const context = {
    ...createMessages(id, () => local.invalid ?? false),
    options,
    api,
  } satisfies ComboboxContextType;

  return (
    <ComboboxProvider value={context}>
      <div {...mergeProps(api().getRootProps(), rest)} class={cn("sb-combobox", local.class)}>
        {/* Zag names the text input, which would submit the typed text instead of the value
            (Z2, U1 in audit/zag-issues.md). */}
        <select
          ref={(element) => (hiddenSelect = element)}
          aria-hidden="true"
          tabIndex={-1}
          style={visuallyHiddenStyle}
          name={local.name}
          form={local.form}
          disabled={local.disabled}
          required={local.required}
          onFocus={() => api().focus()}
        >
          {/* Empty while nothing is selected, so the form submits "" like a native placeholder option. */}
          {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label -- the select is hidden from assistive technology */}
          <option value={api().value[0] ?? ""} />
        </select>
        {local.children}
      </div>
    </ComboboxProvider>
  );
}

export type ComboboxLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id" | "for">;

export function ComboboxLabel(props: ComboboxLabelProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <label {...mergeProps(api().getLabelProps(), rest)} class={cn("sb-field-label", local.class)}>
      {local.children}
    </label>
  );
}

export type ComboboxControlProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id">;

export function ComboboxControl(props: ComboboxControlProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getControlProps(), rest)}
      class={cn("sb-combobox-control", local.class)}
    >
      {local.children}
    </div>
  );
}

export type ComboboxInputProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  | "id"
  | "type"
  | "role"
  | "value"
  | "defaultValue"
  | "disabled"
  | "readOnly"
  | "autoComplete"
  | "aria-describedby"
>;

export function ComboboxInput(props: ComboboxInputProps) {
  const { api, describedBy } = useCombobox();
  const [local, rest] = splitProps(props, ["class"]);

  const inputProps = () => api().getInputProps();

  return (
    <input
      {...mergeProps(inputProps(), rest)}
      // Zag's Solid adapter renders the text as a live `value`, which a form reset doesn't read, so
      // keep it as the default value too. A reset then shows Zag's text instead of an empty input,
      // even when the value didn't change (Z1, U11 in audit/zag-issues.md).
      prop:defaultValue={String(inputProps().value ?? "")}
      class={cn("sb-combobox-input", local.class)}
      aria-describedby={describedBy()}
    />
  );
}

export type ComboboxTriggerProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "type" | "role" | "disabled"
>;

export function ComboboxTrigger(props: ComboboxTriggerProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <button
      {...mergeProps(api().getTriggerProps(), rest)}
      class={cn("sb-combobox-trigger", local.class)}
    >
      {local.children}
    </button>
  );
}

export type ComboboxPortalProps = PopupPortalProps;

export const ComboboxPortal = PopupPortal;

export type ComboboxPositionerProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "style">;

export function ComboboxPositioner(props: ComboboxPositionerProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getPositionerProps(), rest)}
      class={cn("sb-combobox-positioner", local.class)}
    >
      {local.children}
    </div>
  );
}

export type ComboboxContentProps = WithoutOwnedProps<
  JSX.HTMLAttributes<HTMLDivElement>,
  "id" | "hidden" | "role" | "tabIndex" | "aria-labelledby"
>;

export function ComboboxContent(props: ComboboxContentProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getContentProps(), rest)}
      class={cn("sb-combobox-content", local.class)}
    >
      {local.children}
    </div>
  );
}

export type ComboboxListProps = Omit<JSX.HTMLAttributes<HTMLUListElement>, "role" | "children"> & {
  children: (option: ComboboxOption) => JSX.Element;
};

export function ComboboxList(props: ComboboxListProps) {
  const { options } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  // Only a layout wrapper, since the content is the listbox and owns the options. Zag's list props
  // would name it, which puts an element the listbox doesn't allow between it and its options
  // (U10 in audit/zag-issues.md).
  return (
    <ul {...rest} role="presentation" class={cn("sb-combobox-list", local.class)}>
      <For each={options()}>{(option) => local.children(option)}</For>
    </ul>
  );
}

// Outside the content, which is the listbox, since a listbox may only hold options.
export type ComboboxEmptyProps = JSX.HTMLAttributes<HTMLDivElement>;

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  const { api, options } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  // The status region stays mounted and only its content changes, so screen readers announce it.
  return (
    <div role="status">
      <Show when={api().open && options().length === 0}>
        <div {...rest} class={cn("sb-combobox-empty", local.class)}>
          {local.children}
        </div>
      </Show>
    </div>
  );
}

export type ComboboxItemProps = Omit<
  JSX.LiHTMLAttributes<HTMLLIElement>,
  "id" | "role" | "children"
> & {
  option: ComboboxOption;
};

export function ComboboxItem(props: ComboboxItemProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "option"]);

  return (
    <li
      {...mergeProps(api().getItemProps({ item: local.option }), rest)}
      class={cn("sb-combobox-item", local.class)}
    >
      {local.option.label}
    </li>
  );
}

export type ComboboxDescriptionProps = MessageProps;

export function ComboboxDescription(props: ComboboxDescriptionProps) {
  const messages = useCombobox();

  return <MessageDescription {...props} messages={messages} />;
}

export type ComboboxErrorProps = MessageProps;

export function ComboboxError(props: ComboboxErrorProps) {
  const messages = useCombobox();

  return <MessageError {...props} messages={messages} />;
}
