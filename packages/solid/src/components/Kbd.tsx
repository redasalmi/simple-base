import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type KbdProps = JSX.HTMLAttributes<HTMLElement>;

/** One key, such as `Ctrl` or `K`. Write a combination as one `Kbd` per key. */
export function Kbd(props: KbdProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <kbd {...rest} class={cn("sb-kbd", local.class)} />;
}
