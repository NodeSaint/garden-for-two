import { describe, it, expect } from "vitest";
import { matrixDims, applyPalette } from "./pixel";

describe("matrixDims", () => {
  it("returns rows/cols of a matrix", () => {
    expect(matrixDims([[0, 0], [0, 0], [0, 0]])).toEqual({ rows: 3, cols: 2 });
  });
});

describe("applyPalette", () => {
  it("maps index 0 to transparent, others to colors", () => {
    const colors = ["#000", "#fff"];
    expect(applyPalette(0, colors)).toBeNull();
    expect(applyPalette(1, colors)).toBe("#000");
    expect(applyPalette(2, colors)).toBe("#fff");
  });
});
