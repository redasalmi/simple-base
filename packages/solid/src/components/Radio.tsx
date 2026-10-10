import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type RadioProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Initial checked state for uncontrolled use; `form.reset()` restores it. */
  defaultChecked?: boolean;
};

export function Radio(props: RadioProps) {
  const [local, rest] = splitProps(props, ["class", "defaultChecked"]);

  return (
    <input
      {...rest}
      // The `checked` attribute holds the default state, so the server renders it and a reset restores it.
      bool:checked={local.defaultChecked}
      type="radio"
      class={cn("sb-radio", local.class)}
    />
  );
}
