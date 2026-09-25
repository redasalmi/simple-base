import { splitProps, type JSX } from "solid-js";
import { cn } from "../cn";
import { buttonDefaults, type ButtonOptions } from "@simple-base/contracts";

export type { ButtonVariant, ButtonSize } from "@simple-base/contracts";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & ButtonOptions;

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);

  return (
    <button
      {...rest}
      class={cn("sb-button", local.class)}
      data-variant={local.variant ?? buttonDefaults.variant}
      data-size={local.size ?? buttonDefaults.size}
    />
  );
}
