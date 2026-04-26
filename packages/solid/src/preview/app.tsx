import { render } from "solid-js/web";
import { Button } from "../components/Button";

const root = document.getElementById("root");

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}

render(() => <App />, root!);
