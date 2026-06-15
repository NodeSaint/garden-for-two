import { useEffect, useRef, useState } from "react";
import type { FlowerType, Palette } from "../state/types";
import { FLOWER_TYPES, PALETTES, NOTE_MAX } from "../state/types";
import { PixelSprite } from "../art/PixelSprite";
import { flowerMatrix, paletteColors } from "../art/flowers";

export function PlantPicker({ onPlant, onCancel }: {
  onPlant: (p: { type: FlowerType; palette: Palette; note: string }) => void;
  onCancel: () => void;
}) {
  const [type, setType] = useState<FlowerType>("tulip");
  const [palette, setPalette] = useState<Palette>("rose");
  const [note, setNote] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onCancel(); }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onCancel]);

  return (
    <div ref={ref} tabIndex={-1} className="nes-dialog is-rounded picker" role="dialog" aria-modal="true" aria-label="plant a flower">
      <p className="title">plant a flower</p>
      <div className="row">
        {FLOWER_TYPES.map((t) => (
          <button key={t} aria-label={t} className={`nes-btn ${t === type ? "is-primary" : ""}`} onClick={() => setType(t)}>
            <PixelSprite matrix={flowerMatrix(t, 3)} colors={paletteColors(palette)} scale={3} />
          </button>
        ))}
      </div>
      <div className="row">
        {PALETTES.map((p) => (
          <button key={p} aria-label={p} className={`nes-btn ${p === palette ? "is-primary" : ""}`} onClick={() => setPalette(p)}>
            {p}
          </button>
        ))}
      </div>
      <label htmlFor="note">note</label>
      <input id="note" className="nes-input" maxLength={NOTE_MAX} value={note} onChange={(e) => setNote(e.target.value)} />
      <div className="row">
        <button className="nes-btn is-success" onClick={() => onPlant({ type, palette, note })}>plant it</button>
        <button className="nes-btn" onClick={onCancel}>cancel</button>
      </div>
    </div>
  );
}
