import type { Placement } from "./placement";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectOptions = {
  id: string;
  label: string;
  name?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  placement?: Placement;
  onValueChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
};
