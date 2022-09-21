"use strict";
import { colorShade } from "./aesthetics.js";
import { updateMessage } from "./helper.js";

const infoNameOne = document.querySelector("#info-name-one");
const infoScoreOne = document.querySelector("#info-score-one");
const infoNameTwo = document.querySelector("#info-name-two");
const infoScoreTwo = document.querySelector("#info-score-two");

export const updateInfo = () => {
  infoNameOne.textContent = playerOne.name;
  infoNameOne.style.color = colorShade(playerOne.color, -50);
  infoNameTwo.textContent = playerTwo.name;
  infoNameTwo.style.color = colorShade(playerTwo.color, -50);
};

export const addPoints = () => {
  player === playerOne.name ? playerOne.score++ : playerTwo.score++;
};

export const updateScores = () => {
  infoScoreOne.textContent = playerOne.score;
  infoScoreTwo.textContent = playerTwo.score;
};

export const checkWinner = () => {
  if (
    playerOne.score === settings.maxPoints ||
    playerTwo.score === settings.maxPoints
  ) {
    gameEnded = 1;
    updateMessage();
    nextRound.classList.add("disabled");
    newGame.classList.remove("disabled");
  }
};
