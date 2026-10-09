import type { StatusOptions } from "@simple-base/contracts";
import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type { StatusValue } from "@simple-base/contracts";

export type StatusLineRootProps = JSX.HTMLAttributes<HTMLDivElement> & StatusOptions;

export function StatusLine(props: StatusLineRootProps) {
  const [local, rest] = splitProps(props, ["class", "status"]);

  return <div {...rest} class={cn("sb-status-line", local.class)} data-status={local.status} />;
}

export type StatusLineDotProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "aria-hidden">;

export function StatusLineDot(props: StatusLineDotProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <span {...rest} aria-hidden="true" class={cn("sb-status-dot", local.class)} />;
}

export type StatusLineContentProps = JSX.HTMLAttributes<HTMLDivElement>;

export function StatusLineContent(props: StatusLineContentProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-status-line-content", local.class)} />;
}

export type StatusLineTitleProps = JSX.HTMLAttributes<HTMLElement>;

export function StatusLineTitle(props: StatusLineTitleProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <strong {...rest} class={cn("sb-status-line-title", local.class)} />;
}

export type StatusLineDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>;

export function StatusLineDescription(props: StatusLineDescriptionProps) {
  return <p {...props} />;
}
