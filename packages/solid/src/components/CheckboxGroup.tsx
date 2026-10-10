import type { CheckboxGroupOptions } from "@simple-base/contracts";
import { type Accessor, type JSX, splitProps } from "solid-js";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import { useFieldset } from "../internal/fieldset";
import { ariaInvalid, composeHandler, mergeRefs, type WithoutOwnedProps } from "../internal/props";
import { Checkbox, type CheckboxProps } from "./Checkbox";

type CheckboxGroupContextType = {
  name: Accessor<string | undefined>;
  value: Accessor<string[] | undefined>;
  defaultValue: Accessor<string[] | undefined>;
  toggle: () => void;
};

const [CheckboxGroupProvider, useCheckboxGroup] =
  createRequiredContext<CheckboxGroupContextType>("CheckboxGroup");

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
      if (!list) return;
      const boxes = Array.from(list.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
      local.onValueChange?.(boxes.filter((box) => box.checked).map((box) => box.value));
      // The browser toggles the box before the parent responds; if the parent kept its value, Solid has nothing to write back.
      const value = local.value;
      if (value === undefined) return;
      for (const box of boxes) box.checked = value.includes(box.value);
    },
  } satisfies CheckboxGroupContextType;

  return (
    <CheckboxGroupProvider value={context}>
      <div
        {...rest}
        class={cn("sb-choice-list", local.class)}
        ref={mergeRefs((element: HTMLDivElement) => (list = element), local.ref)}
      >
        {local.children}
      </div>
    </CheckboxGroupProvider>
  );
}

type CheckboxGroupOwnedProps = "name" | "checked" | "defaultChecked" | "aria-invalid";

export type CheckboxGroupItemProps = WithoutOwnedProps<
  Omit<CheckboxProps, "value" | "children">,
  CheckboxGroupOwnedProps
> & {
  value: string;
  /** The option's label, rendered beside the checkbox. */
  children?: JSX.Element;
};

export function CheckboxGroupItem(props: CheckboxGroupItemProps) {
  const fieldset = useFieldset();
  const group = useCheckboxGroup();
  const [local, rest] = splitProps(props, ["class", "children", "value", "onChange"]);

  return (
    <label class={cn("sb-choice", local.class)}>
      <Checkbox
        {...rest}
        onChange={composeHandler(
          () => local.onChange,
          () => group.toggle(),
        )}
        name={group.name()}
        value={local.value}
        checked={group.value()?.includes(local.value)}
        defaultChecked={group.defaultValue()?.includes(local.value) ?? false}
        aria-invalid={ariaInvalid(fieldset.invalid())}
      />
      <span>{local.children}</span>
    </label>
  );
}
