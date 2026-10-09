import type { FieldOptions } from "@simple-base/contracts";
import {
  type Accessor,
  createContext,
  createSignal,
  createUniqueId,
  type JSX,
  onCleanup,
  onMount,
  Show,
  splitProps,
  useContext,
} from "solid-js";

import { cn } from "../cn";
import { Input, type InputProps } from "./Input";
import { TextArea, type TextAreaProps } from "./TextArea";

type FieldContextType = {
  id: Accessor<string>;
  descriptionId: Accessor<string>;
  errorId: Accessor<string>;
  describedBy: Accessor<string | undefined>;
  required: Accessor<boolean>;
  disabled: Accessor<boolean>;
  invalid: Accessor<boolean>;
  registerDescription: () => void;
  registerError: () => void;
};

const FieldContext = createContext<FieldContextType | null>(null);

function useField() {
  const context = useContext(FieldContext);
  if (!context) throw new Error("Field parts must be used within a Field");

  return context;
}

export type FieldRootProps = FieldOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof FieldOptions | "children">;

export function Field(props: FieldRootProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "id",
    "required",
    "disabled",
    "invalid",
  ]);
  const fallbackId = createUniqueId();
  const [hasDescription, setHasDescription] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);

  const id = () => local.id ?? fallbackId;
  const descriptionId = () => `${id()}-description`;
  const errorId = () => `${id()}-error`;
  const required = () => local.required ?? false;
  const disabled = () => local.disabled ?? false;
  const invalid = () => local.invalid ?? false;

  const describedBy = () => {
    const ids = [];
    if (hasDescription()) ids.push(descriptionId());
    if (hasError() && invalid()) ids.push(errorId());

    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  const context = {
    id,
    descriptionId,
    errorId,
    describedBy,
    required,
    disabled,
    invalid,
    registerDescription() {
      onMount(() => setHasDescription(true));
      onCleanup(() => setHasDescription(false));
    },
    registerError() {
      onMount(() => setHasError(true));
      onCleanup(() => setHasError(false));
    },
  } satisfies FieldContextType;

  return (
    <FieldContext.Provider value={context}>
      <div
        {...rest}
        class={cn("sb-field", local.class)}
        data-disabled={disabled() ? "" : undefined}
        data-invalid={invalid() ? "" : undefined}
      >
        {local.children}
      </div>
    </FieldContext.Provider>
  );
}

export type FieldLabelProps = Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "for">;

export function FieldLabel(props: FieldLabelProps) {
  const { id, required } = useField();
  const [local, rest] = splitProps(props, ["class"]);

  return (
    // oxlint-disable-next-line jsx-a11y/label-has-associated-control -- the rule reads `htmlFor`, not Solid's `for`
    <label
      {...rest}
      class={cn("sb-field-label", local.class)}
      for={id()}
      data-required={required() ? "" : undefined}
    />
  );
}

type FieldOwnedProps = "id" | "required" | "disabled" | "aria-invalid" | "aria-describedby";

// JSX accepts any hyphenated attribute that a type omits, so aria-* must be typed as never to be rejected.
type WithoutFieldOwnedProps<Props> = Omit<Props, FieldOwnedProps> & {
  [Key in FieldOwnedProps]?: never;
};

export type FieldInputProps = WithoutFieldOwnedProps<InputProps>;

export function FieldInput(props: FieldInputProps) {
  const field = useField();

  return (
    <Input
      {...props}
      id={field.id()}
      required={field.required()}
      disabled={field.disabled()}
      aria-invalid={field.invalid() || undefined}
      aria-describedby={field.describedBy()}
    />
  );
}

export type FieldTextAreaProps = WithoutFieldOwnedProps<TextAreaProps>;

export function FieldTextArea(props: FieldTextAreaProps) {
  const field = useField();

  return (
    <TextArea
      {...props}
      id={field.id()}
      required={field.required()}
      disabled={field.disabled()}
      aria-invalid={field.invalid() || undefined}
      aria-describedby={field.describedBy()}
    />
  );
}

export type FieldDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function FieldDescription(props: FieldDescriptionProps) {
  const { descriptionId, registerDescription } = useField();
  const [local, rest] = splitProps(props, ["class"]);

  registerDescription();

  return <p {...rest} class={cn("sb-field-description", local.class)} id={descriptionId()} />;
}

export type FieldErrorProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function FieldError(props: FieldErrorProps) {
  const { errorId, invalid, registerError } = useField();
  const [local, rest] = splitProps(props, ["class"]);

  registerError();

  return (
    <Show when={invalid()}>
      <p {...rest} class={cn("sb-field-error", local.class)} id={errorId()} />
    </Show>
  );
}
