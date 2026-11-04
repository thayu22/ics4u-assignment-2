export function firstDer(a: number, b: number, c: number) {
  const firstDeriv = {
    aCoef: a * 3,
    bCoef: b * 2,
    cCoef: c,
  };
  return firstDeriv;
}
