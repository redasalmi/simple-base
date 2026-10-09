import type { SelectOption, SelectOptions } from "@simple-base/contracts";
import * as select from "@zag-js/select";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import {
  type Accessor,
  createContext,
  createMemo,
  createSignal,
  createUniqueId,
  For,
  type JSX,
  onCleanup,
  onMount,
  Show,
  splitProps,
  useContext,
} from "solid-js";
import { Portal } from "solid-js/web";

import { cn } from "../cn";
import { validateWidgetOptions } from "../validateWidgetOptions";

type SelectContextType = {
  descriptionId: Accessor<string>;
  errorId: Accessor<string>;
  describedBy: Accessor<string | undefined>;
  invalid: Accessor<boolean>;
  registerDescription: () => void;
  registerError: () => void;
  placeholder: Accessor<string | undefined>;
  options: Accessor<SelectOption[]>;
  api: Accessor<select.Api>;
};

const SelectContext = createContext<SelectContextType | null>(null);

function useSelect() {
  const context = useContext(SelectContext);
  if (!context) throw new Error("Select parts must be used within a Select");

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
    "name",
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

  const fallbackId = createUniqueId();
  const [hasDescription, setHasDescription] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);

  const id = () => local.id ?? fallbackId;

  const service = useMachine(select.machine, {
    get id() {
      return id();
    },
    get ids() {
      return { root: id() };
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
    get defaultValue() {
      if (local.defaultValue === undefined) return undefined;
      return local.defaultValue === "" ? [] : [local.defaultValue];
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
      local.onValueChange?.(value[0] ?? "");
    },
  });

  const api = createMemo(() => select.connect(service, normalizeProps));

  const descriptionId = () => `${id()}-description`;
  const errorId = () => `${id()}-error`;
  const invalid = () => local.invalid ?? false;

  const describedBy = () => {
    const ids = [];
    if (hasDescription()) ids.push(descriptionId());
    if (hasError() && invalid()) ids.push(errorId());

    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  return (
    <SelectContext.Provider
      value={{
        descriptionId,
        errorId,
        describedBy,
        invalid,
        registerDescription() {
          onMount(() => setHasDescription(true));
          onCleanup(() => setHasDescription(false));
        },
        registerError() {
          onMount(() => setHasError(true));
          onCleanup(() => setHasError(false));
        },
        placeholder: () => local.placeholder,
        options: () => local.options,
        api,
      }}
    >
      <div {...mergeProps(api().getRootProps(), rest)} class={cn("sb-select-root", local.class)}>
        <select {...api().getHiddenSelectProps()}>
          <Show when={api().value.length === 0}>
            <option value="" />
          </Show>
          <For each={local.options}>
            {(option) => (
              <option
                value={option.value}
                // The `selected` attribute, unlike the property, is what a native form reset restores.
                {...{ "attr:selected": api().value.includes(option.value) ? "" : undefined }}
              >
                {option.label}
              </option>
            )}
          </For>
        </select>
        {local.children}
      </div>
    </SelectContext.Provider>
  );
}

export type SelectLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id" | "for">;

export function SelectLabel(props: SelectLabelProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <label {...mergeProps(api().getLabelProps(), rest)} class={cn("sb-field-label", local.class)}>
      {local.children}
    </label>
  );
}

export type SelectControlProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id">;

export function SelectControl(props: SelectControlProps) {
  const { api } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getControlProps(), rest)}
      class={cn("sb-select-control", local.class)}
    >
      {local.children}
    </div>
  );
}

export type SelectTriggerProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "type" | "role" | "disabled" | "aria-describedby"
>;

export function SelectTrigger(props: SelectTriggerProps) {
  const { api, describedBy } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <button
      {...mergeProps(api().getTriggerProps(), rest)}
      class={cn("sb-select-trigger", local.class)}
      aria-describedby={describedBy()}
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
      {...mergeProps(api().getValueTextProps(), rest)}
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
      {...mergeProps(api().getIndicatorProps(), rest)}
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
      {...mergeProps(api().getPositionerProps(), rest)}
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
  const { api, options } = useSelect();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ul {...mergeProps(api().getContentProps(), rest)} class={cn("sb-select-list", local.class)}>
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
      {...mergeProps(api().getItemProps({ item: local.option }), rest)}
      class={cn("sb-select-item", local.class)}
    >
      {local.option.label}
    </li>
  );
}

export type SelectDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function SelectDescription(props: SelectDescriptionProps) {
  const { descriptionId, registerDescription } = useSelect();
  const [local, rest] = splitProps(props, ["class"]);

  registerDescription();

  return <p {...rest} class={cn("sb-field-description", local.class)} id={descriptionId()} />;
}

export type SelectErrorProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function SelectError(props: SelectErrorProps) {
  const { errorId, invalid, registerError } = useSelect();
  const [local, rest] = splitProps(props, ["class"]);

  registerError();

  return (
    <Show when={invalid()}>
      <p {...rest} class={cn("sb-field-error", local.class)} id={errorId()} />
    </Show>
  );
}
