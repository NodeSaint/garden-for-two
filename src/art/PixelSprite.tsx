import { useEffect, useRef } from "react";
import type { Matrix } from "./pixel";
import { matrixDims, applyPalette } from "./pixel";

export function PixelSprite({ matrix, colors, scale = 6, className }: {
  matrix: Matrix; colors: string[]; scale?: number; className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { rows, cols } = matrixDims(matrix);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const c = applyPalette(matrix[y][x], colors);
        if (c) { ctx.fillStyle = c; ctx.fillRect(x * scale, y * scale, scale, scale); }
      }
  }, [matrix, colors, scale, rows, cols]);
  return (
    <canvas
      ref={ref}
      width={cols * scale}
      height={rows * scale}
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
