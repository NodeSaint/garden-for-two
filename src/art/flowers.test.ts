import { describe, it, expect } from "vitest";
import { flowerMatrix, paletteColors } from "./flowers";
import { FLOWER_TYPES, PALETTES, MAX_STAGE } from "../state/types";
import { matrixDims } from "./pixel";

describe("flowerMatrix", () => {
  it("returns a non-empty matrix for every type and stage", () => {
    for (const t of FLOWER_TYPES)
      for (let s = 0; s <= MAX_STAGE; s++) {
        const m = flowerMatrix(t, s);
        const { rows, cols } = matrixDims(m);
        expect(rows).toBeGreaterThan(0);
        expect(cols).toBeGreaterThan(0);
      }
  });
});

describe("paletteColors", () => {
  it("returns a colour ramp for every palette", () => {
    for (const p of PALETTES) expect(paletteColors(p).length).toBeGreaterThanOrEqual(3);
  });
});
