import type { NumberFieldOptions } from "@simple-base/contracts";
import * as numberInput from "@zag-js/number-input";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import { type Accessor, createMemo, createUniqueId, type JSX, splitProps } from "solid-js";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import {
  createMessages,
  MessageDescription,
  MessageError,
  type MessageProps,
  type Messages,
} from "../internal/messages";
import type { WithoutOwnedProps } from "../internal/props";
import { createRegistry } from "../internal/registry";

type NumberFieldContextType = Messages & {
  registerAffix: (id: string) => void;
  api: Accessor<numberInput.Api>;
};

const [NumberFieldProvider, useNumberField] =
  createRequiredContext<NumberFieldContextType>("NumberField");

export type NumberFieldRootProps = NumberFieldOptions & {
  /** Zag's labels for the step buttons and the value text, for example to translate them. */
  translations?: numberInput.IntlTranslations;
  children: JSX.Element;
} & Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    keyof NumberFieldOptions | "translations" | "children"
  >;

export function NumberField(props: NumberFieldRootProps) {
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
    "step",
    "formatOptions",
    "required",
    "disabled",
    "readOnly",
    "invalid",
    "translations",
    "onValueChange",
  ]);
  const fallbackId = createUniqueId();
  const affixes = createRegistry<string>();

  const id = () => local.id ?? fallbackId;
  const service = useMachine(numberInput.machine, {
    get id() {
      return id();
    },
    get ids() {
      return { input: id() };
    },
    get name() {
      return local.name;
    },
    get form() {
      return local.form;
    },
    get value() {
      return local.value;
    },
    get defaultValue() {
      return local.defaultValue;
    },
    get min() {
      return local.min;
    },
    get max() {
      return local.max;
    },
    get step() {
      return local.step;
    },
    get formatOptions() {
      return local.formatOptions;
    },
    get disabled() {
      return local.disabled;
    },
    get readOnly() {
      return local.readOnly;
    },
    // Left undefined when omitted so Zag marks out-of-range values invalid.
    get invalid() {
      return local.invalid;
    },
    get required() {
      return local.required;
    },
    get translations() {
      return local.translations;
    },
    onValueChange({ value, valueAsNumber }) {
      local.onValueChange?.(value, valueAsNumber);
    },
  });
  const api = createMemo(() => numberInput.connect(service, normalizeProps));

  const messages = createMessages(id, () => api().invalid);

  const context = {
    ...messages,
    // The affixes come first, so a unit is read before the description.
    describedBy: () =>
      [...affixes.entries(), messages.describedBy()].filter(Boolean).join(" ") || undefined,
    registerAffix: affixes.register,
    api,
  } satisfies NumberFieldContextType;

  return (
    <NumberFieldProvider value={context}>
      <div {...mergeProps(api().getRootProps(), rest)} class={cn("sb-number-field", local.class)}>
        {local.children}
      </div>
    </NumberFieldProvider>
  );
}

export type NumberFieldLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "id" | "for">;

export function NumberFieldLabel(props: NumberFieldLabelProps) {
  const { api } = useNumberField();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <label {...mergeProps(api().getLabelProps(), rest)} class={cn("sb-field-label", local.class)}>
      {local.children}
    </label>
  );
}

export type NumberFieldControlProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "role">;

export function NumberFieldControl(props: NumberFieldControlProps) {
  const { api } = useNumberField();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getControlProps(), rest)}
      class={cn("sb-number-field-control", local.class)}
    >
      {local.children}
    </div>
  );
}

type NumberFieldInputOwnedProps =
  | "id"
  | "type"
  | "name"
  | "form"
  | "value"
  | "min"
  | "max"
  | "step"
  | "pattern"
  | "inputmode"
  | "disabled"
  | "readOnly"
  | "readonly"
  | "required"
  | "aria-invalid"
  | "aria-describedby"
  | "aria-roledescription"
  | "aria-valuemin"
  | "aria-valuemax"
  | "aria-valuenow"
  | "aria-valuetext";

export type NumberFieldInputProps = WithoutOwnedProps<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  NumberFieldInputOwnedProps
>;

export function NumberFieldInput(props: NumberFieldInputProps) {
  const { api, describedBy } = useNumberField();
  const [local, rest] = splitProps(props, ["class"]);

  // Zag passes the formatted value as `defaultValue`, which Solid's normalizer renames to a
  // live `value`. Restore it so typing isn't overwritten and Zag syncs what's displayed.
  // Solid only sets `defaultValue` as a DOM property under `prop:`.
  const inputProps = () => {
    const { value, ...zagProps } = api().getInputProps();
    return { ...zagProps, "prop:defaultValue": value };
  };

  return (
    <input
      {...mergeProps(inputProps(), rest)}
      class={cn("sb-number-field-input", local.class)}
      aria-describedby={describedBy()}
    />
  );
}

export type NumberFieldTriggerProps = WithoutOwnedProps<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "type" | "disabled" | "aria-controls"
>;

export function NumberFieldDecrement(props: NumberFieldTriggerProps) {
  const { api } = useNumberField();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <button
      {...mergeProps(api().getDecrementTriggerProps(), rest)}
      class={cn("sb-number-field-trigger", local.class)}
    >
      {local.children ?? "−"}
    </button>
  );
}

export function NumberFieldIncrement(props: NumberFieldTriggerProps) {
  const { api } = useNumberField();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <button
      {...mergeProps(api().getIncrementTriggerProps(), rest)}
      class={cn("sb-number-field-trigger", local.class)}
    >
      {local.children ?? "+"}
    </button>
  );
}

export type NumberFieldAffixProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "id">;

export function NumberFieldAffix(props: NumberFieldAffixProps) {
  const { registerAffix } = useNumberField();
  const [local, rest] = splitProps(props, ["class"]);

  // The input lists the affix in its description, so a unit shown only here is still announced.
  const id = createUniqueId();
  registerAffix(id);

  return <span {...rest} id={id} class={cn("sb-number-field-affix", local.class)} />;
}

export type NumberFieldDescriptionProps = MessageProps;

export function NumberFieldDescription(props: NumberFieldDescriptionProps) {
  const messages = useNumberField();

  return <MessageDescription {...props} messages={messages} />;
}

export type NumberFieldErrorProps = MessageProps;

export function NumberFieldError(props: NumberFieldErrorProps) {
  const messages = useNumberField();

  return <MessageError {...props} messages={messages} />;
}
