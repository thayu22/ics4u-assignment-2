export function setText(id: string, value: string | number) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }
  element.innerText = String(value);
}
