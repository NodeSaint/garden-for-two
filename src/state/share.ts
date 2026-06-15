import * as LZString from "lz-string";
import type { Garden } from "./types";
import { SCENES } from "./types";

export function encodeGarden(g: Garden): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(g));
}

function isGarden(o: unknown): o is Garden {
  if (!o || typeof o !== "object") return false;
  const g = o as Record<string, unknown>;
  return g.v === 1 && typeof g.a === "string" && typeof g.b === "string" &&
    (SCENES as readonly string[]).includes(g.scene as string) &&
    (g.turn === "a" || g.turn === "b") && Array.isArray(g.plants);
}

export function decodeGarden(s: string): Garden | null {
  if (!s) return null;
  try {
    const json = LZString.decompressFromEncodedURIComponent(s);
    if (!json) return null;
    const obj = JSON.parse(json);
    return isGarden(obj) ? (obj as Garden) : null;
  } catch {
    return null;
  }
}

export function linkFor(g: Garden, baseUrl: string): string {
  return `${baseUrl}#g=${encodeGarden(g)}`;
}

export function parseHash(hash: string): Garden | null {
  const m = /[#&]g=([^&]+)/.exec(hash);
  return m ? decodeGarden(m[1]) : null;
}
