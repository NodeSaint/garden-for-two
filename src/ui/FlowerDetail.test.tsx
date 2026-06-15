import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlowerDetail } from "./FlowerDetail";
import type { Plant } from "../state/types";

const plant: Plant = { id: "p1", type: "rose", palette: "rose", x: 0, y: 0, stage: 3, by: "a", note: "for you", t: 1700000000000 };
const sprout: Plant = { ...plant, id: "p2", stage: 1 };

describe("FlowerDetail", () => {
  it("shows the note and who planted it", () => {
    render(<FlowerDetail plant={plant} names={{ a: "Sam", b: "Robin" }} onClose={vi.fn()} />);
    expect(screen.getByText(/for you/)).toBeInTheDocument();
    expect(screen.getByText(/Sam/)).toBeInTheDocument();
  });

  it("waters the flower when canWater and onWater are given and stage < max", async () => {
    const onWater = vi.fn();
    const onClose = vi.fn();
    render(<FlowerDetail plant={sprout} names={{ a: "Sam", b: "Robin" }} onClose={onClose} canWater onWater={onWater} />);
    await userEvent.click(screen.getByRole("button", { name: /water/i }));
    expect(onWater).toHaveBeenCalledWith("p2");
    expect(onClose).toHaveBeenCalled();
  });

  it("shows no water button when canWater is false", () => {
    render(<FlowerDetail plant={sprout} names={{ a: "Sam", b: "Robin" }} onClose={vi.fn()} canWater={false} onWater={vi.fn()} />);
    expect(screen.queryByRole("button", { name: /water/i })).not.toBeInTheDocument();
  });

  it("shows no water button when the flower is fully bloomed", () => {
    render(<FlowerDetail plant={plant} names={{ a: "Sam", b: "Robin" }} onClose={vi.fn()} canWater onWater={vi.fn()} />);
    expect(screen.queryByRole("button", { name: /water/i })).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const onClose = vi.fn();
    render(<FlowerDetail plant={plant} names={{ a: "Sam", b: "Robin" }} onClose={onClose} />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });
});
