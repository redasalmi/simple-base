import { type Accessor, type JSX, Show, splitProps } from "solid-js";

import { cn } from "../cn";
import { createRegistry } from "./registry";

export type Messages = {
  descriptionId: Accessor<string>;
  errorId: Accessor<string>;
  invalid: Accessor<boolean>;
  /** The ids of the mounted description and, while invalid, the error. */
  describedBy: Accessor<string | undefined>;
  registerDescription: () => void;
  registerError: () => void;
};

/** Description and error wiring for a control whose root owns the `id`. */
export function createMessages(id: Accessor<string>, invalid: Accessor<boolean>): Messages {
  const descriptions = createRegistry();
  const errors = createRegistry();
  const descriptionId = () => `${id()}-description`;
  const errorId = () => `${id()}-error`;

  return {
    descriptionId,
    errorId,
    invalid,
    describedBy() {
      const ids = [];
      if (descriptions.entries().length > 0) ids.push(descriptionId());
      if (errors.entries().length > 0 && invalid()) ids.push(errorId());

      return ids.length > 0 ? ids.join(" ") : undefined;
    },
    registerDescription: () => descriptions.register(),
    registerError: () => errors.register(),
  };
}

export type MessageProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function MessageDescription(props: MessageProps & { messages: Messages }) {
  const [local, rest] = splitProps(props, ["class", "messages"]);
  // oxlint-disable-next-line solid/reactivity -- the messages object never changes
  const { descriptionId, registerDescription } = local.messages;

  registerDescription();

  return <p {...rest} class={cn("sb-field-description", local.class)} id={descriptionId()} />;
}

export function MessageError(props: MessageProps & { messages: Messages }) {
  const [local, rest] = splitProps(props, ["class", "messages"]);
  // oxlint-disable-next-line solid/reactivity -- the messages object never changes
  const { errorId, invalid, registerError } = local.messages;

  registerError();

  return (
    <Show when={invalid()}>
      <p {...rest} class={cn("sb-field-error", local.class)} id={errorId()} />
    </Show>
  );
}
