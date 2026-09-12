import { splitProps, createContext, useContext, createUniqueId, type JSX } from "solid-js";
import { cn } from "cn";

type AlertDialogContextType = {
  titleId: string;
  descriptionId: string;
};

const AlertDialogContext = createContext<AlertDialogContextType | null>(null);

function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) throw new Error("useAlertDialog must be used within an AlertDialogRoot");

  return context;
}

export type AlertDialogRootProps = Omit<
  JSX.DialogHtmlAttributes<HTMLDialogElement>,
  "role" | "aria-labelledby" | "aria-describedby"
>;

function AlertDialogRoot(props: AlertDialogRootProps) {
  const [local, rest] = splitProps(props, ["class"]);
  const id = createUniqueId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

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
        class={cn("sb-alert-dialog", local.class)}
      />
    </AlertDialogContext.Provider>
  );
}

export type AlertDialogIconProps = JSX.HTMLAttributes<HTMLDivElement>;

function AlertDialogIcon(props: AlertDialogIconProps) {
  const [local, rest] = splitProps(props, ["class", "aria-hidden"]);

  return (
    <div
      {...rest}
      aria-hidden={local["aria-hidden"] ?? true}
      class={cn("sb-alert-dialog-icon", local.class)}
    />
  );
}

export type AlertDialogContentProps = JSX.HTMLAttributes<HTMLDivElement>;

function AlertDialogContent(props: AlertDialogContentProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-dialog-content", local.class)} />;
}

export type AlertDialogKickerProps = JSX.HTMLAttributes<HTMLParagraphElement>;

function AlertDialogKicker(props: AlertDialogKickerProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <p {...rest} class={cn("sb-alert-dialog-kicker", local.class)} />;
}

export type AlertDialogTitleProps = Omit<JSX.HTMLAttributes<HTMLHeadingElement>, "id">;

function AlertDialogTitle(props: AlertDialogTitleProps) {
  const { titleId } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class"]);

  return <h3 {...rest} id={titleId} class={cn("sb-alert-dialog-title", local.class)} />;
}

export type AlertDialogDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  const { descriptionId } = useAlertDialog();
  const [local, rest] = splitProps(props, ["class"]);

  return <p {...rest} id={descriptionId} class={cn("sb-alert-dialog-description", local.class)} />;
}

export type AlertDialogActionsProps = JSX.HTMLAttributes<HTMLDivElement>;

function AlertDialogActions(props: AlertDialogActionsProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-alert-dialog-actions", local.class)} />;
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
