import { type JSX, splitProps } from "solid-js";
import { cn } from "cn";
import { badgeDefaults, type BadgeOptions } from "@simple-base/contracts";

export type { BadgeVariant, BadgeSize } from "@simple-base/contracts";

export type BadgeProps = JSX.HTMLAttributes<HTMLSpanElement> & BadgeOptions;

export function Badge(props: BadgeProps) {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);

  return (
    <span
      {...rest}
      class={cn("sb-badge", local.class)}
      data-variant={local.variant ?? badgeDefaults.variant}
      data-size={local.size ?? badgeDefaults.size}
    />
  );
}
