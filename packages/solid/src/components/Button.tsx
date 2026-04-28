import { splitProps, type JSX } from "solid-js";
import { cn } from "../utils";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button(props: ButtonProps) {
  const [{ class: className, variant = "primary", size = "medium" }, rest] = splitProps(props, [
    "class",
    "variant",
    "size",
  ]);

  return (
    <button {...rest} class={cn(className, "button")} data-variant={variant} data-size={size} />
  );
}
