"use strict";
import { updateDisplay, swapPlayers } from "./board.js";
import { highlightCells } from "./aesthetics.js";
import {
  disablePointerEvents,
  updateMessage,
  updatePointerEvents,
} from "./helper.js";
import { updateScores } from "./scoring.js";

let interval;
let isGameEndedSetToOne = 0;

const resetControls = () => {
  controlsA.style.display = "flex";
  controlsB.style.display = "none";
  undo.classList.add("disabled");
  redo.classList.add("disabled");
  newGame.classList.add("disabled");
  nextRound.classList.remove("disabled");
};
resetControls();

const resetBoard = () => {
  gameEnded = 0;
  roundEnded = 0;
  isDraw = 0;
  indexOfCellsToHighlight.length = 0;
  moves = 0;
  boardState = Array.from(new Array(boardSize), () =>
    Array.from(new Array(boardSize), () => "")
  );
  history = [structuredClone(boardState)];
  updateDisplay(boardState);
  updatePointerEvents();
  updateMessage();
};

startOver.addEventListener("click", () => {
  player = settings.firstPlayer;
  symbol = settings.firstSymbol;
  resetControls();
  resetBoard();
});
undo.addEventListener("click", () => {
  redo.classList.remove("disabled");
  moves--;
  updateDisplay(history[moves]);
  swapPlayers();
  updatePointerEvents();
  if (moves < 1) {
    undo.classList.add("disabled");
  }
});
redo.addEventListener("click", () => {
  undo.classList.remove("disabled");
  moves++;
  updateDisplay(history[moves]);
  swapPlayers();
  updatePointerEvents();
  if (moves + 1 >= history.length) {
    redo.classList.add("disabled");
  }
});

replay.addEventListener("click", () => {
  isGameEndedSetToOne = gameEnded;
  roundEnded = 0;
  gameEnded = isGameEndedSetToOne ? !gameEnded : gameEnded;
  replay.classList.add("disabled");
  newGame.classList.add("disabled");
  editSettingsB.classList.add("disabled");
  nextRound.classList.add("disabled");
  player = settings.firstPlayer;
  symbol = settings.firstSymbol;
  updateMessage();
  disablePointerEvents();
  moves = 0;
  updateDisplay(history[moves]);
  interval = setInterval(replayInterval, 500);
});
function replayInterval() {
  moves++;
  updateDisplay(history[moves]);
  if (moves + 1 >= history.length) {
    roundEnded = 1;
    gameEnded = isGameEndedSetToOne ? !gameEnded : gameEnded;
    isGameEndedSetToOne = 0;
    clearInterval(interval);
    updateMessage();
    highlightCells();
    replay.classList.remove("disabled");
    editSettingsB.classList.remove("disabled");
    if (gameEnded) newGame.classList.remove("disabled");
    if (!gameEnded) nextRound.classList.remove("disabled");
    return;
  }
  swapPlayers();
}
nextRound.addEventListener("click", () => {
  swapPlayers();
  settings.firstPlayer = player;
  settings.firstSymbol = symbol;
  resetControls();
  resetBoard();
  updateMessage();
});
newGame.addEventListener("click", () => {
  playerOne.score = 0;
  playerTwo.score = 0;
  resetBoard();
  resetControls();
  swapPlayers();
  settings.firstPlayer = player;
  settings.firstSymbol = symbol;
  updateScores();
});
