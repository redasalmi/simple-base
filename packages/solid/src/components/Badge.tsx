import { type JSX, splitProps } from "solid-js";
import { cn } from "../utils";

export type BadgeVariant = "default" | "command" | "success" | "danger" | "outline" | "muted";
export type BadgeSize = "small" | "medium";

export type BadgeProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export function Badge(props: BadgeProps) {
  const [{ class: className, variant = "default", size = "medium" }, rest] = splitProps(props, [
    "class",
    "variant",
    "size",
  ]);

  return (
    <span {...rest} class={cn("sb-badge", className)} data-variant={variant} data-size={size} />
  );
}
