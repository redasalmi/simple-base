import "@simple-base/css";
import { hydrate, render } from "solid-js/web";

import { App } from "./App.jsx";

const root = document.getElementById("app");

if (import.meta.env.MODE === "ssr") hydrate(() => <App />, root);
else render(() => <App />, root);
