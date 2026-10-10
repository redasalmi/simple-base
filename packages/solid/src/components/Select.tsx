import type { SelectOption, SelectOptions } from "@simple-base/contracts";
import * as select from "@zag-js/select";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import {
  type Accessor,
  createMemo,
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

type SelectContextType = Messages & {
  placeholder: Accessor<string | undefined>;
  options: Accessor<readonly SelectOption[]>;
  api: Accessor<select.Api>;
};

const [SelectProvider, useSelect] = createRequiredContext<SelectContextType>("Select");

export type SelectRootProps = SelectOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof SelectOptions | "children">;

export function Select(props: SelectRootProps) {
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

  const collection = createMemo(() => {
    validateWidgetOptions("Select", local.options);

    return select.collection({
      items: local.options,
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
      isItemDisabled: (item) => item.disabled ?? false,
    });
  });

  const positioning = createPositioning(() => local.placement);

  const fallbackId = createUniqueId();
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
    get form() {
      return local.form;
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
    onOpenChange({ open }) {
      local.onOpenChange?.(open);
    },
    onValueChange({ value }) {
      local.onValueChange?.(fromZagValue(value));
    },
  });

  const api = createMemo(() => select.connect(service, normalizeProps));

  const context = {
    ...createMessages(id, () => local.invalid ?? false),
    placeholder: () => local.placeholder,
    options: () => local.options,
    api,
  } satisfies SelectContextType;

  return (
    <SelectProvider value={context}>
      <div {...mergeProps(api().getRootProps(), rest)} class={cn("sb-select-root", local.class)}>
        <select {...api().getHiddenSelectProps()}>
          <Show when={api().value.length === 0}>
            {/* oxlint-disable-next-line jsx-a11y/control-has-associated-label -- the select is hidden from assistive technology */}
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
    </SelectProvider>
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

export type SelectPortalProps = PopupPortalProps;

export const SelectPortal = PopupPortal;

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
      <div {...rest} class={cn("sb-select-empty", local.class)}>
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

export type SelectDescriptionProps = MessageProps;

export function SelectDescription(props: SelectDescriptionProps) {
  const messages = useSelect();

  return <MessageDescription {...props} messages={messages} />;
}

export type SelectErrorProps = MessageProps;

export function SelectError(props: SelectErrorProps) {
  const messages = useSelect();

  return <MessageError {...props} messages={messages} />;
}
