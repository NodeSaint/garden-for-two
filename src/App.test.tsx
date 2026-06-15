import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { createGarden, addPlant } from "./state/garden";
import { linkFor } from "./state/share";

describe("App routing", () => {
  it("shows Creator when there is no garden in the hash", () => {
    render(<App initialHash="" identity={null} />);
    expect(screen.getByRole("heading", { name: /a garden for two/i })).toBeInTheDocument();
  });
  it("shows the Garden when a valid link is present", () => {
    const g = addPlant(createGarden({ scene: "sea", a: "Sam", b: "Robin", at: 1 }),
      { type: "tulip", palette: "rose", x: 0, y: 0, by: "a", note: "hi", at: 2 });
    const hash = new URL(linkFor(g, "https://x.dev/")).hash;
    render(<App initialHash={hash} identity={null} />);
    expect(screen.getByText(/turn|waiting/i)).toBeInTheDocument();
  });
});
