import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Initial value for uncontrolled use; `form.reset()` restores it. */
  defaultValue?: string;
};

export function TextArea(props: TextAreaProps) {
  const [local, rest] = splitProps(props, ["class", "defaultValue"]);

  // The text holds the default value, so the server renders it and a reset restores it.
  return (
    <textarea {...rest} class={cn("sb-textarea", local.class)}>
      {local.defaultValue}
    </textarea>
  );
}
