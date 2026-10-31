import { drawGraph } from "@ics4u-assignment-02/utils";

//import { Results } from "./types";

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

function setText(id: string, value: string) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }
  element.innerText = String(value);
}

// function setAnalysis ({answer: Results}) {

// }

const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));
  const d = Number(formData.get("d"));

  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
});

function disc(p: number, q: number) {
  const discriminant = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);
  return discriminant;
}

function trigonometry(p: number, q: number, a: number, b: number) {
  const theta = (1 / 3) * Math.acos(-q / 2 / Math.sqrt(-((p / 3) * (p / 3) * (p / 3))));
  const yOne = 2 * Math.sqrt(-p / 3) * Math.cos(theta);
  const yTwo = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3);
  const yThr = 2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3);
  const xOne = yOne - b / (3 * a);
  const xTwo = yTwo - b / (3 * a);
  const xThr = yThr - b / (3 * a);
  const roots = {
    r1: { x: xOne, y: yOne },
    r2: { x: xTwo, y: yTwo },
    r3: { x: xThr, y: yThr },
  };
  return roots;
}

function cardano(p: number, q: number, a: number, b: number) {
  const discriminant = disc(p, q);
  const inf = -b / (3 * a);
  const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
  const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
  const yOne = u + v;
  const xOne = yOne + inf;
  if (discriminant > 0) {
    const roots = {
      r1: { x: xOne, y: yOne },
    };
    return roots;
  } else {
    if (p === 0 && q === 0) {
      const roots = {
        r1: { x: inf, y: 0 },
        r2: { x: inf, y: 0 },
        r3: { x: inf, y: 0 },
      };
      return roots;
    } else if (p !== 0) {
    }
  }
}

function solveCubic(p: number, q: number, a: number, b: number) {
  const discriminant = disc(p, q);

  if (discriminant < 0) {
    return trigonometry(p, q, a, b);
  } else {
    if (discriminant > 0 || (p === 0 && q === 0)) {
      return cardano(p, q, a, b);
    } // else if (p != 0) {

    // }
  }
}
