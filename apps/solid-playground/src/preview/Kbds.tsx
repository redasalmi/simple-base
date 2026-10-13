import { Api, Example } from "./Preview";

export function Kbds() {
  return (
    <>
      <Example
        title="Shortcuts in text"
        description="One Kbd per key, set in the code face on a keycap. A Kbd inside a tooltip takes the tooltip's inverse colors."
        example="kbd/Shortcuts"
      />
      <Api
        rows={[
          [
            "…props",
            "HTMLAttributes<HTMLElement>",
            "Renders a kbd. Binding the keys stays in your app; menus show their shortcuts with MenuItemShortcut.",
          ],
        ]}
      />
    </>
  );
}
