import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShareSheet } from "./ShareSheet";

describe("ShareSheet", () => {
  beforeEach(() => { Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } }); });
  it("copies the link and shows confirmation", async () => {
    render(<ShareSheet url="https://x.dev/#g=abc" />);
    await userEvent.click(screen.getByRole("button", { name: /copy link/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https://x.dev/#g=abc");
    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });
  it("shows a manual-copy hint when clipboard fails", async () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("no")) } });
    render(<ShareSheet url="https://x.dev/#g=abc" />);
    await userEvent.click(screen.getByRole("button", { name: /copy link/i }));
    expect(await screen.findByText(/copy it manually/i)).toBeInTheDocument();
  });
});
