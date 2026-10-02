import * as numberInput from "@zag-js/number-input";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import {
  type Accessor,
  createContext,
  createMemo,
  createUniqueId,
  type JSX,
  onCleanup,
  onMount,
  Show,
  splitProps,
  useContext,
  createSignal,
} from "solid-js";
import type { NumberFieldOptions } from "@simple-base/contracts";
import { cn } from "../cn";

type NumberFieldContextType = {
  descriptionId: Accessor<string>;
  errorId: Accessor<string>;
  describedBy: Accessor<string | undefined>;
  registerDescription: () => void;
  registerError: () => void;
  api: Accessor<numberInput.Api>;
};

const NumberFieldContext = createContext<NumberFieldContextType | null>(null);

function useNumberField() {
  const context = useContext(NumberFieldContext);
  if (!context) {
    throw new Error("useNumberField must be used within a NumberField");
  }
  return context;
}

// JSX accepts any hyphenated attribute that a type omits, so aria-* must be typed as never to be rejected.
type WithoutOwnedProps<Props, Owned extends string> = Omit<Props, Owned> & {
  [Key in Owned]?: never;
};

export type NumberFieldProps = NumberFieldOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof NumberFieldOptions | "children">;

export function NumberField(props: NumberFieldProps) {
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
    "onValueChange",
  ]);
  const fallbackId = createUniqueId();
  const [hasDescription, setHasDescription] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);

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
    onValueChange({ value, valueAsNumber }) {
      local.onValueChange?.(value, valueAsNumber);
    },
  });
  const api = createMemo(() => numberInput.connect(service, normalizeProps));

  const descriptionId = () => `${id()}-description`;
  const errorId = () => `${id()}-error`;

  const describedBy = () => {
    const ids = [];
    if (hasDescription()) ids.push(descriptionId());
    if (hasError() && api().invalid) ids.push(errorId());

    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  return (
    <NumberFieldContext.Provider
      value={{
        api,
        descriptionId,
        errorId,
        describedBy,
        registerDescription() {
          onMount(() => setHasDescription(true));
          onCleanup(() => setHasDescription(false));
        },
        registerError() {
          onMount(() => setHasError(true));
          onCleanup(() => setHasError(false));
        },
      }}
    >
      <div {...mergeProps(api().getRootProps(), rest)} class={cn("sb-number-input", local.class)}>
        {local.children}
      </div>
    </NumberFieldContext.Provider>
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
      class={cn("sb-number-input-control", local.class)}
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
    const { value, ...inputProps } = api().getInputProps();
    return { ...inputProps, "prop:defaultValue": value };
  };

  return (
    <input
      {...mergeProps(inputProps(), rest)}
      class={cn("sb-number-input-input", local.class)}
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
      class={cn("sb-number-input-trigger", local.class)}
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
      class={cn("sb-number-input-trigger", local.class)}
    >
      {local.children ?? "+"}
    </button>
  );
}

export type NumberFieldAffixProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "aria-hidden">;

export function NumberFieldAffix(props: NumberFieldAffixProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <span {...rest} aria-hidden="true" class={cn("sb-number-input-affix", local.class)} />;
}

export type NumberFieldDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function NumberFieldDescription(props: NumberFieldDescriptionProps) {
  const { descriptionId, registerDescription } = useNumberField();
  const [local, rest] = splitProps(props, ["class"]);

  registerDescription();

  return <p {...rest} class={cn("sb-field-description", local.class)} id={descriptionId()} />;
}

export type NumberFieldErrorProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function NumberFieldError(props: NumberFieldErrorProps) {
  const { api, errorId, registerError } = useNumberField();
  const [local, rest] = splitProps(props, ["class"]);

  registerError();

  return (
    <Show when={api().invalid}>
      <p {...rest} class={cn("sb-field-error", local.class)} id={errorId()} />
    </Show>
  );
}
