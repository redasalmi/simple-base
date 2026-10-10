import type { DialogOptions } from "@simple-base/contracts";
import { type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import {
  createDialog,
  DialogContentBase,
  type DialogContentBaseProps,
  type DialogState,
  DialogTriggerBase,
  type DialogTriggerBaseProps,
} from "../internal/dialog";
import { composeHandler } from "../internal/props";
import { Button, type ButtonProps } from "./Button";

const [AlertDialogProvider, useAlertDialog] = createRequiredContext<DialogState>("AlertDialog");

export type AlertDialogRootProps = DialogOptions & {
  children: JSX.Element;
};

export function AlertDialog(props: AlertDialogRootProps) {
  const dialog = createDialog(props);

  return <AlertDialogProvider value={dialog}>{props.children}</AlertDialogProvider>;
}

export type AlertDialogTriggerProps = DialogTriggerBaseProps;

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  const dialog = useAlertDialog();

  return (
    <DialogTriggerBase
      {...props}
      dialog={dialog}
      class={cn("sb-alert-dialog-trigger", props.class)}
    />
  );
}

export type AlertDialogContentProps = DialogContentBaseProps;

export function AlertDialogContent(props: AlertDialogContentProps) {
  const dialog = useAlertDialog();

  return (
    <DialogContentBase
      {...props}
      dialog={dialog}
      role="alertdialog"
      class={cn("sb-alert-dialog-content", props.class)}
    />
  );
}

export type AlertDialogIconProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "aria-hidden">;

export function AlertDialogIcon(props: AlertDialogIconProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} aria-hidden="true" class={cn("sb-alert-dialog-icon", local.class)} />;
}

export type AlertDialogHeaderProps = JSX.HTMLAttributes<HTMLDivElement>;

export function AlertDialogHeader(props: AlertDialogHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-dialog-header", local.class)} />;
}

export type AlertDialogKickerProps = JSX.HTMLAttributes<HTMLParagraphElement>;

export function AlertDialogKicker(props: AlertDialogKickerProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <p {...rest} class={cn("sb-alert-dialog-kicker", local.class)} />;
}

export type AlertDialogTitleProps = Omit<JSX.HTMLAttributes<HTMLHeadingElement>, "id"> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function AlertDialogTitle(props: AlertDialogTitleProps) {
  const { titleId, registerTitle } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class", "level"]);

  registerTitle();

  return (
    <Dynamic
      {...rest}
      component={`h${local.level ?? 2}`}
      id={titleId}
      class={cn("sb-alert-dialog-title", local.class)}
    />
  );
}

export type AlertDialogDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  const { descriptionId, registerDescription } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class"]);

  registerDescription();

  return <p {...rest} id={descriptionId} class={cn("sb-alert-dialog-description", local.class)} />;
}

export type AlertDialogFooterProps = JSX.HTMLAttributes<HTMLDivElement>;

export function AlertDialogFooter(props: AlertDialogFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-dialog-footer", local.class)} />;
}

export type AlertDialogCancelProps = ButtonProps;

export function AlertDialogCancel(props: AlertDialogCancelProps) {
  const { close } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class", "variant", "autofocus", "onClick"]);

  return (
    <Button
      type="button"
      {...rest}
      onClick={composeHandler(
        () => local.onClick,
        (event) => close(event.currentTarget.value),
      )}
      class={cn("sb-alert-dialog-cancel", local.class)}
      autofocus={local.autofocus ?? true}
      variant={local.variant ?? "secondary"}
    />
  );
}

export type AlertDialogActionProps = ButtonProps;

export function AlertDialogAction(props: AlertDialogActionProps) {
  const { close } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class", "variant", "onClick"]);

  return (
    <Button
      type="button"
      {...rest}
      onClick={composeHandler(
        () => local.onClick,
        (event) => close(event.currentTarget.value),
      )}
      class={cn("sb-alert-dialog-action", local.class)}
      variant={local.variant ?? "danger"}
    />
  );
}
