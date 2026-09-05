import { splitProps, createContext, useContext, createUniqueId, type JSX } from "solid-js";
import { cn } from "cn";

type AlertDialogContextType = {
  titleId: string;
  descriptionId: string;
};

const AlertDialogContext = createContext<AlertDialogContextType | null>(null);

const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) throw new Error("useAlertDialog must be used within an AlertDialogRoot");

  return context;
};

export type AlertDialogRootProps = Omit<
  JSX.DialogHtmlAttributes<HTMLDialogElement>,
  "role" | "aria-labelledby" | "aria-describedby"
>;

function AlertDialogRoot(props: AlertDialogRootProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);
  const titleId = createUniqueId();
  const descriptionId = createUniqueId();

  return (
    <AlertDialogContext.Provider
      value={{
        titleId,
        descriptionId,
      }}
    >
      <dialog
        {...rest}
        role="alertdialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        class={cn("sb-alert-dialog", className)}
      />
    </AlertDialogContext.Provider>
  );
}

export type AlertDialogIconProps = JSX.HTMLAttributes<HTMLDivElement>;

function AlertDialogIcon(props: AlertDialogIconProps) {
  const [{ class: className, "aria-hidden": ariaHidden = true }, rest] = splitProps(props, [
    "class",
    "aria-hidden",
  ]);

  return <div {...rest} aria-hidden={ariaHidden} class={cn("sb-alert-dialog-icon", className)} />;
}

export type AlertDialogContentProps = JSX.HTMLAttributes<HTMLDivElement>;

function AlertDialogContent(props: AlertDialogContentProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-dialog-content", className)} />;
}

export type AlertDialogKickerProps = JSX.HTMLAttributes<HTMLParagraphElement>;

function AlertDialogKicker(props: AlertDialogKickerProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <p {...rest} class={cn("sb-alert-dialog-kicker", className)} />;
}

export type AlertDialogTitleProps = Omit<JSX.HTMLAttributes<HTMLHeadingElement>, "id">;

function AlertDialogTitle(props: AlertDialogTitleProps) {
  const { titleId } = useAlertDialog();
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <h3 {...rest} id={titleId} class={cn("sb-alert-dialog-title", className)} />;
}

export type AlertDialogDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  const { descriptionId } = useAlertDialog();
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <p {...rest} id={descriptionId} class={cn("sb-alert-dialog-description", className)} />;
}

export type AlertDialogActionsProps = JSX.HTMLAttributes<HTMLDivElement>;

function AlertDialogActions(props: AlertDialogActionsProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-dialog-actions", className)} />;
}

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Icon: AlertDialogIcon,
  Content: AlertDialogContent,
  Kicker: AlertDialogKicker,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Actions: AlertDialogActions,
});

export type AlertDialogProps = AlertDialogRootProps;
