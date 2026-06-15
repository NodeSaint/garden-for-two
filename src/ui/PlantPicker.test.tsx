import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlantPicker } from "./PlantPicker";

describe("PlantPicker", () => {
  it("emits the chosen type, palette and note", async () => {
    const onPlant = vi.fn();
    render(<PlantPicker onPlant={onPlant} onCancel={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: /daisy/i }));
    await userEvent.click(screen.getByRole("button", { name: /sky/i }));
    await userEvent.type(screen.getByLabelText(/note/i), "hello you");
    await userEvent.click(screen.getByRole("button", { name: /plant it/i }));
    expect(onPlant).toHaveBeenCalledWith({ type: "daisy", palette: "sky", note: "hello you" });
  });
  it("caps the note at 80 chars via maxLength", () => {
    render(<PlantPicker onPlant={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByLabelText(/note/i)).toHaveAttribute("maxLength", "80");
  });
  it("cancels on Escape", async () => {
    const onCancel = vi.fn();
    render(<PlantPicker onPlant={vi.fn()} onCancel={onCancel} />);
    await userEvent.keyboard("{Escape}");
    expect(onCancel).toHaveBeenCalled();
  });
});
