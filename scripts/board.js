"use strict";
import { updateCellColor, highlightCells } from "./aesthetics.js";
import { disablePointerEvents, updateMessage } from "./helper.js";
import { addPoints, checkWinner, updateScores } from "./scoring.js";

const board = document.querySelector("#board");

export function createGame() {
  applyConfigurations();
  createBoardLayout();
  createCells();
  updateMessage();
}
function applyConfigurations() {
  player = settings.firstPlayer;
  symbol = settings.firstSymbol;
  boardSize = parseInt(settings.boardSize);
  patternLength = parseInt(settings.patternLength);
  cellSize = 750 / boardSize;
  boardState = Array.from(new Array(boardSize), () =>
    Array.from(new Array(boardSize), () => "")
  );
  history = [structuredClone(boardState)];
}
function createBoardLayout() {
  board.style.display = "grid";
  board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
  board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  board.style.fontSize = `min(150px, max(30px,${cellSize}px))`;
}
function createCells() {
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    cell.classList.add("cell");
    board.append(cell);

    cell.addEventListener("click", () => {
      cell.style.pointerEvents = "none";
      undo.classList.remove("disabled");
      userHasUndoed();

      let col = i % boardSize;
      let row = (i - col) / boardSize;
      boardState[row][col] = symbol;
      moves++;
      history[moves] = structuredClone(boardState);
      updateDisplay(boardState);
      updateCellColor();
      lookForPattern();
      if (!roundEnded) swapPlayers();
    });
    cell.addEventListener("mouseover", () => {
      cell.textContent = symbol;
    });
    cell.addEventListener("mouseout", () => {
      if (cell.style.pointerEvents !== "none") cell.textContent = "";
    });
  }
}
export function swapPlayers() {
  player = player === playerOne.name ? playerTwo.name : playerOne.name;
  symbol = symbol === playerOne.symbol ? playerTwo.symbol : playerOne.symbol;
  updateMessage();
}
export function updateDisplay(data) {
  const cells = document.querySelectorAll(".cell");
  for (const [idx, cell] of cells.entries()) {
    let col = idx % boardSize;
    let row = (idx - col) / boardSize;
    cell.textContent = data[row][col];
  }
}
function lookForPattern() {
  let patternCounter = 0;
  const clearCounters = () => {
    patternCounter = 0;
    highlightOne.length = 0;
    highlightTwo.length = 0;
  };
  const cellToBeHighlighted = (row, col) => {
    let idx = row * boardSize + col;
    symbol === playerOne.symbol
      ? highlightOne.push(idx)
      : highlightTwo.push(idx);
  };
  const postGameEvents = () => {
    roundEnded = 1;
    disablePointerEvents();
    updateMessage();
    highlightCells();
    controlsA.style.display = "none";
    controlsB.style.display = "flex";
    addPoints();
    updateScores();
    checkWinner();
  };

  ////  Horizontally  ////
  for (let row = 0; row < boardSize; row++) {
    clearCounters();
    for (let col = 0; col < boardSize; col++) {
      if (boardState[row][col] === symbol) {
        cellToBeHighlighted(row, col);
        patternCounter++;
        if (patternCounter === patternLength) {
          postGameEvents();
          return;
        }
      } else {
        clearCounters();
      }
    }
  }

  ////  Vertically  ////
  for (let col = 0; col < boardSize; col++) {
    clearCounters();
    for (let row = 0; row < boardSize; row++) {
      if (boardState[row][col] === symbol) {
        cellToBeHighlighted(row, col);
        patternCounter++;
        if (patternCounter === patternLength) {
          postGameEvents();
          return;
        }
      } else {
        clearCounters();
      }
    }
  }

  ////  Diagonally (negative slope) ////
  for (let row = 0; row <= boardSize - patternLength; row++) {
    for (let col = 0; col <= boardSize - patternLength; col++) {
      clearCounters();
      for (let offset = 0; offset < patternLength; offset++) {
        if (boardState[row + offset][col + offset] === symbol) {
          cellToBeHighlighted(row + offset, col + offset);
          patternCounter++;
          if (patternCounter === patternLength) {
            postGameEvents();
            return;
          }
        } else {
          clearCounters();
        }
      }
    }
  }

  ////  Diagonally (positive slope) ////
  for (let row = boardSize - 1; row > patternLength - 2; row--) {
    for (let col = 0; col <= boardSize - patternLength; col++) {
      clearCounters();
      for (let offset = 0; offset < patternLength; offset++) {
        if (boardState[row - offset][col + offset] === symbol) {
          cellToBeHighlighted(row - offset, col + offset);
          patternCounter++;
          if (patternCounter === patternLength) {
            postGameEvents();
            return;
          }
        } else {
          clearCounters();
        }
      }
    }
  }

  //// Draw ////
  if (moves >= boardSize * boardSize) {
    roundEnded = 1;
    isDraw = 1;
    updateMessage();
    controlsA.style.display = "none";
    controlsB.style.display = "flex";
  }
}
function userHasUndoed() {
  if (moves !== history.length - 1) {
    redo.classList.add("disabled");
    while (history.length - 1 !== moves) history.pop();
    boardState = structuredClone(history[moves]);
  }
}
