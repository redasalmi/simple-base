import {
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  splitProps,
  useContext,
  type Accessor,
  type Setter,
  type JSX,
} from "solid-js";
import { cn } from "cn";
import { Button, type ButtonProps } from "./Button";
import { mergeWidgetProps } from "../mergeWidgetProps";

type AlertDialogContextType = {
  titleId: string;
  descriptionId: string;
  contentId: string;
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  dialogRef: Accessor<HTMLDialogElement | null>;
  setDialogRef: Setter<HTMLDialogElement | null>;
};

const AlertDialogContext = createContext<AlertDialogContextType | null>(null);

function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) throw new Error("AlertDialog parts must be used within an AlertDialog");

  return context;
}

export type AlertDialogRootProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: JSX.Element;
};

export function AlertDialog(props: AlertDialogRootProps) {
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
  } satisfies AlertDialogContextType;

  return (
    <AlertDialogContext.Provider value={context}>{props.children}</AlertDialogContext.Provider>
  );
}

export type AlertDialogTriggerProps = Omit<
  ButtonProps,
  "aria-controls" | "aria-expanded" | "aria-haspopup"
>;

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  const { contentId, open, setOpen } = useAlertDialog();
  const [local, rest] = splitProps(props, ["ref", "class", "variant", "size"]);
  const triggerProps = mergeWidgetProps(
    {
      type: "button" as const,
      onClick(event: MouseEvent) {
        if (!event.defaultPrevented) setOpen(true);
      },
    },
    rest,
  );

  return (
    <Button
      {...triggerProps}
      class={cn("sb-alert-dialog-trigger", local.class)}
      variant={local.variant}
      size={local.size}
      aria-haspopup="dialog"
      aria-controls={contentId}
      aria-expanded={open()}
      data-popup-open={open() ? "" : undefined}
      ref={(element) => {
        if (typeof local.ref === "function") local.ref(element);
      }}
    />
  );
}

export type AlertDialogContentProps = Omit<
  JSX.DialogHtmlAttributes<HTMLDialogElement>,
  "id" | "open" | "role" | "aria-labelledby" | "aria-describedby"
>;

export function AlertDialogContent(props: AlertDialogContentProps) {
  const { titleId, descriptionId, contentId, open, setOpen, dialogRef, setDialogRef } =
    useAlertDialog();
  const [local, rest] = splitProps(props, ["class", "ref"]);
  const dialogProps = mergeWidgetProps(
    {
      onCancel(event: Event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        setOpen(false);
      },
      onClose() {
        if (open()) setOpen(false);
      },
    },
    rest,
  );

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
      {...dialogProps}
      id={contentId}
      ref={(element) => {
        setDialogRef(element);
        if (typeof local.ref === "function") local.ref(element);
      }}
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      class={cn("sb-alert-dialog-content", local.class)}
    />
  );
}

export type AlertDialogIconProps = JSX.HTMLAttributes<HTMLDivElement>;

export function AlertDialogIcon(props: AlertDialogIconProps) {
  const [local, rest] = splitProps(props, ["class", "aria-hidden"]);

  return (
    <div
      {...rest}
      aria-hidden={local["aria-hidden"] ?? true}
      class={cn("sb-alert-dialog-icon", local.class)}
    />
  );
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

export type AlertDialogTitleProps = Omit<JSX.HTMLAttributes<HTMLHeadingElement>, "id">;

export function AlertDialogTitle(props: AlertDialogTitleProps) {
  const { titleId } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class"]);

  return <h3 {...rest} id={titleId} class={cn("sb-alert-dialog-title", local.class)} />;
}

export type AlertDialogDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  const { descriptionId } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class"]);

  return <p {...rest} id={descriptionId} class={cn("sb-alert-dialog-description", local.class)} />;
}

export type AlertDialogFooterProps = JSX.HTMLAttributes<HTMLDivElement>;

export function AlertDialogFooter(props: AlertDialogFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-dialog-footer", local.class)} />;
}

export type AlertDialogCancelProps = ButtonProps;

export function AlertDialogCancel(props: AlertDialogCancelProps) {
  const { dialogRef, setOpen } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class", "variant", "autofocus"]);
  const buttonProps = mergeWidgetProps(
    {
      type: "button" as const,
      onClick(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
        if (event.defaultPrevented) return;
        const dialog = dialogRef();
        if (dialog) dialog.returnValue = event.currentTarget.value;
        setOpen(false);
      },
    },
    rest,
  );

  return (
    <Button
      {...buttonProps}
      class={cn("sb-alert-dialog-cancel", local.class)}
      autofocus={local.autofocus ?? true}
      variant={local.variant ?? "secondary"}
    />
  );
}

export type AlertDialogActionProps = ButtonProps;

export function AlertDialogAction(props: AlertDialogActionProps) {
  const { dialogRef, setOpen } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class", "variant"]);
  const buttonProps = mergeWidgetProps(
    {
      type: "button" as const,
      onClick(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
        if (event.defaultPrevented) return;
        const dialog = dialogRef();
        if (dialog) dialog.returnValue = event.currentTarget.value;
        setOpen(false);
      },
    },
    rest,
  );

  return (
    <Button
      {...buttonProps}
      class={cn("sb-alert-dialog-action", local.class)}
      variant={local.variant ?? "danger"}
    />
  );
}

export type AlertDialogProps = AlertDialogRootProps;
