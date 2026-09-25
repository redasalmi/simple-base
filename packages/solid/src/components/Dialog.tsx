import {
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  splitProps,
  useContext,
  type Accessor,
  type JSX,
  type Setter,
} from "solid-js";
import { cn } from "../cn";
import type { DialogOptions } from "@simple-base/contracts";
import { Button, type ButtonProps } from "./Button";
import { mergeWidgetProps } from "../mergeWidgetProps";

type DialogContextType = {
  titleId: string;
  descriptionId: string;
  contentId: string;
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  dialogRef: Accessor<HTMLDialogElement | null>;
  setDialogRef: Setter<HTMLDialogElement | null>;
};

const DialogContext = createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Dialog parts must be used within a Dialog");

  return context;
}

export type DialogRootProps = DialogOptions & {
  children: JSX.Element;
};

export function Dialog(props: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = createSignal(props.defaultOpen ?? false);
  const [dialogRef, setDialogRef] = createSignal<HTMLDialogElement | null>(null);
  const id = createUniqueId();

  const open = () => props.open ?? uncontrolledOpen();
  const setOpen = (nextOpen: boolean) => {
    if (open() === nextOpen) return;
    if (props.open === undefined) setUncontrolledOpen(nextOpen);
    props.onOpenChange?.(nextOpen);
  };

  const context = {
    titleId: `${id}-title`,
    descriptionId: `${id}-description`,
    contentId: `${id}-content`,
    open,
    setOpen,
    dialogRef,
    setDialogRef,
  } satisfies DialogContextType;

  return <DialogContext.Provider value={context}>{props.children}</DialogContext.Provider>;
}

export type DialogTriggerProps = Omit<
  ButtonProps,
  "aria-controls" | "aria-expanded" | "aria-haspopup"
>;

export function DialogTrigger(props: DialogTriggerProps) {
  const { contentId, open, setOpen } = useDialog();
  const [local, rest] = splitProps(props, ["ref", "class", "variant", "size", "children"]);
  const triggerBehavior = {
    type: "button" as const,
    onClick(event: MouseEvent) {
      if (!event.defaultPrevented) setOpen(true);
    },
  };

  return (
    <Button
      {...mergeWidgetProps(triggerBehavior, rest)}
      class={cn("sb-dialog-trigger", local.class)}
      variant={local.variant}
      size={local.size}
      aria-haspopup="dialog"
      aria-controls={contentId}
      aria-expanded={open()}
      data-popup-open={open() ? "" : undefined}
      ref={(element) => {
        if (typeof local.ref === "function") local.ref(element);
      }}
    >
      {local.children}
    </Button>
  );
}

export type DialogContentProps = Omit<
  JSX.DialogHtmlAttributes<HTMLDialogElement>,
  "id" | "open" | "role" | "aria-labelledby" | "aria-describedby"
>;

export function DialogContent(props: DialogContentProps) {
  const { titleId, descriptionId, contentId, open, setOpen, dialogRef, setDialogRef } = useDialog();
  const [local, rest] = splitProps(props, ["class", "ref", "children"]);
  const dialogBehavior = {
    onCancel(event: Event) {
      if (event.defaultPrevented) return;
      event.preventDefault();
      setOpen(false);
    },
    onClose() {
      if (open()) setOpen(false);
    },
  };

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

  onCleanup(() => setDialogRef(null));

  return (
    <dialog
      {...mergeWidgetProps(dialogBehavior, rest)}
      id={contentId}
      ref={(element) => {
        setDialogRef(element);
        if (typeof local.ref === "function") local.ref(element);
      }}
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      class={cn("sb-dialog-content", local.class)}
    >
      {local.children}
    </dialog>
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

export type DialogTitleProps = Omit<JSX.HTMLAttributes<HTMLHeadingElement>, "id">;

export function DialogTitle(props: DialogTitleProps) {
  const { titleId } = useDialog();
  const [local, rest] = splitProps(props, ["class"]);

  return <h2 {...rest} id={titleId} class={cn("sb-dialog-title", local.class)} />;
}

export type DialogDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function DialogDescription(props: DialogDescriptionProps) {
  const { descriptionId } = useDialog();
  const [local, rest] = splitProps(props, ["class"]);

  return <p {...rest} id={descriptionId} class={cn("sb-dialog-description", local.class)} />;
}

export type DialogFooterProps = JSX.HTMLAttributes<HTMLDivElement>;

export function DialogFooter(props: DialogFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-dialog-footer", local.class)} />;
}

export type DialogCloseProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function DialogClose(props: DialogCloseProps) {
  const { dialogRef, setOpen } = useDialog();
  const [local, rest] = splitProps(props, ["ref", "class", "children"]);
  const buttonBehavior = {
    type: "button" as const,
    onClick(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
      if (event.defaultPrevented) return;
      const dialog = dialogRef();
      if (dialog) dialog.returnValue = event.currentTarget.value;
      setOpen(false);
    },
  };

  return (
    <button
      {...mergeWidgetProps(buttonBehavior, rest)}
      class={cn("sb-dialog-close", local.class)}
      ref={(element) => {
        if (typeof local.ref === "function") local.ref(element);
      }}
    >
      {local.children}
    </button>
  );
}

export type DialogActionProps = ButtonProps;

export function DialogAction(props: DialogActionProps) {
  const { dialogRef, setOpen } = useDialog();
  const [local, rest] = splitProps(props, ["ref", "class", "variant", "children"]);
  const buttonBehavior = {
    type: "button" as const,
    onClick(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
      if (event.defaultPrevented) return;
      const dialog = dialogRef();
      if (dialog) dialog.returnValue = event.currentTarget.value;
      setOpen(false);
    },
  };

  return (
    <Button
      {...mergeWidgetProps(buttonBehavior, rest)}
      class={cn("sb-dialog-action", local.class)}
      variant={local.variant}
      ref={(element) => {
        if (typeof local.ref === "function") local.ref(element);
      }}
    >
      {local.children}
    </Button>
  );
}

export type DialogProps = DialogRootProps;
