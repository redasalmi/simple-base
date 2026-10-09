import type { CheckboxGroupOptions } from "@simple-base/contracts";
import { mergeProps } from "@zag-js/solid";
import { type Accessor, createContext, type JSX, splitProps, useContext } from "solid-js";

import { cn } from "../cn";
import { Checkbox, type CheckboxProps } from "./Checkbox";
import { useFieldset } from "./Fieldset";

type CheckboxGroupContextType = {
  name: Accessor<string | undefined>;
  value: Accessor<string[] | undefined>;
  defaultValue: Accessor<string[] | undefined>;
  toggle: () => void;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null);

function useCheckboxGroup() {
  const context = useContext(CheckboxGroupContext);
  if (!context) throw new Error("CheckboxGroupItem must be used within a CheckboxGroup");

  return context;
}

export type CheckboxGroupRootProps = CheckboxGroupOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof CheckboxGroupOptions | "children">;

export function CheckboxGroup(props: CheckboxGroupRootProps) {
  useFieldset();
  const [local, rest] = splitProps(props, [
    "ref",
    "class",
    "children",
    "name",
    "value",
    "defaultValue",
    "onValueChange",
  ]);
  let list: HTMLDivElement | undefined;

  const context = {
    name: () => local.name,
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    // Read the checked boxes from the DOM so controlled and uncontrolled groups report the same way.
    toggle() {
      if (!list || !local.onValueChange) return;
      const boxes = list.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
      local.onValueChange(
        Array.from(boxes)
          .filter((box) => box.checked)
          .map((box) => box.value),
      );
    },
  } satisfies CheckboxGroupContextType;

  return (
    <CheckboxGroupContext.Provider value={context}>
      <div
        {...rest}
        class={cn("sb-choice-list", local.class)}
        ref={(element) => {
          list = element;
          if (typeof local.ref === "function") local.ref(element);
        }}
      >
        {local.children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

type CheckboxGroupOwnedProps = "name" | "checked" | "defaultChecked" | "aria-invalid";

// JSX accepts any hyphenated attribute that a type omits, so aria-* must be typed as never to be rejected.
export type CheckboxGroupItemProps = Omit<
  CheckboxProps,
  CheckboxGroupOwnedProps | "value" | "children"
> & {
  [Key in CheckboxGroupOwnedProps]?: never;
} & {
  value: string;
  /** The option's label, rendered beside the checkbox. */
  children?: JSX.Element;
};

export function CheckboxGroupItem(props: CheckboxGroupItemProps) {
  const fieldset = useFieldset();
  const group = useCheckboxGroup();
  const [local, rest] = splitProps(props, ["class", "children", "value"]);
  const selection = {
    onChange: () => group.toggle(),
  };

  return (
    <label class={cn("sb-choice", local.class)}>
      <Checkbox
        {...mergeProps(selection, rest)}
        name={group.name()}
        value={local.value}
        checked={group.value()?.includes(local.value)}
        defaultChecked={group.defaultValue()?.includes(local.value) ?? false}
        aria-invalid={fieldset.invalid() || undefined}
      />
      <span>{local.children}</span>
    </label>
  );
}
