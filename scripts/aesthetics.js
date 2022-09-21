"use strict";

export function updateCellColor() {
  document.querySelectorAll(".cell").forEach((cell, idx) => {
    const cellData = history[moves].flat()[idx];
    if (cellData === playerOne.symbol) {
      cell.style.backgroundColor = playerOne.color;
      cell.style.color = isColorLight(playerOne.color) ? "black" : "white";
    } else if (cellData === playerTwo.symbol) {
      cell.style.backgroundColor = playerTwo.color;
      cell.style.color = isColorLight(playerTwo.color) ? "black" : "white";
    } else {
      cell.style.backgroundColor = "#e6e6e6";
      cell.style.color = "black";
    }
  });
}
export function highlightCells() {
  highlightOne.forEach((idx) => {
    const cell = document.querySelectorAll(".cell")[idx];
    cell.style.backgroundColor = "#84e184";
  });
  highlightTwo.forEach((idx) => {
    const cell = document.querySelectorAll(".cell")[idx];
    cell.style.backgroundColor = "#84e184";
  });
}

export const colorShade = (color, amount) => {
  color = color.replace("#", "");

  let [r, g, b] = color.match(/.{2}/g);
  [r, g, b] = [
    parseInt(r, 16) + amount,
    parseInt(g, 16) + amount,
    parseInt(b, 16) + amount,
  ];

  r = Math.max(Math.min(255, r), 0).toString(16);
  g = Math.max(Math.min(255, g), 0).toString(16);
  b = Math.max(Math.min(255, b), 0).toString(16);

  const rr = (r.length < 2 ? "0" : "") + r;
  const gg = (g.length < 2 ? "0" : "") + g;
  const bb = (b.length < 2 ? "0" : "") + b;

  return `#${rr}${gg}${bb}`;
};

function isColorLight(color) {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substring(0, 0 + 2), 16);
  const c_g = parseInt(hex.substring(2, 2 + 2), 16);
  const c_b = parseInt(hex.substring(4, 4 + 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}
