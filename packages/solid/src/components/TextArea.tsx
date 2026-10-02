import { splitProps, type JSX } from "solid-js";
import { cn } from "../cn";

export type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Initial value for uncontrolled use; `form.reset()` restores it. */
  defaultValue?: string;
};

export function TextArea(props: TextAreaProps) {
  const [local, rest] = splitProps(props, ["class", "defaultValue"]);

  return (
    <textarea
      {...rest}
      // Solid only sets `defaultValue` as a DOM property under `prop:`, which its types omit.
      {...(local.defaultValue === undefined ? {} : { "prop:defaultValue": local.defaultValue })}
      class={cn("sb-textarea", local.class)}
    />
  );
}
