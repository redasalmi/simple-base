import { splitProps, type JSX } from "solid-js";
import { cn } from "../cn";

type InputType = "text" | "email" | "password" | "search" | "tel" | "url";

export type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  type?: InputType;
};

export function Input(props: InputProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <input {...rest} class={cn("sb-input", local.class)} />;
}
