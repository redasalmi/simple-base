import { fieldsetLabels, type FieldsetOptions } from "@simple-base/contracts";
import { createUniqueId, type JSX, Show, splitProps } from "solid-js";

import { cn } from "../cn";
import { type FieldsetContextType, FieldsetProvider, useFieldset } from "../internal/fieldset";
import {
  createMessages,
  MessageDescription,
  MessageError,
  type MessageProps,
} from "../internal/messages";
import { dataAttr } from "../internal/props";

export type FieldsetRootProps = FieldsetOptions & {
  children: JSX.Element;
} & Omit<
    JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    keyof FieldsetOptions | "children" | "aria-describedby"
  >;

export function Fieldset(props: FieldsetRootProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "id",
    "required",
    "disabled",
    "invalid",
    "labels",
  ]);
  const fallbackId = createUniqueId();

  const id = () => local.id ?? fallbackId;
  const invalid = () => local.invalid ?? false;

  const context = {
    ...createMessages(id, invalid),
    required: () => local.required ?? false,
    requiredLabel: () => local.labels?.required ?? fieldsetLabels.required,
  } satisfies FieldsetContextType;

  return (
    <FieldsetProvider value={context}>
      <fieldset
        {...rest}
        id={id()}
        class={cn("sb-fieldset", local.class)}
        disabled={local.disabled}
        aria-describedby={context.describedBy()}
        data-invalid={dataAttr(invalid())}
      >
        {local.children}
      </fieldset>
    </FieldsetProvider>
  );
}

export type FieldsetLegendProps = JSX.HTMLAttributes<HTMLLegendElement>;

export function FieldsetLegend(props: FieldsetLegendProps) {
  const { required, requiredLabel } = useFieldset();
  const [local, rest] = splitProps(props, ["class", "children"]);

  // The marker is hidden from assistive technology, and aria-required isn't allowed on a group.
  return (
    <legend
      {...rest}
      class={cn("sb-field-title", local.class)}
      data-required={dataAttr(required())}
    >
      {local.children}
      <Show when={required()}>
        <span class="sb-visually-hidden"> {requiredLabel()}</span>
      </Show>
    </legend>
  );
}

export type FieldsetDescriptionProps = MessageProps;

export function FieldsetDescription(props: FieldsetDescriptionProps) {
  const messages = useFieldset();

  return <MessageDescription {...props} messages={messages} />;
}

export type FieldsetErrorProps = MessageProps;

export function FieldsetError(props: FieldsetErrorProps) {
  const messages = useFieldset();

  return <MessageError {...props} messages={messages} />;
}
