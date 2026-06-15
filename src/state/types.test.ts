import { describe, it, expect } from "vitest";
import { SCENES, FLOWER_TYPES, PALETTES, MAX_PLANTS_PER_TURN, NOTE_MAX, MAX_STAGE } from "./types";

describe("constants", () => {
  it("exposes 3 scenes, 6 flower types, 6 palettes", () => {
    expect(SCENES).toEqual(["meadow", "moon", "sea"]);
    expect(FLOWER_TYPES).toHaveLength(6);
    expect(PALETTES).toHaveLength(6);
  });
  it("enforces turn/note/stage limits", () => {
    expect(MAX_PLANTS_PER_TURN).toBe(3);
    expect(NOTE_MAX).toBe(80);
    expect(MAX_STAGE).toBe(3);
  });
});
