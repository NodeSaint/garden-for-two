import type { Scene } from "../state/types";

export interface SceneStyle { sky: string; ground: string; ambient: "butterflies" | "fireflies" | "gulls"; }

const STYLES: Record<Scene, SceneStyle> = {
  meadow: { sky: "linear-gradient(#aee7ff, #e8f9d8)", ground: "#8bc34a", ambient: "butterflies" },
  moon:   { sky: "linear-gradient(#0d1b3e, #243b6b)", ground: "#2e7d52", ambient: "fireflies" },
  sea:    { sky: "linear-gradient(#bfe9ff, #7fc7e8)", ground: "#caa472", ambient: "gulls" },
};

export function sceneStyle(s: Scene): SceneStyle { return STYLES[s]; }
