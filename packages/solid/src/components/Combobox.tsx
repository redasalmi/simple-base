import {
  splitProps,
  createMemo,
  useContext,
  createSignal,
  For,
  Show,
  createContext,
  type JSX,
  type Accessor,
} from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "cn";
import * as combobox from "@zag-js/combobox";
import { normalizeProps, useMachine } from "@zag-js/solid";
import type { ComboboxOption, ComboboxOptions } from "@simple-base/contracts";
import { mergeWidgetProps } from "../mergeWidgetProps";
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

type ComboboxContextType = {
  label: Accessor<string>;
  options: Accessor<ComboboxOption[]>;
  api: Accessor<combobox.Api>;
};

const ComboboxContext = createContext<ComboboxContextType | null>(null);

function useCombobox() {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error("useCombobox must be used within a Combobox");

  return context;
}

export type ComboboxRootProps = ComboboxOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof ComboboxOptions | "children">;

export function Combobox(props: ComboboxRootProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "id",
    "label",
    "name",
    "placeholder",
    "options",
    "value",
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

  const positioning = createMemo(() =>
    local.placement ? { placement: local.placement } : undefined,
  );

  const service = useMachine(combobox.machine, {
    get id() {
      return local.id;
    },
    get ids() {
      return { root: local.id };
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
      if (local.value === undefined) return undefined;
      return local.value === "" ? [] : [local.value];
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
      local.onValueChange(value[0] ?? "");
    },
  });

  const api = createMemo(() => combobox.connect(service, normalizeProps));

  return (
    <ComboboxContext.Provider
      value={{
        label: () => local.label,
        options,
        api,
      }}
    >
      <div {...mergeWidgetProps(api().getRootProps(), rest)} class={cn("sb-combobox", local.class)}>
        {/* Zag names the text input, which would submit the typed text instead of the value. */}
        <select
          aria-hidden="true"
          tabIndex={-1}
          style={visuallyHiddenStyle}
          name={local.name}
          disabled={local.disabled}
          required={local.required}
          onFocus={() => api().focus()}
        >
          <Show when={api().value[0]}>{(value) => <option value={value()} />}</Show>
        </select>
        {local.children}
      </div>
    </ComboboxContext.Provider>
  );
}

export type ComboboxLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id" | "for"> & {
  children?: JSX.Element;
};

export function ComboboxLabel(props: ComboboxLabelProps) {
  const { api, label } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <label
      {...mergeWidgetProps(api().getLabelProps(), rest)}
      class={cn("sb-combobox-label", local.class)}
    >
      {local.children ?? label()}
    </label>
  );
}

export type ComboboxControlProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id">;

export function ComboboxControl(props: ComboboxControlProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeWidgetProps(api().getControlProps(), rest)}
      class={cn("sb-combobox-control", local.class)}
    >
      {local.children}
    </div>
  );
}

export type ComboboxInputProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "role" | "value" | "defaultValue" | "disabled" | "readOnly" | "autoComplete"
>;

export function ComboboxInput(props: ComboboxInputProps) {
  const { api, label } = useCombobox();
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <input
      aria-label={label()}
      {...mergeWidgetProps(api().getInputProps(), rest)}
      class={cn("sb-combobox-input", local.class)}
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
      {...mergeWidgetProps(api().getTriggerProps(), rest)}
      class={cn("sb-combobox-trigger", local.class)}
    >
      {local.children}
    </button>
  );
}

export type ComboboxPortalProps = {
  children: JSX.Element;
  mount?: Node;
};

export function ComboboxPortal(props: ComboboxPortalProps) {
  return <Portal mount={props.mount}>{props.children}</Portal>;
}

export type ComboboxPositionerProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "style">;

export function ComboboxPositioner(props: ComboboxPositionerProps) {
  const { api } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeWidgetProps(api().getPositionerProps(), rest)}
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
  const { api, options, label } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ul
      aria-label={label()}
      {...mergeWidgetProps(api().getContentProps(), rest)}
      class={cn("sb-combobox-list", local.class)}
    >
      <For each={options()}>{(option) => local.children(option)}</For>
    </ul>
  );
}

export type ComboboxEmptyProps = JSX.HTMLAttributes<HTMLDivElement>;

export function ComboboxEmpty(props: ComboboxEmptyProps) {
  const { api, options } = useCombobox();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <Show when={api().open && options().length === 0}>
      <div {...rest} role="status" class={cn("sb-combobox-empty", local.class)}>
        {local.children}
      </div>
    </Show>
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
      {...mergeWidgetProps(api().getItemProps({ item: local.option }), rest)}
      class={cn("sb-combobox-item", local.class)}
    >
      {local.option.label}
    </li>
  );
}
