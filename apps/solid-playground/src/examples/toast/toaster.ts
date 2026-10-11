import { createToaster } from "@simple-base/solid";

// One toaster for the whole app. Render it once with <Toaster>, then call it from anywhere.
export const toaster = createToaster({ max: 3 });
