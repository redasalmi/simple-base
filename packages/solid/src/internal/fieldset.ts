import { type Accessor, createContext, useContext } from "solid-js";

export type FieldsetContextType = {
  descriptionId: Accessor<string>;
  errorId: Accessor<string>;
  required: Accessor<boolean>;
  invalid: Accessor<boolean>;
  requiredLabel: Accessor<string>;
  registerDescription: () => void;
  registerError: () => void;
};

export const FieldsetContext = createContext<FieldsetContextType | null>(null);

export function useFieldset() {
  const context = useContext(FieldsetContext);
  if (!context) throw new Error("Fieldset parts must be used within a Fieldset");

  return context;
}
