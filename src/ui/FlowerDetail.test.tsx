import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FlowerDetail } from "./FlowerDetail";
import type { Plant } from "../state/types";

const plant: Plant = { id: "p1", type: "rose", palette: "rose", x: 0, y: 0, stage: 3, by: "a", note: "for you", t: 1700000000000 };

describe("FlowerDetail", () => {
  it("shows the note and who planted it", () => {
    render(<FlowerDetail plant={plant} names={{ a: "Sam", b: "Robin" }} onClose={vi.fn()} />);
    expect(screen.getByText(/for you/)).toBeInTheDocument();
    expect(screen.getByText(/Sam/)).toBeInTheDocument();
  });
});
