export const SCENES = ["meadow", "moon", "sea"] as const;
export type Scene = (typeof SCENES)[number];

export const FLOWER_TYPES = ["tulip", "daisy", "rose", "sunflower", "mushroom", "forgetmenot"] as const;
export type FlowerType = (typeof FLOWER_TYPES)[number];

export const PALETTES = ["rose", "amber", "sky", "lilac", "mint", "coral"] as const;
export type Palette = (typeof PALETTES)[number];

export const MAX_PLANTS_PER_TURN = 3;
export const NOTE_MAX = 80;
export const MAX_STAGE = 3; // seed=0, sprout=1, bud=2, bloom=3
export type Who = "a" | "b";

export interface Plant {
  id: string;
  type: FlowerType;
  palette: Palette;
  x: number;
  y: number;
  stage: number;
  by: Who;
  note: string;
  t: number;
}

export interface Garden {
  v: 1;
  scene: Scene;
  a: string;
  b: string;
  turn: Who;
  plants: Plant[];
}

export const GRID_W = 8;
export const GRID_H = 4;
