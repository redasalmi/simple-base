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

const [DialogProvider, useDialog] = createRequiredContext<DialogState>("Dialog");

export type DialogRootProps = DialogOptions & {
  children: JSX.Element;
};

export function Dialog(props: DialogRootProps) {
  const dialog = createDialog(props);

  return <DialogProvider value={dialog}>{props.children}</DialogProvider>;
}

export type DialogTriggerProps = DialogTriggerBaseProps;

export function DialogTrigger(props: DialogTriggerProps) {
  const dialog = useDialog();

  return (
    <DialogTriggerBase {...props} dialog={dialog} class={cn("sb-dialog-trigger", props.class)} />
  );
}

export type DialogContentProps = DialogContentBaseProps;

export function DialogContent(props: DialogContentProps) {
  const dialog = useDialog();

  return (
    <DialogContentBase {...props} dialog={dialog} class={cn("sb-dialog-content", props.class)} />
  );
}

export type DialogHeaderProps = JSX.HTMLAttributes<HTMLDivElement>;

export function DialogHeader(props: DialogHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-dialog-header", local.class)} />;
}

export type DialogKickerProps = JSX.HTMLAttributes<HTMLParagraphElement>;

export function DialogKicker(props: DialogKickerProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <p {...rest} class={cn("sb-dialog-kicker", local.class)} />;
}

export type DialogTitleProps = Omit<JSX.HTMLAttributes<HTMLHeadingElement>, "id"> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function DialogTitle(props: DialogTitleProps) {
  const { titleId, registerTitle } = useDialog();
  const [local, rest] = splitProps(props, ["class", "level"]);

  registerTitle();

  return (
    <Dynamic
      {...rest}
      component={`h${local.level ?? 2}`}
      id={titleId}
      class={cn("sb-dialog-title", local.class)}
    />
  );
}

export type DialogDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function DialogDescription(props: DialogDescriptionProps) {
  const { descriptionId, registerDescription } = useDialog();
  const [local, rest] = splitProps(props, ["class"]);

  registerDescription();

  return <p {...rest} id={descriptionId} class={cn("sb-dialog-description", local.class)} />;
}

export type DialogFooterProps = JSX.HTMLAttributes<HTMLDivElement>;

export function DialogFooter(props: DialogFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-dialog-footer", local.class)} />;
}

export type DialogCloseProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function DialogClose(props: DialogCloseProps) {
  const { close } = useDialog();
  const [local, rest] = splitProps(props, ["class", "onClick"]);

  return (
    <button
      type="button"
      {...rest}
      onClick={composeHandler(
        () => local.onClick,
        (event) => close(event.currentTarget.value),
      )}
      class={cn("sb-dialog-close", local.class)}
    />
  );
}

export type DialogActionProps = ButtonProps;

export function DialogAction(props: DialogActionProps) {
  const { close } = useDialog();
  const [local, rest] = splitProps(props, ["class", "onClick"]);

  return (
    <Button
      type="button"
      {...rest}
      onClick={composeHandler(
        () => local.onClick,
        (event) => close(event.currentTarget.value),
      )}
      class={cn("sb-dialog-action", local.class)}
    />
  );
}
