import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type SwitchProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "aria-checked"
> & {
  /** Initial checked state for uncontrolled use; `form.reset()` restores it. */
  defaultChecked?: boolean;
};

export function Switch(props: SwitchProps) {
  const [local, rest] = splitProps(props, ["class", "defaultChecked"]);

  return (
    <input
      {...rest}
      // The `checked` attribute holds the default state, so the server renders it and a reset restores it.
      bool:checked={local.defaultChecked}
      type="checkbox"
      // oxlint-disable-next-line jsx-a11y/role-has-required-aria-props -- the checkbox input exposes its own checked state
      role="switch"
      class={cn("sb-switch", local.class)}
    />
  );
}
