import { drawGraph } from "@ics4u-assignment-02/utils";
import type { Results, RootCoordinate } from "./types";

const canvas = document.getElementById("graph") as HTMLCanvasElement;

drawGraph(
  { a: 0, b: 0, c: 0, d: 0 },
  {
    r1: { x: 0, y: 0 },
    r2: { x: 0, y: 0 },
    r3: { x: 0, y: 0 },
  },
  canvas,
);

function setText(id: string, value: string | number) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }
  element.innerText = String(value);
}

function setAnalysis(answer: Results) {
  setText("p", answer.p);
  setText("q", answer.q);
  setText("discriminant", answer.discriminant);
  setText("root-one", String(`${answer.r1.x} | ${answer.r1.y}`));
  setText("root-two", String(answer.r2));
  setText("root-three", String(answer.r3));
  setText("minimum", String(answer.minimum));
  setText("maximum", String(answer.maximum));
  setText("equation", answer.equation);
  setText("first-derivative", answer.firstDerivative);
  setText("second-derivative", answer.secondDerivative);
  setText("roots", answer.roots);
  setText("factored", answer.factored);
}

const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("input", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));
  const d = Number(formData.get("d"));

  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);

  const discriminant = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);

  const result = solveCubic(p, q, a, b, c, d, discriminant);
  setAnalysis(result);
});

function trigonometry(p: number, q: number, a: number, b: number) {
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

function cardano(p: number, q: number, a: number, b: number, discriminant: number) {
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

function firstDer(a: number, b: number, c: number) {
  const firstDeriv = {
    aCoef: a * 3,
    bCoef: b * 2,
    cCoef: c,
  };
  return firstDeriv;
}

function solveCubic(pValue: number, qValue: number, a: number, b: number, c: number, d: number, discriminants: number) {
  const firDer = firstDer(a, b, c);
  let rootFinal: RootCoordinate;
  if (discriminants < 0) {
    rootFinal = trigonometry(pValue, qValue, a, b);
  } else {
    rootFinal = cardano(pValue, qValue, a, b, discriminants);
  }

  const { rootOne, rootTwo, rootThr } = rootFinal;
  const { aCoef, bCoef, cCoef } = firDer;
  const firstDisc = 2 * b * (2 * b) - 4 * 3 * a * c;

  let xValueOne: number;
  let xValueTwo: number;
  let yValueOne: number;
  let yValueTwo: number;

  if (firstDisc > 0) {
    xValueOne = (-2 * b + Math.sqrt(firstDisc)) / (a * 6);
    xValueTwo = (-2 * b - Math.sqrt(firstDisc)) / (a * 6);
    yValueOne = a * xValueOne * xValueOne * xValueOne + b * xValueOne * xValueOne + c * xValueOne + d;
    yValueTwo = a * xValueTwo * xValueTwo * xValueTwo + b * xValueTwo * xValueTwo + c * xValueTwo + d;
  } else if (firstDisc === 0) {
    xValueOne = (-2 * b) / (a * 6);
    xValueTwo = xValueOne;
    yValueOne = a * xValueOne * xValueOne * xValueOne + b * xValueOne * xValueOne + c * xValueOne + d;
    yValueTwo = yValueOne;
  } else {
    xValueOne = NaN;
    xValueTwo = NaN;
    yValueOne = NaN;
    yValueTwo = NaN;
  }
  let status: string;

  if (discriminants < 0) {
    status = "3 Distinct Real Roots";
  } else if (discriminants > 0) {
    status = "1 Real root, 2 Complex Roots";
  } else {
    if (pValue === 0 && qValue === 0) {
      status = "Triple Real Roots";
    } else if (pValue === 0) {
      status = "Double Real Roots, Single Real Root";
    } else {
      status = "N/A";
    }
  }
  const secondDerivativeOne = 6 * a * xValueOne + 2 * b;
  const secondDerivativeTwo = 6 * a * xValueTwo + 2 * b;

  const result: Results = {
    discriminant: discriminants,
    equation: `${a}x³ ${b >= 0 ? "+" : ""} ${b}x² ${c >= 0 ? "+" : ""} ${c}x ${d >= 0 ? "+" : ""} ${d}`,
    factored: `${a === -1 ? "-" : a === 1 ? "" : a} (x ${Number(rootOne.x) < 0 ? "+" : "-"} ${Math.abs(Number(rootOne.x))}) (x ${Number(rootTwo.x) < 0 ? "+" : "-"} ${Math.abs(Number(rootTwo.x))}) (x ${Number(rootThr.x) < 0 ? "+" : "-"} ${Math.abs(Number(rootThr.x))})`,
    firstDerivative: `${aCoef}x² ${bCoef > 0 ? "+" : ""}${bCoef === 0 ? "" : `${bCoef}x`} ${cCoef > 0 ? "+" : ""}${cCoef === 0 ? "" : cCoef}`,
    maximum: { x: NaN, y: NaN },
    minimum: { x: NaN, y: NaN },
    p: pValue,
    q: qValue,
    r1: { x: rootOne.x, y: rootOne.y },
    r2: { x: rootTwo.x, y: rootTwo.y },
    r3: { x: rootThr.x, y: rootThr.y },
    roots: status,
    secondDerivative: `${aCoef === 0 ? "" : `${aCoef * 2}x`} ${bCoef > 0 ? "+" : ""}${bCoef === 0 ? "" : bCoef}`,
  };

  if (secondDerivativeOne < 0) {
    result.maximum = {
      x: xValueOne,
      y: yValueOne,
    };
  } else if (secondDerivativeOne > 0) {
    result.minimum = {
      x: xValueOne,
      y: yValueOne,
    };
  }

  if (secondDerivativeTwo < 0) {
    result.maximum = {
      x: xValueTwo,
      y: yValueTwo,
    };
  } else if (secondDerivativeTwo > 0) {
    result.minimum = {
      x: xValueTwo,
      y: yValueTwo,
    };
  }

  return result;
}
