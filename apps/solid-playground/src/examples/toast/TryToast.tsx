import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  ToastIcon,
  ToastTitle,
} from "@simple-base/solid";

import { CheckIcon, CloseIcon } from "../icons";
import { toaster } from "./toaster";

export default function TryToast() {
  return (
    <>
      <div class="preview-row">
        <Button
          variant="secondary"
          onClick={() =>
            toaster.create({
              title: "Changes saved",
              description: "Your preferences are up to date.",
            })
          }
        >
          Save changes
        </Button>
        <Button
          variant="ghost"
          onClick={() => toaster.create({ title: "Link copied to clipboard" })}
        >
          Copy link
        </Button>
      </div>
      {/* The other toast examples on this page show their toasts here too. */}
      <Toaster toaster={toaster}>
        {() => (
          <Toast>
            <ToastIcon>
              <CheckIcon />
            </ToastIcon>
            <ToastContent>
              <ToastTitle />
              <ToastDescription />
              <ToastAction />
            </ToastContent>
            <ToastClose>
              <CloseIcon />
            </ToastClose>
          </Toast>
        )}
      </Toaster>
    </>
  );
}
