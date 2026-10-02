import { splitProps, type JSX } from "solid-js";
import { cn } from "../cn";

export type CheckboxProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Initial checked state for uncontrolled use; `form.reset()` restores it. */
  defaultChecked?: boolean;
};

export function Checkbox(props: CheckboxProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <input {...rest} type="checkbox" class={cn("sb-checkbox", local.class)} />;
}
