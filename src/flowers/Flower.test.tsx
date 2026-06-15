import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flower } from "./Flower";
import type { Plant } from "../state/types";

const plant: Plant = { id: "p1", type: "tulip", palette: "rose", x: 1, y: 1, stage: 3, by: "a", note: "hi", t: 1 };

describe("Flower", () => {
  it("renders a tappable button and fires onTap", async () => {
    const onTap = vi.fn();
    render(<Flower plant={plant} onTap={onTap} />);
    await userEvent.click(screen.getByRole("button", { name: /flower/i }));
    expect(onTap).toHaveBeenCalledWith("p1");
  });
});
