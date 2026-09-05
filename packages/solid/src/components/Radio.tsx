import { splitProps, type JSX } from "solid-js";
import { cn } from "cn";

export type RadioProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">;

export function Radio(props: RadioProps) {
  const [{ class: className }, rest] = splitProps(props, ["class"]);

  return <input {...rest} type="radio" class={cn("sb-radio", className)} />;
}
