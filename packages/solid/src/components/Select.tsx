import {
  splitProps,
  createMemo,
  useContext,
  For,
  Show,
  createContext,
  type JSX,
  type Accessor,
} from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "cn";
import * as select from "@zag-js/select";
import { normalizeProps, useMachine } from "@zag-js/solid";
import type { SelectOption, SelectOptions } from "@simple-base/contracts";

type SelectContextType = {
  label: Accessor<string>;
  placeholder: Accessor<string | undefined>;
  options: Accessor<SelectOption[]>;
  api: Accessor<select.Api>;
};

const SelectContext = createContext<SelectContextType | null>(null);

function useSelect() {
  const context = useContext(SelectContext);
  if (!context) throw new Error("useSelect must be used within a Select");

  return context;
}

export type SelectRootProps = SelectOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof SelectOptions | "children">;

function SelectRoot(props: SelectRootProps) {
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

  const collection = createMemo(() =>
    select.collection({
      items: local.options,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
      isItemDisabled: (item) => item.disabled ?? false,
    }),
  );

  const positioning = createMemo(() =>
    local.placement ? { placement: local.placement } : undefined,
  );

  const service = useMachine(select.machine, {
    get id() {
      return local.id;
    },
    get ids() {
      return { root: local.id };
    },
    get name() {
      return local.name;
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
    onOpenChange({ open }) {
      local.onOpenChange?.(open);
    },
    onValueChange({ value }) {
      local.onValueChange(value[0] ?? "");
    },
  });

  const api = createMemo(() => select.connect(service, normalizeProps));

  return (
    <SelectContext.Provider
      value={{
        label: () => local.label,
        placeholder: () => local.placeholder,
        options: () => local.options,
        api,
      }}
    >
      <div {...api().getRootProps()} {...rest} class={cn("sb-select-root", local.class)}>
        <Show when={local.name}>
          <select {...api().getHiddenSelectProps()}>
            <For each={local.options}>
              {(option) => <option value={option.value}>{option.label}</option>}
            </For>
          </select>
        </Show>
        {local.children}
      </div>
    </SelectContext.Provider>
  );
}

export type SelectLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id" | "for"> & {
  children?: JSX.Element;
};

function SelectLabel(props: SelectLabelProps) {
  const { api, label } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <label {...api().getLabelProps()} {...rest} class={cn("sb-select-label", local.class)}>
      {local.children ?? label()}
    </label>
  );
}

export type SelectControlProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id">;

function SelectControl(props: SelectControlProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...api().getControlProps()} {...rest} class={cn("sb-select-control", local.class)}>
      {local.children}
    </div>
  );
}

export type SelectTriggerProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "type" | "role" | "disabled"
>;

function SelectTrigger(props: SelectTriggerProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <button {...api().getTriggerProps()} {...rest} class={cn("sb-select-trigger", local.class)}>
      {local.children}
    </button>
  );
}

export type SelectValueTextProps = JSX.HTMLAttributes<HTMLSpanElement>;

function SelectValueText(props: SelectValueTextProps) {
  const { api, placeholder } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span {...api().getValueTextProps()} {...rest} class={cn("sb-select-value-text", local.class)}>
      {local.children ?? (api().valueAsString || placeholder())}
    </span>
  );
}

export type SelectIndicatorProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "aria-hidden">;

function SelectIndicator(props: SelectIndicatorProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span
      {...api().getIndicatorProps()}
      aria-hidden="true"
      {...rest}
      class={cn("sb-select-indicator", local.class)}
    >
      {local.children}
    </span>
  );
}

export type SelectPortalProps = {
  children: JSX.Element;
};

function SelectPortal(props: SelectPortalProps) {
  return <Portal>{props.children}</Portal>;
}

export type SelectPositionerProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "style">;

function SelectPositioner(props: SelectPositionerProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...api().getPositionerProps()} {...rest} class={cn("sb-select-positioner", local.class)}>
      {local.children}
    </div>
  );
}

export type SelectContentProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "hidden">;

function SelectContent(props: SelectContentProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div hidden={!api().open} {...rest} class={cn("sb-select-content", local.class)}>
      {local.children}
    </div>
  );
}

export type SelectListProps = Omit<
  JSX.HTMLAttributes<HTMLUListElement>,
  "id" | "role" | "tabIndex" | "children"
> & {
  children: (option: SelectOption) => JSX.Element;
};

function SelectList(props: SelectListProps) {
  const { api, options, label } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ul
      {...api().getContentProps()}
      aria-label={label()}
      {...rest}
      class={cn("sb-select-list", local.class)}
    >
      <For each={options()}>{(option) => local.children(option)}</For>
    </ul>
  );
}

export type SelectEmptyProps = JSX.HTMLAttributes<HTMLDivElement>;

function SelectEmpty(props: SelectEmptyProps) {
  const { api, options } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <Show when={api().open && options().length === 0}>
      <div {...rest} role="status" class={cn("sb-select-empty", local.class)}>
        {local.children}
      </div>
    </Show>
  );
}

export type SelectItemProps = Omit<
  JSX.LiHTMLAttributes<HTMLLIElement>,
  "id" | "role" | "children"
> & {
  option: SelectOption;
};

function SelectItem(props: SelectItemProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "option"]);

  return (
    <li
      {...api().getItemProps({ item: local.option })}
      {...rest}
      class={cn("sb-select-item", local.class)}
    >
      {local.option.label}
    </li>
  );
}

export const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Label: SelectLabel,
  Control: SelectControl,
  Trigger: SelectTrigger,
  ValueText: SelectValueText,
  Indicator: SelectIndicator,
  Portal: SelectPortal,
  Positioner: SelectPositioner,
  Content: SelectContent,
  List: SelectList,
  Empty: SelectEmpty,
  Item: SelectItem,
});
