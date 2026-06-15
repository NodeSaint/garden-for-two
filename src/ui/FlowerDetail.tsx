import type { Plant } from "../state/types";

export function FlowerDetail({ plant, names, onClose }: {
  plant: Plant; names: { a: string; b: string }; onClose: () => void;
}) {
  const who = plant.by === "a" ? names.a : names.b;
  const when = new Date(plant.t).toLocaleDateString();
  return (
    <div className="nes-dialog is-rounded fd" role="dialog" aria-label="flower note">
      <p className="title">{plant.type}</p>
      {plant.note ? <p>“{plant.note}”</p> : <p className="muted">no note</p>}
      <p className="muted">planted by {who} · {when}</p>
      <button className="nes-btn" onClick={onClose}>close</button>
    </div>
  );
}
