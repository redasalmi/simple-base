import type { DialogOptions } from "@simple-base/contracts";
import {
  type Accessor,
  createEffect,
  createSignal,
  createUniqueId,
  type JSX,
  onCleanup,
  splitProps,
} from "solid-js";

import { Button, type ButtonProps } from "../components/Button";
import { createControllableSignal } from "./controllable";
import { composeHandler, dataAttr, mergeRefs } from "./props";
import { createRegistry } from "./registry";

export type DialogState = {
  titleId: string;
  descriptionId: string;
  contentId: string;
  hasTitle: Accessor<boolean>;
  hasDescription: Accessor<boolean>;
  registerTitle: () => void;
  registerDescription: () => void;
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  /** Closes the dialog, leaving `returnValue` on the element like a `<form method="dialog">` button. */
  close: (returnValue: string) => void;
  dialogRef: Accessor<HTMLDialogElement | null>;
  setDialogRef: (dialog: HTMLDialogElement | null) => void;
};

/** The state shared by Dialog and AlertDialog. */
export function createDialog(options: DialogOptions): DialogState {
  const [open, setOpen] = createControllableSignal({
    value: () => options.open,
    defaultValue: options.defaultOpen ?? false,
    onChange: (value) => options.onOpenChange?.(value),
  });
  const [dialogRef, setDialogRef] = createSignal<HTMLDialogElement | null>(null);
  const titles = createRegistry();
  const descriptions = createRegistry();
  const id = createUniqueId();

  return {
    titleId: `${id}-title`,
    descriptionId: `${id}-description`,
    contentId: `${id}-content`,
    hasTitle: () => titles.entries().length > 0,
    hasDescription: () => descriptions.entries().length > 0,
    registerTitle: () => titles.register(),
    registerDescription: () => descriptions.register(),
    open,
    setOpen,
    close(returnValue) {
      const dialog = dialogRef();
      if (dialog) dialog.returnValue = returnValue;
      setOpen(false);
    },
    dialogRef,
    setDialogRef,
  };
}

export type DialogTriggerBaseProps = Omit<
  ButtonProps,
  "aria-controls" | "aria-expanded" | "aria-haspopup"
>;

export function DialogTriggerBase(props: DialogTriggerBaseProps & { dialog: DialogState }) {
  const [local, rest] = splitProps(props, ["dialog", "onClick"]);
  // oxlint-disable-next-line solid/reactivity -- the dialog state object never changes
  const { contentId, open, setOpen } = local.dialog;

  return (
    <Button
      type="button"
      {...rest}
      onClick={composeHandler(
        () => local.onClick,
        () => setOpen(true),
      )}
      aria-haspopup="dialog"
      aria-controls={contentId}
      data-popup-open={dataAttr(open())}
    />
  );
}

export type DialogContentBaseProps = Omit<
  JSX.DialogHtmlAttributes<HTMLDialogElement>,
  "id" | "open" | "role" | "aria-labelledby" | "aria-describedby"
>;

export function DialogContentBase(
  props: DialogContentBaseProps & { dialog: DialogState; role?: "alertdialog" },
) {
  const [local, rest] = splitProps(props, ["dialog", "role", "ref", "onCancel", "onClose"]);
  const {
    titleId,
    descriptionId,
    contentId,
    hasTitle,
    hasDescription,
    open,
    setOpen,
    dialogRef,
    setDialogRef,
    // oxlint-disable-next-line solid/reactivity -- the dialog state object never changes
  } = local.dialog;

  createEffect(() => {
    const dialog = dialogRef();
    const nextOpen = open();
    if (!dialog?.isConnected) return;

    if (nextOpen && !dialog.open) {
      dialog.returnValue = "";
      dialog.showModal();
    }
    if (!nextOpen && dialog.open) dialog.close();
  });

  onCleanup(() => {
    // An open dialog stays in the top layer while an exit transition keeps it in the page.
    const dialog = dialogRef();
    setDialogRef(null);
    if (dialog?.open) dialog.close();
  });

  return (
    <dialog
      {...rest}
      id={contentId}
      role={local.role}
      ref={mergeRefs((element: HTMLDialogElement) => setDialogRef(element), local.ref)}
      onCancel={composeHandler(
        () => local.onCancel,
        (event) => {
          event.preventDefault();
          setOpen(false);
        },
      )}
      onClose={composeHandler(
        () => local.onClose,
        (event) => {
          // The browser fires `close` in a later task, so skip one from an element that was since
          // reopened or unmounted.
          const dialog = event.currentTarget;
          if (dialog === dialogRef() && !dialog.open) setOpen(false);
        },
      )}
      aria-labelledby={hasTitle() ? titleId : undefined}
      aria-describedby={hasDescription() ? descriptionId : undefined}
    />
  );
}
