import { splitProps, type JSX } from "solid-js";
import { cn } from "cn";
import type { CardOptions } from "@simple-base/contracts";

export type { CardVariant } from "@simple-base/contracts";

export type CardProps = JSX.HTMLAttributes<HTMLDivElement> & CardOptions;

export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <div
      {...rest}
      class={cn("sb-card", local.class)}
      // Omit data-variant for the base surface card; only flat and rule are variants.
      data-variant={local.variant}
    />
  );
}
