import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { createSignal, Show } from "solid-js";
import { describe, expect, test, vi } from "vitest";
import { userEvent as browserUserEvent } from "vitest/browser";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../index";

const variants = [
  {
    name: "Dialog",
    role: "dialog",
    Root: Dialog,
    Trigger: DialogTrigger,
    Content: DialogContent,
    Title: DialogTitle,
    Description: DialogDescription,
    Dismiss: DialogClose,
    Action: DialogAction,
  },
  {
    name: "AlertDialog",
    role: "alertdialog",
    Root: AlertDialog,
    Trigger: AlertDialogTrigger,
    Content: AlertDialogContent,
    Title: AlertDialogTitle,
    Description: AlertDialogDescription,
    Dismiss: AlertDialogCancel,
    Action: AlertDialogAction,
  },
] as const;

describe.each(variants.map((variant) => [variant.name, variant] as const))(
  "%s",
  (_, { role, Root, Trigger, Content, Title, Description, Dismiss, Action }) => {
    function dialog() {
      return screen.getByRole<HTMLDialogElement>(role, { hidden: true });
    }

    // A7: the content names and describes itself only through parts that are rendered.
    test("references the title and description only while they render (A7)", () => {
      const [title, setTitle] = createSignal(false);
      const [description, setDescription] = createSignal(false);
      render(() => (
        <Root defaultOpen>
          <Content aria-label="Fallback">
            <Show when={title()}>
              <Title>Delete project?</Title>
            </Show>
            <Show when={description()}>
              <Description>This action cannot be undone.</Description>
            </Show>
          </Content>
        </Root>
      ));
      expect(dialog()).not.toHaveAttribute("aria-labelledby");
      expect(dialog()).not.toHaveAttribute("aria-describedby");

      setTitle(true);
      setDescription(true);
      expect(dialog()).toHaveAccessibleName("Delete project?");
      expect(dialog()).toHaveAccessibleDescription("This action cannot be undone.");

      setTitle(false);
      setDescription(false);
      expect(dialog()).not.toHaveAttribute("aria-labelledby");
      expect(dialog()).not.toHaveAttribute("aria-describedby");
    });

    test("closes on Escape", async () => {
      const onOpenChange = vi.fn();
      render(() => (
        <Root defaultOpen onOpenChange={onOpenChange}>
          <Content>
            <Title>Delete project?</Title>
            <Dismiss>Cancel</Dismiss>
          </Content>
        </Root>
      ));
      expect(dialog().open).toBe(true);

      // A real key press, since the browser only fires `cancel` for trusted events.
      await browserUserEvent.keyboard("{Escape}");

      expect(dialog().open).toBe(false);
      expect(onOpenChange.mock.calls).toEqual([[false]]);
    });

    test("stays open on Escape while a controlling parent keeps it open", async () => {
      const onOpenChange = vi.fn();
      render(() => (
        <Root open onOpenChange={onOpenChange}>
          <Content>
            <Title>Delete project?</Title>
            <Dismiss>Cancel</Dismiss>
          </Content>
        </Root>
      ));

      await browserUserEvent.keyboard("{Escape}");

      expect(onOpenChange.mock.calls).toEqual([[false]]);
      expect(dialog().open).toBe(true);
    });

    test("sets returnValue from the button that closed it", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn(
        (event: Event) => (event.currentTarget as HTMLDialogElement).returnValue,
      );
      render(() => (
        <Root>
          <Trigger>Open</Trigger>
          <Content onClose={onClose}>
            <Title>Delete project?</Title>
            <Dismiss value="cancel">Cancel</Dismiss>
            <Action value="confirm">Confirm</Action>
          </Content>
        </Root>
      ));

      await user.click(screen.getByRole("button", { name: "Open" }));
      await user.click(screen.getByRole("button", { name: "Confirm" }));
      expect(dialog().open).toBe(false);
      // The browser fires `close` in a later task.
      await expect.poll(() => onClose).toHaveBeenCalledTimes(1);

      await user.click(screen.getByRole("button", { name: "Open" }));
      // Opening clears the value left by the last close.
      expect(dialog().returnValue).toBe("");
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      await expect.poll(() => onClose).toHaveBeenCalledTimes(2);

      await user.click(screen.getByRole("button", { name: "Open" }));
      await browserUserEvent.keyboard("{Escape}");
      await expect.poll(() => onClose).toHaveBeenCalledTimes(3);

      expect(onClose.mock.results.map((result) => result.value)).toEqual(["confirm", "cancel", ""]);
    });

    // The `close` event of the previous close arrives after the reopen and closes the dialog again.
    // Phase 3 fixes it in R3's shared `createDialog`.
    test.fails("stays open when reopened before the last close event arrives", async () => {
      const [open, setOpen] = createSignal(true);
      render(() => (
        <Root open={open()} onOpenChange={setOpen}>
          <Content>
            <Title>Delete project?</Title>
          </Content>
        </Root>
      ));

      setOpen(false);
      setOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(dialog().open).toBe(true);
    });
  },
);
