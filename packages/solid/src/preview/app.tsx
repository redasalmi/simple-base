import { render } from "solid-js/web";
import { Button } from "../components/Button";
import "./tailwind.css";
import "@simple-base/css";

const root = document.getElementById("root");

function App() {
  return (
    <div class="p-8">
      <div class="flex flex-col gap-4">
        <h1>Buttons</h1>
        <div class="grid grid-cols-3 gap-4">
          <Button variant="primary" size="small">
            Primary Small
          </Button>
          <Button variant="secondary" size="small">
            Secondary Small
          </Button>
          <Button variant="tertiary" size="small">
            Tertiary Small
          </Button>
          <Button variant="primary" size="medium">
            Primary Medium
          </Button>
          <Button variant="secondary" size="medium">
            Secondary Medium
          </Button>
          <Button variant="tertiary" size="medium">
            Tertiary Medium
          </Button>
          <Button variant="primary" size="large">
            Primary Large
          </Button>
          <Button variant="secondary" size="large">
            Secondary Large
          </Button>
          <Button variant="tertiary" size="large">
            Tertiary Large
          </Button>
        </div>
      </div>
    </div>
  );
}

render(() => <App />, root!);
