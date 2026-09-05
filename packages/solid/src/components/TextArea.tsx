import { splitProps, type JSX } from "solid-js";
import { cn } from "cn";

export type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <textarea {...rest} class={cn("sb-textarea", className)} />;
}
