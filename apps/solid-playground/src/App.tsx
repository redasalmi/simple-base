import { Typography } from "./preview/Typography";
import { Buttons } from "./preview/Buttons";
import { Badges } from "./preview/Badges";
import { AlertDialogs } from "./preview/AlertDialogs";
import { Inputs } from "./preview/Inputs";

export default function App() {
  return (
    <div class="p-8 flex flex-col gap-8 bg-(--sb-bg-page)">
      <Typography />
      <Buttons />
      <Badges />
      <AlertDialogs />
      <Inputs />
    </div>
  );
}
