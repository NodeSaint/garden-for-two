import { useState } from "react";
import type { Garden as G, Scene, Who } from "./state/types";
import { createGarden } from "./state/garden";
import { parseHash, encodeGarden } from "./state/share";
import { Creator } from "./screens/Creator";
import { Garden } from "./screens/Garden";

function baseUrl(): string {
  if (typeof window === "undefined") return "https://example.com/";
  return window.location.origin + window.location.pathname;
}

function nowMs(): number {
  return typeof performance !== "undefined" ? Math.floor(performance.now()) : 1;
}

export function App({ initialHash, identity }: { initialHash?: string; identity?: Who | null }) {
  const startHash = initialHash ?? (typeof window !== "undefined" ? window.location.hash : "");
  const [garden, setGarden] = useState<G | null>(() => parseHash(startHash));
  const [me] = useState<Who>(() => identity ?? (garden ? garden.turn : "a"));

  function onCreate(o: { a: string; b: string; scene: Scene }) {
    setGarden(createGarden({ ...o, at: nowMs() + 1 }));
  }

  function onChange(g: G) {
    setGarden(g);
    if (typeof window !== "undefined") window.location.hash = `g=${encodeGarden(g)}`;
  }

  if (!garden) return <Creator onCreate={onCreate} />;
  return <Garden garden={garden} me={me} now={nowMs} onChange={onChange} baseUrl={baseUrl()} />;
}
