import { PixelSprite } from "../art/PixelSprite";
import { flowerMatrix, paletteColors } from "../art/flowers";
import type { Plant } from "../state/types";

export function Flower({ plant, onTap, justBloomed = false }: {
  plant: Plant; onTap: (id: string) => void; justBloomed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={`flower planted by ${plant.by}`}
      onClick={() => onTap(plant.id)}
      className={`flower sway${justBloomed ? " bloom-in" : ""}`}
    >
      <PixelSprite matrix={flowerMatrix(plant.type, plant.stage)} colors={paletteColors(plant.palette)} scale={6} />
    </button>
  );
}
