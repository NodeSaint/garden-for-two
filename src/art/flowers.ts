import type { FlowerType, Palette } from "../state/types";
import type { Matrix } from "./pixel";

const G1 = 1, G2 = 2, PD = 3, PL = 4, C = 5; // index legend: green-dark, green-light, petal-dark, petal-light, center
const _ = 0;

const SEED: Matrix = [
  [_, _, _],
  [_, 6, _],
  [6, 6, 6],
];
const SPROUT: Matrix = [
  [_, G2, _],
  [_, G1, _],
  [_, G1, _],
  [6, 6, 6],
];
const BUD: Matrix = [
  [_, PD, _],
  [G2, G1, G2],
  [_, G1, _],
  [_, G1, _],
  [6, 6, 6],
];

const bloom: Record<FlowerType, Matrix> = {
  tulip: [
    [_, PD, _, PD, _],
    [PD, PL, C, PL, PD],
    [_, PD, PL, PD, _],
    [_, _, G1, _, _],
    [_, G2, G1, _, _],
    [_, _, G1, G2, _],
    [6, 6, 6, 6, 6],
  ],
  daisy: [
    [_, PL, _, PL, _],
    [PL, C, C, C, PL],
    [_, PL, C, PL, _],
    [_, _, G1, _, _],
    [_, G2, G1, G2, _],
    [_, _, G1, _, _],
    [6, 6, 6, 6, 6],
  ],
  rose: [
    [_, PD, PD, PD, _],
    [PD, PL, C, PL, PD],
    [PD, PL, PL, PL, PD],
    [_, PD, PD, PD, _],
    [_, _, G1, _, _],
    [_, G2, G1, G2, _],
    [6, 6, 6, 6, 6],
  ],
  sunflower: [
    [PD, PD, PD, PD, PD],
    [PD, C, C, C, PD],
    [PD, C, C, C, PD],
    [PD, PD, PD, PD, PD],
    [_, _, G1, _, _],
    [_, G2, G1, G2, _],
    [6, 6, 6, 6, 6],
  ],
  mushroom: [
    [_, PD, PD, PD, _],
    [PD, PL, PL, PL, PD],
    [PD, PL, C, PL, PD],
    [_, G2, G2, G2, _],
    [_, G2, G2, G2, _],
    [_, _, _, _, _],
    [6, 6, 6, 6, 6],
  ],
  forgetmenot: [
    [PL, _, PL, _, PL],
    [_, C, _, C, _],
    [PL, _, PL, _, PL],
    [_, _, G1, _, _],
    [_, G2, G1, G2, _],
    [_, _, G1, _, _],
    [6, 6, 6, 6, 6],
  ],
};

export function flowerMatrix(type: FlowerType, stage: number): Matrix {
  if (stage <= 0) return SEED;
  if (stage === 1) return SPROUT;
  if (stage === 2) return BUD;
  return bloom[type];
}

const RAMPS: Record<Palette, string[]> = {
  rose:  ["#3a6b35", "#5fa05a", "#c2185b", "#f06292", "#ffd54f", "#6d4c41"],
  amber: ["#3a6b35", "#5fa05a", "#e65100", "#ffb74d", "#fff59d", "#6d4c41"],
  sky:   ["#3a6b35", "#5fa05a", "#1565c0", "#64b5f6", "#fff59d", "#6d4c41"],
  lilac: ["#3a6b35", "#5fa05a", "#6a1b9a", "#ba68c8", "#fff59d", "#6d4c41"],
  mint:  ["#3a6b35", "#5fa05a", "#00897b", "#4db6ac", "#fff59d", "#6d4c41"],
  coral: ["#3a6b35", "#5fa05a", "#d84315", "#ff8a65", "#fff59d", "#6d4c41"],
};

export function paletteColors(p: Palette): string[] {
  return RAMPS[p];
}
