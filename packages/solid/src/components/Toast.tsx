import {
  createContext,
  createMemo,
  createUniqueId,
  onCleanup,
  onMount,
  splitProps,
  useContext,
  Show,
  type Accessor,
  type JSX,
} from "solid-js";
import { cn } from "../cn";
import * as toast from "@zag-js/toast";
import { Key, normalizeProps, useMachine } from "@zag-js/solid";
import { toastDefaults, type Placement, type ToastOptions } from "@simple-base/contracts";
import { Button, type ButtonProps } from "./Button";
import { mergeWidgetProps } from "../mergeWidgetProps";

export type ToasterOptions = {
  /** @default "bottom-end" */
  placement?: Placement;
  /** Default time in milliseconds before a toast dismisses itself. @default 5000 */
  duration?: number;
};

export type ToastCreateOptions = ToastOptions & {
  id?: string;
  title: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
};

export type ToasterApi = {
  /** Shows a toast, or updates the toast with the same `id`, and returns its id. */
  create: (options: ToastCreateOptions) => string;
  /** Dismisses one toast, or every toast when `id` is omitted. */
  dismiss: (id?: string) => void;
};

const stores = new WeakMap<ToasterApi, toast.Store>();

export function createToaster(options: ToasterOptions = {}): ToasterApi {
  const store = toast.createStore({
    placement: options.placement ?? "bottom-end",
    // Zag's queue ignores dismiss and id updates, so never queue.
    max: Infinity,
    duration: options.duration ?? 5000,
  });
  const toaster: ToasterApi = {
    create: ({ status = toastDefaults.status, ...options }) =>
      store.create({ ...options, type: status }),
    dismiss: (id) => store.dismiss(id),
  };
  stores.set(toaster, store);

  return toaster;
}

type ToastContextType = {
  api: Accessor<toast.Api>;
  toast: Accessor<toast.Props>;
  service: toast.Service;
};

const ToastContext = createContext<ToastContextType | null>(null);

function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("Toast parts must be used within a Toaster");

  return context;
}

export type ToasterProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "id" | "role" | "style" | "tabIndex" | "children"
> & {
  toaster: ToasterApi;
  /** Accessible name of the notification region. @default "Notifications" */
  label?: string;
  /** Renders each toast. */
  children: () => JSX.Element;
};

export function Toaster(props: ToasterProps) {
  const [local, rest] = splitProps(props, ["class", "children", "toaster", "label"]);
  const store = stores.get(local.toaster);
  if (!store) throw new Error("Toaster requires a toaster created with createToaster");

  const service = useMachine(toast.group.machine, { id: createUniqueId(), store });
  const api = createMemo(() => toast.group.connect(service, normalizeProps));

  return (
    <div
      {...mergeWidgetProps(api().getGroupProps({ label: local.label }), rest)}
      class={cn("sb-toaster", local.class)}
    >
      <Key each={api().getToasts()} by="id">
        {(toast, index) => (
          <ToastProvider toast={toast} index={index} parent={service}>
            {local.children}
          </ToastProvider>
        )}
      </Key>
    </div>
  );
}

type ToastProviderProps = {
  toast: Accessor<toast.Props>;
  index: Accessor<number>;
  parent: toast.GroupService;
  children: () => JSX.Element;
};

function ToastProvider(props: ToastProviderProps) {
  const service = useMachine(toast.machine, () => ({
    ...props.toast(),
    parent: props.parent,
    index: props.index(),
  }));
  const api = createMemo(() => toast.connect(service, normalizeProps));

  return (
    <ToastContext.Provider value={{ api, toast: props.toast, service }}>
      {props.children()}
    </ToastContext.Provider>
  );
}

export type ToastProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "id" | "role" | "style" | "tabIndex"
>;

export function Toast(props: ToastProps) {
  const { api, service } = useToast();
  const [local, rest] = splitProps(props, ["ref", "class", "children"]);
  let root: HTMLDivElement | undefined;

  // Zag only remeasures on content mutations; text also rewraps when the width changes.
  onMount(() => {
    if (!root) return;
    const element = root;
    let width = element.offsetWidth;
    const observer = new ResizeObserver(() => {
      if (element.offsetWidth === width) return;
      width = element.offsetWidth;
      service.send({ type: "MEASURE" });
    });
    observer.observe(element);
    onCleanup(() => observer.disconnect());
  });

  return (
    <div
      {...mergeWidgetProps(api().getRootProps(), rest)}
      ref={(element) => {
        root = element;
        if (typeof local.ref === "function") local.ref(element);
      }}
      class={cn("sb-toast", local.class)}
      data-status={api().type}
    >
      <div {...api().getGhostBeforeProps()} />
      {local.children}
      <div {...api().getGhostAfterProps()} />
    </div>
  );
}

export type ToastIconProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "aria-hidden">;

export function ToastIcon(props: ToastIconProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <span {...rest} aria-hidden="true" class={cn("sb-toast-icon", local.class)} />;
}

export type ToastContentProps = JSX.HTMLAttributes<HTMLDivElement>;

export function ToastContent(props: ToastContentProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-toast-content", local.class)} />;
}

export type ToastTitleProps = Omit<JSX.HTMLAttributes<HTMLElement>, "id" | "children">;

export function ToastTitle(props: ToastTitleProps) {
  const { api } = useToast();
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <strong
      {...mergeWidgetProps(api().getTitleProps(), rest)}
      class={cn("sb-toast-title", local.class)}
    >
      {api().title}
    </strong>
  );
}

export type ToastDescriptionProps = Omit<
  JSX.HTMLAttributes<HTMLParagraphElement>,
  "id" | "children"
>;

export function ToastDescription(props: ToastDescriptionProps) {
  const { api } = useToast();
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Show when={api().description}>
      <p
        {...mergeWidgetProps(api().getDescriptionProps(), rest)}
        class={cn("sb-toast-description", local.class)}
      >
        {api().description}
      </p>
    </Show>
  );
}

export type ToastActionProps = Omit<ButtonProps, "type" | "children">;

export function ToastAction(props: ToastActionProps) {
  const { api, toast } = useToast();
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);

  return (
    <Show when={toast().action}>
      {(action) => (
        <Button
          {...mergeWidgetProps(api().getActionTriggerProps(), rest)}
          class={cn("sb-toast-action", local.class)}
          variant={local.variant ?? "secondary"}
          size={local.size ?? "small"}
        >
          {action().label}
        </Button>
      )}
    </Show>
  );
}

export type ToastCloseProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "id" | "type">;

export function ToastClose(props: ToastCloseProps) {
  const { api } = useToast();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <button
      {...mergeWidgetProps(api().getCloseTriggerProps(), rest)}
      class={cn("sb-toast-close", local.class)}
    >
      {local.children}
    </button>
  );
}
