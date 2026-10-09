import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

type AccessibleName =
  | { "aria-label": string; "aria-labelledby"?: string }
  | { "aria-label"?: string; "aria-labelledby": string };

export type SwitchProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "aria-checked"
> &
  AccessibleName & {
    /** Initial checked state for uncontrolled use; `form.reset()` restores it. */
    defaultChecked?: boolean;
  };

export function Switch(props: SwitchProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    // oxlint-disable-next-line jsx-a11y/role-has-required-aria-props -- the checkbox input exposes its own checked state
    <input {...rest} type="checkbox" role="switch" class={cn("sb-switch", local.class)} />
  );
}
