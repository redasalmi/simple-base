export type ComboboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ComboboxOptions = {
  id: string;
  label: string;
  placeholder?: string;
  options: ComboboxOption[];
  onValueChange: (value: string) => void;
};
