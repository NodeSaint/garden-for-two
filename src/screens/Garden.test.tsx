import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Garden } from "./Garden";
import { createGarden } from "../state/garden";

const g = createGarden({ scene: "meadow", a: "Sam", b: "Robin", at: 1 });

describe("Garden screen", () => {
  it("lets the current player open the planter and plant a flower", async () => {
    const onChange = vi.fn();
    render(<Garden garden={g} me="a" now={() => 5000} onChange={onChange} baseUrl="https://x.dev/" />);
    await userEvent.click(screen.getByRole("button", { name: /plant a flower/i }));
    await userEvent.click(screen.getByRole("button", { name: /plant it/i }));
    expect(onChange).toHaveBeenCalled();
    const next = onChange.mock.calls.at(-1)![0];
    expect(next.plants).toHaveLength(1);
  });
  it("renders a link to share after a plant exists", () => {
    const planted = { ...g, plants: [{ id: "p", type: "tulip", palette: "rose", x: 0, y: 0, stage: 0, by: "a", note: "", t: 1 } as const] };
    render(<Garden garden={planted as any} me="a" now={() => 1} onChange={vi.fn()} baseUrl="https://x.dev/" />);
    expect(screen.getByDisplayValue(/#g=/)).toBeInTheDocument();
  });
});
