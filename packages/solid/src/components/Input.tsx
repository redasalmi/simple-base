import { splitProps, type JSX } from "solid-js";
import { cn } from "cn";

type InputElement = JSX.InputHTMLAttributes<HTMLInputElement>;
type InputType = Exclude<InputElement["type"], "radio" | "checkbox">;

export type InputProps = Omit<InputElement, "type"> & {
  type?: InputType;
};

export function Input(props: InputProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <input {...rest} class={cn("sb-input", className)} />;
}
