import { render } from "solid-js/web";
import { Typography } from "./Typography";
import { Buttons } from "./Buttons";
import "./tailwind.css";

const root = document.getElementById("root");

function App() {
  return (
    <div class="p-8 flex flex-col gap-8 bg-(--sb-bg-page)">
      <Typography />
      <Buttons />
    </div>
  );
}

render(() => <App />, root!);
