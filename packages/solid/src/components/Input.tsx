import { splitProps, type JSX } from "solid-js";
import { cn } from "../cn";

type InputType = "text" | "email" | "password" | "search" | "tel" | "url";

export type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type?: InputType;
  /** Initial value for uncontrolled use; `form.reset()` restores it. */
  defaultValue?: string;
};

export function Input(props: InputProps) {
  const [local, rest] = splitProps(props, ["class", "defaultValue"]);

  return (
    <input
      {...rest}
      // Solid only sets `defaultValue` as a DOM property under `prop:`, which its types omit.
      {...(local.defaultValue === undefined ? {} : { "prop:defaultValue": local.defaultValue })}
      class={cn("sb-input", local.class)}
    />
  );
}
