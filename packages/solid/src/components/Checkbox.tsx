import { splitProps, type JSX } from "solid-js";
import { cn } from "../utils";

export type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <input {...rest} type="checkbox" class={cn("sb-checkbox", className)} />;
}
