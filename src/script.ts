import { drawGraph } from "@ics4u-assignment-02/utils";

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

// depressed form function
// function (a: number, b:number, c:number, d:number) {
//   let p: number = (3 * a * c - b * b) / (3 * a * a);
//   let q: number = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);

//   return [p , q]
// }
