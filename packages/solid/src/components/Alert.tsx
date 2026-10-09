import type { AlertOptions } from "@simple-base/contracts";
import { type JSX, splitProps } from "solid-js";

import { cn } from "../cn";

export type { AlertStatus } from "@simple-base/contracts";

export type AlertRootProps = JSX.HTMLAttributes<HTMLDivElement> & AlertOptions;

export function Alert(props: AlertRootProps) {
  const [local, rest] = splitProps(props, ["class", "status"]);

  return <div {...rest} class={cn("sb-alert", local.class)} data-status={local.status} />;
}

export type AlertMarkProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "aria-hidden">;

export function AlertMark(props: AlertMarkProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <span {...rest} aria-hidden="true" class={cn("sb-alert-mark", local.class)} />;
}

export type AlertContentProps = JSX.HTMLAttributes<HTMLDivElement>;

export function AlertContent(props: AlertContentProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-content", local.class)} />;
}

export type AlertTitleProps = JSX.HTMLAttributes<HTMLElement>;

export function AlertTitle(props: AlertTitleProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <strong {...rest} class={cn("sb-alert-title", local.class)} />;
}

export type AlertDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>;

export function AlertDescription(props: AlertDescriptionProps) {
  return <p {...props} />;
}

export type AlertActionsProps = JSX.HTMLAttributes<HTMLDivElement>;

export function AlertActions(props: AlertActionsProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-actions", local.class)} />;
}

export type AlertCloseProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export function AlertClose(props: AlertCloseProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <button {...rest} type="button" class={cn("sb-alert-close", local.class)} />;
}
