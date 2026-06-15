import { useEffect, useRef } from "react";
import type { Plant } from "../state/types";
import { MAX_STAGE } from "../state/types";

export function FlowerDetail({ plant, names, onClose, canWater, onWater }: {
  plant: Plant; names: { a: string; b: string }; onClose: () => void;
  canWater?: boolean; onWater?: (id: string) => void;
}) {
  const who = plant.by === "a" ? names.a : names.b;
  const when = new Date(plant.t).toLocaleDateString();
  const ref = useRef<HTMLDivElement>(null);
  const showWater = !!canWater && !!onWater && plant.stage < MAX_STAGE;

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div ref={ref} tabIndex={-1} className="nes-dialog is-rounded fd" role="dialog" aria-modal="true" aria-label="flower note">
      <p className="title">{plant.type}</p>
      {plant.note ? <p>“{plant.note}”</p> : <p className="muted">no note</p>}
      <p className="muted">planted by {who} · {when}</p>
      {showWater
        ? <button className="nes-btn" onClick={() => { onWater!(plant.id); onClose(); }}>water 💧</button>
        : plant.stage >= MAX_STAGE && <p className="muted">fully bloomed 🌸</p>}
      <button className="nes-btn" onClick={onClose}>close</button>
    </div>
  );
}
