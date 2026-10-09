import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type CheckboxProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Initial checked state for uncontrolled use; `form.reset()` restores it. */
  defaultChecked?: boolean;
  /** Shows the mixed state. The browser clears it when the user toggles the checkbox. */
  indeterminate?: boolean;
};

export function Checkbox(props: CheckboxProps) {
  const [local, rest] = splitProps(props, ["class", "indeterminate"]);

  return (
    <input
      {...rest}
      // `indeterminate` is a DOM property with no attribute; Solid's types omit `prop:` for it.
      {...(local.indeterminate === undefined ? {} : { "prop:indeterminate": local.indeterminate })}
      type="checkbox"
      class={cn("sb-checkbox", local.class)}
    />
  );
}
