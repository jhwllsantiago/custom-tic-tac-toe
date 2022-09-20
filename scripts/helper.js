"use strict";

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const disablePointerEvents = () => {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
};

export const updatePointerEvents = () => {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.pointerEvents = "all";
    if (cell.textContent !== "") cell.style.pointerEvents = "none";
  });
};

export const updateMessage = () => {
  if (isDraw && roundEnded) {
    message.textContent = `No points this round`;
  } else if (!roundEnded && !gameEnded) {
    message.textContent = `${player} is playing`;
  } else if (roundEnded && !gameEnded) {
    message.textContent = `${player} won this round`;
  } else if (roundEnded && gameEnded) {
    message.textContent = `${player} is the winner`;
  }
};
