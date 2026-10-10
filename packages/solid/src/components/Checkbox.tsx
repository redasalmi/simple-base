import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type CheckboxProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Initial checked state for uncontrolled use; `form.reset()` restores it. */
  defaultChecked?: boolean;
  /** Shows the mixed state. The browser clears it when the user toggles the checkbox. */
  indeterminate?: boolean;
};

export function Checkbox(props: CheckboxProps) {
  const [local, rest] = splitProps(props, ["class", "defaultChecked"]);

  return (
    <input
      {...rest}
      // The `checked` attribute holds the default state, so the server renders it and a reset restores it.
      bool:checked={local.defaultChecked}
      type="checkbox"
      class={cn("sb-checkbox", local.class)}
    />
  );
}
