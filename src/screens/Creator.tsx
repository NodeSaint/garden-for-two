import { useState } from "react";
import type { Scene } from "../state/types";

const SCENE_LABELS: { id: Scene; label: string }[] = [
  { id: "meadow", label: "Spring Meadow" },
  { id: "moon", label: "Moonlit Garden" },
  { id: "sea", label: "Seaside Garden" },
];

export function Creator({ onCreate }: { onCreate: (o: { a: string; b: string; scene: Scene }) => void; now?: number }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [scene, setScene] = useState<Scene>("meadow");
  const ready = a.trim() && b.trim();
  return (
    <div className="creator">
      <h1 className="nes-text is-primary">A Garden for Two</h1>
      <label htmlFor="a">your name</label>
      <input id="a" className="nes-input" value={a} maxLength={24} onChange={(e) => setA(e.target.value)} />
      <label htmlFor="b">their name</label>
      <input id="b" className="nes-input" value={b} maxLength={24} onChange={(e) => setB(e.target.value)} />
      <p>pick a scene</p>
      <div className="row">
        {SCENE_LABELS.map((s) => (
          <button key={s.id} className={`nes-btn ${s.id === scene ? "is-primary" : ""}`} onClick={() => setScene(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <button className="nes-btn is-success" disabled={!ready} onClick={() => onCreate({ a: a.trim(), b: b.trim(), scene })}>
        start our garden
      </button>
    </div>
  );
}
