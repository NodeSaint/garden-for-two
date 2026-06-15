import type { Garden, Plant, Who, FlowerType, Palette, Scene } from "./types";
import { NOTE_MAX, MAX_STAGE, MAX_PLANTS_PER_TURN } from "./types";

export const MAX_PLANTS_PER_TURN_ERR = "MAX_PLANTS_PER_TURN";
export const CELL_TAKEN_ERR = "CELL_TAKEN";

let seq = 0;
function makeId(at: number): string {
  seq = (seq + 1) % 100000;
  return `${at.toString(36)}-${seq.toString(36)}`;
}

export function createGarden(opts: { scene: Scene; a: string; b: string; at: number }): Garden {
  return { v: 1, scene: opts.scene, a: opts.a.slice(0, 24), b: opts.b.slice(0, 24), turn: "a", plants: [] };
}

export function plantsAddedBy(g: Garden, who: Who): number {
  // Count plants by `who` that come after the other person's most recent plant.
  // Uses array (causal insertion) order rather than `p.t` timestamps: each link is
  // opened in a fresh document where performance.now() resets to ~0, so timestamps
  // from different turns are not comparable and would corrupt the per-turn budget.
  let lastOther = -1;
  for (let i = 0; i < g.plants.length; i++) if (g.plants[i].by !== who) lastOther = i;
  let n = 0;
  for (let i = lastOther + 1; i < g.plants.length; i++) if (g.plants[i].by === who) n++;
  return n;
}

export function addPlant(
  g: Garden,
  o: { type: FlowerType; palette: Palette; x: number; y: number; by: Who; note: string; at: number },
): Garden {
  if (plantsAddedBy(g, o.by) >= MAX_PLANTS_PER_TURN) throw new Error(MAX_PLANTS_PER_TURN_ERR);
  if (g.plants.some((p) => p.x === o.x && p.y === o.y)) throw new Error(CELL_TAKEN_ERR);
  const plant: Plant = {
    id: makeId(o.at), type: o.type, palette: o.palette, x: o.x, y: o.y,
    stage: 0, by: o.by, note: o.note.slice(0, NOTE_MAX), t: o.at,
  };
  return { ...g, plants: [...g.plants, plant] };
}

export function water(g: Garden, id: string): Garden {
  return { ...g, plants: g.plants.map((p) => (p.id === id ? { ...p, stage: Math.min(MAX_STAGE, p.stage + 1) } : p)) };
}

export function handTurn(g: Garden): Garden {
  return { ...g, turn: g.turn === "a" ? "b" : "a" };
}
