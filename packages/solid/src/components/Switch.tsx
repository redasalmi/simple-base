import { splitProps, type JSX } from "solid-js";
import { cn } from "../utils";

type AccessibleName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

export type SwitchProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "aria-checked"
> &
  AccessibleName;

export function Switch(props: SwitchProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <input {...rest} type="checkbox" role="switch" class={cn("sb-switch", className)} />;
}
