import { describe, it, expect } from "vitest";
import { createGarden, addPlant, water, plantsAddedBy, MAX_PLANTS_PER_TURN_ERR } from "./garden";
import { MAX_STAGE } from "./types";

const base = () => createGarden({ scene: "meadow", a: "Sam", b: "Robin", at: 1000 });

describe("createGarden", () => {
  it("starts empty, creator's turn, version 1", () => {
    const g = base();
    expect(g.v).toBe(1);
    expect(g.plants).toEqual([]);
    expect(g.turn).toBe("a");
    expect(g.scene).toBe("meadow");
  });
});

describe("addPlant", () => {
  it("adds a seed-stage plant by the given person", () => {
    const g = addPlant(base(), { type: "tulip", palette: "rose", x: 1, y: 2, by: "a", note: "hi", at: 2000 });
    expect(g.plants).toHaveLength(1);
    expect(g.plants[0]).toMatchObject({ type: "tulip", stage: 0, by: "a", x: 1, y: 2 });
    expect(g.plants[0].id).toBeTruthy();
  });
  it("clamps note to 80 chars", () => {
    const long = "x".repeat(200);
    const g = addPlant(base(), { type: "daisy", palette: "sky", x: 0, y: 0, by: "a", note: long, at: 2000 });
    expect(g.plants[0].note).toHaveLength(80);
  });
  it("rejects a 4th plant in the same turn", () => {
    let g = base();
    for (let i = 0; i < 3; i++) g = addPlant(g, { type: "daisy", palette: "sky", x: i, y: 0, by: "a", note: "", at: 2000 });
    expect(() => addPlant(g, { type: "rose", palette: "coral", x: 4, y: 0, by: "a", note: "", at: 2000 }))
      .toThrow(MAX_PLANTS_PER_TURN_ERR);
  });
  it("rejects two plants on the same cell", () => {
    let g = addPlant(base(), { type: "tulip", palette: "rose", x: 1, y: 1, by: "a", note: "", at: 2000 });
    expect(() => addPlant(g, { type: "rose", palette: "coral", x: 1, y: 1, by: "a", note: "", at: 2100 }))
      .toThrow();
  });
});

describe("water", () => {
  it("advances a plant one stage, capped at MAX_STAGE", () => {
    let g = addPlant(base(), { type: "tulip", palette: "rose", x: 1, y: 1, by: "a", note: "", at: 2000 });
    const id = g.plants[0].id;
    g = water(g, id); expect(g.plants[0].stage).toBe(1);
    g = water(g, id); g = water(g, id); g = water(g, id);
    expect(g.plants[0].stage).toBe(MAX_STAGE);
  });
});

describe("plantsAddedBy", () => {
  it("counts only plants in the current turn window", () => {
    const g = base();
    expect(plantsAddedBy(g, "a")).toBe(0);
  });
});
