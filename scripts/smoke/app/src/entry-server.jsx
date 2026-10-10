import { generateHydrationScript, renderToString } from "solid-js/web";

import { App } from "./App.jsx";

export function render() {
  return { head: generateHydrationScript(), html: renderToString(() => <App />) };
}
