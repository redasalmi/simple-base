import type { JSX } from "solid-js";

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button {...props} />;
}
