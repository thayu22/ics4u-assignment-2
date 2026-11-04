import type { RootCoordinate } from "@ics4u-assignment-02/types";

export function cardano(p: number, q: number, a: number, b: number, discriminant: number) {
  const inf = -b / (3 * a);
  const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
  const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
  const yOne = u + v;
  const xOne = yOne + inf;
  if (discriminant > 0) {
    const roots = {
      rootOne: { x: xOne, y: 0 },
      rootThr: { x: "x: Imaginary", y: "y: Imaginary" },
      rootTwo: { x: "x: Imaginary", y: "y: Imaginary" },
    };
    return roots;
  } else {
    if (p === 0 && q === 0) {
      const roots: RootCoordinate = {
        rootOne: { x: inf, y: 0 },
        rootThr: { x: inf, y: 0 },
        rootTwo: { x: inf, y: 0 },
      };
      return roots;
    } else if (p !== 0) {
      const rootTwo = -Math.cbrt(4 * q);
      const rootOne = -(rootTwo / 2);
      const roots: RootCoordinate = {
        rootOne: { x: rootOne + inf, y: 0 },
        rootThr: { x: rootOne + inf, y: 0 },
        rootTwo: { x: rootTwo + inf, y: 0 },
      };
      return roots;
    } else {
      const roots: RootCoordinate = {
        rootOne: { x: "incorrect", y: "incorrect" },
        rootThr: { x: "incorrect", y: "incorrect" },
        rootTwo: { x: "incorrect", y: "incorrect" },
      };
      return roots;
    }
  }
}
