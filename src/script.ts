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
  const _a = formData.get("a");
  const _b = formData.get("b");
  const _c = formData.get("c");
  const _d = formData.get("d");
});