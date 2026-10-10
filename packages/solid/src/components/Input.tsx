import { type JSX, splitProps } from "solid-js";

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
      // The `value` attribute holds the default value, so the server renders it and a reset restores it.
      attr:value={local.defaultValue}
      class={cn("sb-input", local.class)}
    />
  );
}
