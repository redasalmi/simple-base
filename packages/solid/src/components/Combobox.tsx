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
} from "solid-js";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import {
  createMessages,
  MessageDescription,
  MessageError,
  type MessageProps,
  type Messages,
} from "../internal/messages";
import { createPositioning, PopupPortal, type PopupPortalProps } from "../internal/popup";
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
    validateWidgetOptions("Combobox", local.options);
    return local.options;
  });
  const options = createMemo(() => {
    const search = query().toLowerCase();
    return validatedOptions().filter((option) => option.label.toLowerCase().includes(search));
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
    },
  });

  const api = createMemo(() => combobox.connect(service, normalizeProps));

  const context = {
    ...createMessages(id, () => local.invalid ?? false),
    options,
    api,
  } satisfies ComboboxContextType;

  return (
    <ComboboxProvider value={context}>
      <div {...mergeProps(api().getRootProps(), rest)} class={cn("sb-combobox", local.class)}>
        {/* Zag names the text input, which would submit the typed text instead of the value. */}
        <select
          aria-hidden="true"
          tabIndex={-1}
          style={visuallyHiddenStyle}
          name={local.name}
          form={local.form}
          disabled={local.disabled}
          required={local.required}
          onFocus={() => api().focus()}
        >
          <Show when={api().value[0]}>
            {(value) => (
              // oxlint-disable-next-line jsx-a11y/control-has-associated-label -- the select is hidden from assistive technology
              <option value={value()} />
            )}
          </Show>
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

  // Zag passes the input text as `defaultValue`, which Solid's normalizer renames to a live
  // `value`. Restore it so a form reset keeps the text; Zag syncs what's displayed.
  // Solid only sets `defaultValue` as a DOM property under `prop:`.
  const inputProps = () => {
    const { value, ...zagProps } = api().getInputProps();
    return { ...zagProps, "prop:defaultValue": value };
  };

  return (
    <input
      {...mergeProps(inputProps(), rest)}
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

export type ComboboxContentProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "hidden">;

export function ComboboxContent(props: ComboboxContentProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div hidden={!api().open} {...rest} class={cn("sb-combobox-content", local.class)}>
      {local.children}
    </div>
  );
}

export type ComboboxListProps = Omit<
  JSX.HTMLAttributes<HTMLUListElement>,
  "id" | "role" | "tabIndex" | "children"
> & {
  children: (option: ComboboxOption) => JSX.Element;
};

export function ComboboxList(props: ComboboxListProps) {
  const { api, options } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ul {...mergeProps(api().getContentProps(), rest)} class={cn("sb-combobox-list", local.class)}>
      <For each={options()}>{(option) => local.children(option)}</For>
    </ul>
  );
}

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
