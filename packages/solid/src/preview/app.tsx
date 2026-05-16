import { render } from "solid-js/web";
import { Buttons } from "./Buttons";
import "./tailwind.css";
import "@simple-base/css";

const root = document.getElementById("root");

function App() {
  return (
    <div class="p-8">
      <Buttons />
    </div>
  );
}

render(() => <App />, root!);
