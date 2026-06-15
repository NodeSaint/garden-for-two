import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Creator } from "./Creator";

describe("Creator", () => {
  it("collects names + scene and calls onCreate", async () => {
    const onCreate = vi.fn();
    render(<Creator onCreate={onCreate} now={1234} />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Sam");
    await userEvent.type(screen.getByLabelText(/their name/i), "Robin");
    await userEvent.click(screen.getByRole("button", { name: /seaside/i }));
    await userEvent.click(screen.getByRole("button", { name: /start our garden/i }));
    expect(onCreate).toHaveBeenCalledWith({ a: "Sam", b: "Robin", scene: "sea" });
  });
});
