import type { Accessor } from "solid-js";

import { createRequiredContext } from "./context";
import type { Messages } from "./messages";

export type FieldsetContextType = Messages & {
  required: Accessor<boolean>;
  requiredLabel: Accessor<string>;
};

export const [FieldsetProvider, useFieldset] =
  createRequiredContext<FieldsetContextType>("Fieldset");
