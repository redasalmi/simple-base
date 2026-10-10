import type { FieldOptions } from "@simple-base/contracts";
import { type Accessor, createUniqueId, type JSX, splitProps } from "solid-js";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import {
  createMessages,
  MessageDescription,
  MessageError,
  type MessageProps,
  type Messages,
} from "../internal/messages";
import { ariaInvalid, dataAttr, type WithoutOwnedProps } from "../internal/props";
import { Input, type InputProps } from "./Input";
import { TextArea, type TextAreaProps } from "./TextArea";

type FieldContextType = Messages & {
  id: Accessor<string>;
  required: Accessor<boolean>;
  disabled: Accessor<boolean>;
};

const [FieldProvider, useField] = createRequiredContext<FieldContextType>("Field");

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

  const id = () => local.id ?? fallbackId;
  const required = () => local.required ?? false;
  const disabled = () => local.disabled ?? false;
  const invalid = () => local.invalid ?? false;

  const context = {
    ...createMessages(id, invalid),
    id,
    required,
    disabled,
  } satisfies FieldContextType;

  return (
    <FieldProvider value={context}>
      <div
        {...rest}
        class={cn("sb-field", local.class)}
        data-disabled={dataAttr(disabled())}
        data-invalid={dataAttr(invalid())}
      >
        {local.children}
      </div>
    </FieldProvider>
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
      data-required={dataAttr(required())}
    />
  );
}

type FieldOwnedProps = "id" | "required" | "disabled" | "aria-invalid" | "aria-describedby";

export type FieldInputProps = WithoutOwnedProps<InputProps, FieldOwnedProps>;

export function FieldInput(props: FieldInputProps) {
  const field = useField();

  return (
    <Input
      {...props}
      id={field.id()}
      required={field.required()}
      disabled={field.disabled()}
      aria-invalid={ariaInvalid(field.invalid())}
      aria-describedby={field.describedBy()}
    />
  );
}

export type FieldTextAreaProps = WithoutOwnedProps<TextAreaProps, FieldOwnedProps>;

export function FieldTextArea(props: FieldTextAreaProps) {
  const field = useField();

  return (
    <TextArea
      {...props}
      id={field.id()}
      required={field.required()}
      disabled={field.disabled()}
      aria-invalid={ariaInvalid(field.invalid())}
      aria-describedby={field.describedBy()}
    />
  );
}

export type FieldDescriptionProps = MessageProps;

export function FieldDescription(props: FieldDescriptionProps) {
  const messages = useField();

  return <MessageDescription {...props} messages={messages} />;
}

export type FieldErrorProps = MessageProps;

export function FieldError(props: FieldErrorProps) {
  const messages = useField();

  return <MessageError {...props} messages={messages} />;
}
