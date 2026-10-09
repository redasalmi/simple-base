import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import {
  createToaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  type ToasterOptions,
  ToastTitle,
} from "../index";

function renderToaster(options: ToasterOptions = {}) {
  const toaster = createToaster(options);
  render(() => (
    <Toaster toaster={toaster}>
      {() => (
        <Toast>
          <ToastContent>
            <ToastTitle />
            <ToastDescription />
            <ToastAction />
          </ToastContent>
          <ToastClose>×</ToastClose>
        </Toast>
      )}
    </Toaster>
  ));

  return {
    toaster,
    titles: () =>
      [...document.querySelectorAll(".sb-toast-title")].map((title) => title.textContent),
  };
}

describe("Toast", () => {
  test("shows the title, description, and status", async () => {
    const { toaster } = renderToaster();

    toaster.create({ title: "Project archived", description: "Moved to the archive." });
    toaster.create({ title: "Storage almost full", status: "warning" });

    const archived = (await screen.findByText("Project archived")).closest(".sb-toast");
    expect(archived).toHaveAttribute("data-status", "success");
    expect(screen.getByText("Moved to the archive.").closest(".sb-toast")).toBe(archived);
    const warning = screen.getByText("Storage almost full").closest(".sb-toast");
    expect(warning).toHaveAttribute("data-status", "warning");
    expect(warning?.querySelector(".sb-toast-description")).toBeNull();
  });

  test("updates the toast with the same id", async () => {
    const { toaster, titles } = renderToaster();

    const id = toaster.create({ id: "save", title: "Saving" });
    await screen.findByText("Saving");
    expect(toaster.create({ id, title: "Saved" })).toBe("save");

    await expect.poll(titles).toEqual(["Saved"]);
  });

  test("dismisses one toast by id, or every toast", async () => {
    const { toaster, titles } = renderToaster();

    const first = toaster.create({ title: "First" });
    toaster.create({ title: "Second" });
    toaster.create({ title: "Third" });
    await expect.poll(() => titles().length).toBe(3);

    toaster.dismiss(first);
    await expect.poll(titles).not.toContain("First");
    expect(titles()).toHaveLength(2);

    toaster.dismiss();
    await expect.poll(titles).toEqual([]);
  });

  test("queues toasts beyond `max` until one is dismissed", async () => {
    const { toaster, titles } = renderToaster({ max: 1 });

    const first = toaster.create({ title: "First" });
    const queued = toaster.create({ title: "Queued" });
    await expect.poll(titles).toEqual(["First"]);

    // A queued toast ignores dismiss(id) until it is shown.
    toaster.dismiss(queued);
    toaster.dismiss(first);

    await expect.poll(titles).toEqual(["Queued"]);
  });

  test("dismisses itself after `duration`", async () => {
    const { toaster, titles } = renderToaster({ duration: 50 });

    toaster.create({ title: "Saved" });
    await expect.poll(titles).toEqual(["Saved"]);

    await expect.poll(titles).toEqual([]);
  });

  // A10: keyboard and screen reader users may not reach an action before a timeout.
  test("keeps a toast with an action until it is dismissed (A10)", async () => {
    const { toaster, titles } = renderToaster({ duration: 50 });

    toaster.create({ title: "Archived", action: { label: "Undo", onClick: () => {} } });
    toaster.create({ title: "Saved" });
    await expect.poll(titles).toEqual(["Archived"]);
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(titles()).toEqual(["Archived"]);
  });

  test("keeps a toast with `duration: Infinity`", async () => {
    const { toaster, titles } = renderToaster({ duration: 50 });

    toaster.create({ title: "Pinned", duration: Infinity });
    toaster.create({ title: "Saved" });
    await expect.poll(titles).toEqual(["Pinned"]);
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(titles()).toEqual(["Pinned"]);
  });

  test("still times out a toast with an action and an explicit `duration`", async () => {
    const { toaster, titles } = renderToaster();

    toaster.create({
      title: "Archived",
      duration: 50,
      action: { label: "Undo", onClick: () => {} },
    });
    await expect.poll(titles).toEqual(["Archived"]);

    await expect.poll(titles).toEqual([]);
  });

  test("runs the action, then dismisses the toast", async () => {
    const user = userEvent.setup();
    const { toaster, titles } = renderToaster();
    const onClick = vi.fn();

    toaster.create({ title: "Archived", action: { label: "Undo", onClick } });
    await user.click(await screen.findByRole("button", { name: "Undo" }));

    expect(onClick).toHaveBeenCalledOnce();
    await expect.poll(titles).toEqual([]);
  });

  test("closes from the close button", async () => {
    const user = userEvent.setup();
    const { toaster, titles } = renderToaster();

    toaster.create({ title: "Saved" });
    await user.click(await screen.findByRole("button", { name: "Dismiss notification" }));

    await expect.poll(titles).toEqual([]);
  });
});
