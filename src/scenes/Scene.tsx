import type { ReactNode } from "react";
import type { Scene as SceneId } from "../state/types";
import { GRID_W, GRID_H } from "../state/types";
import { sceneStyle } from "../art/scenes";

export function Scene({ scene, children }: { scene: SceneId; children: ReactNode }) {
  const st = sceneStyle(scene);
  return (
    <div className={`scene scene-${scene}`} style={{ background: st.sky }} data-ambient={st.ambient}>
      <div className="scene-ground" style={{ background: st.ground }}>
        <div className="plot" style={{ gridTemplateColumns: `repeat(${GRID_W}, 1fr)`, gridTemplateRows: `repeat(${GRID_H}, 1fr)` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
