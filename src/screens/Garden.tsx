import { useState } from "react";
import type { Garden as G, Who, FlowerType, Palette } from "../state/types";
import { GRID_W, GRID_H, MAX_PLANTS_PER_TURN } from "../state/types";
import { addPlant, water, plantsAddedBy, handTurn } from "../state/garden";
import { linkFor } from "../state/share";
import { Scene } from "../scenes/Scene";
import { Flower } from "../flowers/Flower";
import { PlantPicker } from "../ui/PlantPicker";
import { FlowerDetail } from "../ui/FlowerDetail";
import { ShareSheet } from "../ui/ShareSheet";

function firstFreeCell(g: G): { x: number; y: number } | null {
  for (let y = GRID_H - 1; y >= 0; y--)
    for (let x = 0; x < GRID_W; x++)
      if (!g.plants.some((p) => p.x === x && p.y === y)) return { x, y };
  return null;
}

export function Garden({ garden, me, now, onChange, baseUrl }: {
  garden: G; me: Who; now: () => number; onChange: (g: G) => void; baseUrl: string;
}) {
  const [picking, setPicking] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const used = plantsAddedBy(garden, me);
  const canPlant = used < MAX_PLANTS_PER_TURN && !!firstFreeCell(garden);

  function plant(o: { type: FlowerType; palette: Palette; note: string }) {
    const cell = firstFreeCell(garden); if (!cell) return;
    onChange(addPlant(garden, { ...o, x: cell.x, y: cell.y, by: me, at: now() }));
    setPicking(false); setDirty(true);
  }
  function doWater(id: string) { onChange(water(garden, id)); setDirty(true); }

  const sendGarden = handTurn(garden);
  const url = linkFor(sendGarden, baseUrl);
  const detailPlant = garden.plants.find((p) => p.id === detail) ?? null;

  return (
    <div className="garden">
      <p className="turnline">{garden.turn === me ? "your turn 🌱" : "waiting on them…"}</p>
      <Scene scene={garden.scene}>
        {garden.plants.map((p) => (
          <span key={p.id} style={{ gridColumnStart: p.x + 1, gridRowStart: p.y + 1 }}>
            <Flower plant={p} onTap={setDetail} />
          </span>
        ))}
      </Scene>

      <div className="row controls">
        <button className="nes-btn is-primary" disabled={!canPlant} onClick={() => setPicking(true)}>
          plant a flower ({MAX_PLANTS_PER_TURN - used} left)
        </button>
      </div>

      {picking && <PlantPicker onPlant={plant} onCancel={() => setPicking(false)} />}
      {detailPlant && <FlowerDetail plant={detailPlant} names={{ a: garden.a, b: garden.b }} onClose={() => setDetail(null)} canWater={garden.turn === me} onWater={doWater} />}

      {(dirty || garden.plants.length > 0) && (
        <>
          <p>send it back:</p>
          <ShareSheet url={url} />
        </>
      )}
    </div>
  );
}
