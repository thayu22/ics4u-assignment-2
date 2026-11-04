import type { RootCoordinate } from "@ics4u-assignment-02/types";

export function trigonometry(p: number, q: number, a: number, b: number) {
  const theta = (1 / 3) * Math.acos(-q / 2 / Math.sqrt(-((p / 3) * (p / 3) * (p / 3))));
  const yOne = 2 * Math.sqrt(-p / 3) * Math.cos(theta);
  const yTwo = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3);
  const yThr = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3);
  const xOne = yOne - b / (3 * a);
  const xTwo = yTwo - b / (3 * a);
  const xThr = yThr - b / (3 * a);
  const roots: RootCoordinate = {
    rootOne: { x: xOne, y: 0 },
    rootThr: { x: xThr, y: 0 },
    rootTwo: { x: xTwo, y: 0 },
  };
  return roots;
}
