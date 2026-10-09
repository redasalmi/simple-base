import {
  splitProps,
  createMemo,
  createUniqueId,
  useContext,
  createContext,
  type JSX,
  type Accessor,
} from "solid-js";
import { cn } from "../cn";
import * as tabs from "@zag-js/tabs";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import type { TabsOptions } from "@simple-base/contracts";

type TabsContextType = {
  api: Accessor<tabs.Api>;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs parts must be used within a Tabs");

  return context;
}

export type TabsRootProps = TabsOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof TabsOptions | "id" | "children">;

export function Tabs(props: TabsRootProps) {
  const [local, rest] = splitProps(props, ["children", "value", "defaultValue", "onValueChange"]);

  const service = useMachine(tabs.machine, {
    id: createUniqueId(),
    get value() {
      return local.value;
    },
    get defaultValue() {
      return local.defaultValue;
    },
    onValueChange({ value }) {
      local.onValueChange?.(value);
    },
  });

  const api = createMemo(() => tabs.connect(service, normalizeProps));

  return (
    <TabsContext.Provider value={{ api }}>
      <div {...mergeProps(api().getRootProps(), rest)}>{local.children}</div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "role">;

export function TabsList(props: TabsListProps) {
  const { api } = useTabs();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...mergeProps(api().getListProps(), rest)} class={cn("sb-tabs", local.class)}>
      {local.children}
    </div>
  );
}

export type TabsTriggerProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "type" | "role" | "value" | "disabled" | "tabIndex"
> & {
  /** Unique within the tabs; matches the `value` of its `TabsContent`. */
  value: string;
  disabled?: boolean;
};

export function TabsTrigger(props: TabsTriggerProps) {
  const { api } = useTabs();
  const [local, rest] = splitProps(props, ["class", "value", "disabled", "children"]);

  return (
    <button
      {...mergeProps(api().getTriggerProps({ value: local.value, disabled: local.disabled }), rest)}
      class={cn("sb-tab", local.class)}
    >
      {local.children}
    </button>
  );
}

export type TabsContentProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "id" | "role" | "hidden" | "tabIndex"
> & {
  value: string;
};

export function TabsContent(props: TabsContentProps) {
  const { api } = useTabs();
  const [local, rest] = splitProps(props, ["class", "value", "children"]);

  return (
    <div
      {...mergeProps(api().getContentProps({ value: local.value }), rest)}
      class={cn("sb-tab-panel", local.class)}
    >
      {local.children}
    </div>
  );
}
