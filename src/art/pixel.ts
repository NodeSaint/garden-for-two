// A Matrix is rows of palette indices. 0 = transparent. 1..N = colors[idx-1].
export type Matrix = number[][];

export function matrixDims(m: Matrix): { rows: number; cols: number } {
  return { rows: m.length, cols: m[0]?.length ?? 0 };
}

export function applyPalette(index: number, colors: string[]): string | null {
  if (index === 0) return null;
  return colors[index - 1] ?? null;
}
