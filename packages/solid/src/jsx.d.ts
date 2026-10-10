// Types the `prop:`, `attr:`, and `bool:` props the components use. Nothing public imports this
// file, so the augmentation stays out of the published declarations.
// oxlint-disable-next-line unicorn/require-module-specifiers -- makes this declaration file a module
export {};

declare module "solid-js" {
  namespace JSX {
    interface ExplicitProperties {
      defaultValue: string;
    }
    interface ExplicitAttributes {
      value: string;
    }
    interface ExplicitBoolAttributes {
      checked: boolean;
      selected: boolean;
    }
  }
}
