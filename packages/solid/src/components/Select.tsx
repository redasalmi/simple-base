import {
  splitProps,
  createMemo,
  createEffect,
  on,
  onMount,
  onCleanup,
  useContext,
  For,
  Show,
  createContext,
  type JSX,
  type Accessor,
} from "solid-js";
import { Portal } from "solid-js/web";
import { cn } from "../cn";
import * as select from "@zag-js/select";
import { normalizeProps, useMachine } from "@zag-js/solid";
import type { SelectOption, SelectOptions } from "@simple-base/contracts";
import { mergeWidgetProps } from "../mergeWidgetProps";
import { validateWidgetOptions } from "../validateWidgetOptions";

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

export function Select(props: SelectRootProps) {
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

  const collection = createMemo(() => {
    validateWidgetOptions("Select", local.options);

    return select.collection({
      items: local.options,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
      isItemDisabled: (item) => item.disabled ?? false,
    });
  });

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
  let hiddenSelect!: HTMLSelectElement;

  const syncHiddenSelect = () => {
    hiddenSelect.value = api().value[0] ?? "";
  };

  // Replacing options can change native selection without changing the machine's value.
  createEffect(on([collection, () => api().value], syncHiddenSelect));
  onMount(() => {
    const form = hiddenSelect.form;
    // The browser resets native selection after Zag handles the reset event.
    let resetFrame = 0;
    const handleReset = () => {
      cancelAnimationFrame(resetFrame);
      resetFrame = requestAnimationFrame(syncHiddenSelect);
    };
    form?.addEventListener("reset", handleReset);
    onCleanup(() => {
      form?.removeEventListener("reset", handleReset);
      cancelAnimationFrame(resetFrame);
    });
  });

  return (
    <SelectContext.Provider
      value={{
        label: () => local.label,
        placeholder: () => local.placeholder,
        options: () => local.options,
        api,
      }}
    >
      <div
        {...mergeWidgetProps(api().getRootProps(), rest)}
        class={cn("sb-select-root", local.class)}
      >
        <select
          ref={(element) => {
            hiddenSelect = element;
          }}
          {...api().getHiddenSelectProps()}
        >
          <For each={local.options}>
            {(option) => <option value={option.value}>{option.label}</option>}
          </For>
        </select>
        {local.children}
      </div>
    </SelectContext.Provider>
  );
}

export type SelectLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id" | "for"> & {
  children?: JSX.Element;
};

export function SelectLabel(props: SelectLabelProps) {
  const { api, label } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <label
      {...mergeWidgetProps(api().getLabelProps(), rest)}
      class={cn("sb-select-label", local.class)}
    >
      {local.children ?? label()}
    </label>
  );
}

export type SelectControlProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id">;

export function SelectControl(props: SelectControlProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeWidgetProps(api().getControlProps(), rest)}
      class={cn("sb-select-control", local.class)}
    >
      {local.children}
    </div>
  );
}

export type SelectTriggerProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "type" | "role" | "disabled" | "aria-label"
>;

export function SelectTrigger(props: SelectTriggerProps) {
  const { api, label } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <button
      aria-label={label()}
      {...mergeWidgetProps(api().getTriggerProps(), rest)}
      class={cn("sb-select-trigger", local.class)}
    >
      {local.children}
    </button>
  );
}

export type SelectValueTextProps = JSX.HTMLAttributes<HTMLSpanElement>;

export function SelectValueText(props: SelectValueTextProps) {
  const { api, placeholder } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span
      {...mergeWidgetProps(api().getValueTextProps(), rest)}
      class={cn("sb-select-value-text", local.class)}
    >
      {local.children ?? (api().valueAsString || placeholder())}
    </span>
  );
}

export type SelectIndicatorProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "aria-hidden">;

export function SelectIndicator(props: SelectIndicatorProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span
      {...mergeWidgetProps(api().getIndicatorProps(), rest)}
      aria-hidden="true"
      class={cn("sb-select-indicator", local.class)}
    >
      {local.children}
    </span>
  );
}

export type SelectPortalProps = {
  children: JSX.Element;
  mount?: Node;
};

export function SelectPortal(props: SelectPortalProps) {
  return <Portal mount={props.mount}>{props.children}</Portal>;
}

export type SelectPositionerProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "style">;

export function SelectPositioner(props: SelectPositionerProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeWidgetProps(api().getPositionerProps(), rest)}
      class={cn("sb-select-positioner", local.class)}
    >
      {local.children}
    </div>
  );
}

export type SelectContentProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "hidden">;

export function SelectContent(props: SelectContentProps) {
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

export function SelectList(props: SelectListProps) {
  const { api, options, label } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ul
      aria-label={label()}
      {...mergeWidgetProps(api().getContentProps(), rest)}
      class={cn("sb-select-list", local.class)}
    >
      <For each={options()}>{(option) => local.children(option)}</For>
    </ul>
  );
}

export type SelectEmptyProps = JSX.HTMLAttributes<HTMLDivElement>;

export function SelectEmpty(props: SelectEmptyProps) {
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

export function SelectItem(props: SelectItemProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "option"]);

  return (
    <li
      {...mergeWidgetProps(api().getItemProps({ item: local.option }), rest)}
      class={cn("sb-select-item", local.class)}
    >
      {local.option.label}
    </li>
  );
}
