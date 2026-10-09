import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type RadioProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Initial checked state for uncontrolled use; `form.reset()` restores it. */
  defaultChecked?: boolean;
};

export function Radio(props: RadioProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <input {...rest} type="radio" class={cn("sb-radio", local.class)} />;
}
