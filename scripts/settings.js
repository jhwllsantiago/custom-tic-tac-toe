"use strict";
import { highlightCells } from "./aesthetics.js";
import { createGame, updateDisplay } from "./board.js";
import {
  capitalizeFirstLetter,
  disablePointerEvents,
  updateMessage,
  updatePointerEvents,
} from "./helper.js";
import { updateInfo } from "./scoring.js";

const boardSize = document.querySelector("[data-board-size]");
const patterLength = document.querySelector("[data-pattern-length]");
let askForConfirmation = 1;

saveBtn.classList.add("disabled");
firstMove.style.display = "none";

verifyBtn.addEventListener("click", () => {
  if (boardSize.value > 20 && askForConfirmation) {
    const confirmation = `The size of ${boardSize.value} may not fit your screen.\nHigher values may affect performance.\nContinue?`;
    if (window.confirm(confirmation)) askForConfirmation = 0;
    else return;
  }
  inputChecker();
});
saveBtn.addEventListener("click", () => {
  if (!isEditing) {
    assignValues();
    updateInfo();
    firstMoveBtnOne.textContent = playerOne.name;
    firstMoveBtnTwo.textContent = playerTwo.name;
    gameSetup.style.display = "none";
    firstMove.style.display = "block";
    saveBtn.classList.add("disabled");
  }
});
firstMoveBtnOne.addEventListener("click", () => {
  settings.firstPlayer = playerOne.name;
  settings.firstSymbol = playerOne.symbol;
  createGame();
  firstMove.style.display = "none";
  gameContainer.style.display = "flex";
});
firstMoveBtnTwo.addEventListener("click", () => {
  settings.firstPlayer = playerTwo.name;
  settings.firstSymbol = playerTwo.symbol;
  createGame();
  firstMove.style.display = "none";
  gameContainer.style.display = "flex";
});
quickStartBtn.addEventListener("click", () => {
  quickStartValues();
  assignValues();
  createGame();
  updateInfo();
  gameSetup.style.display = "none";
  gameContainer.style.display = "flex";
  inputFields.forEach((field) => {
    field.classList.remove("red-outline");
  });
});

inputFields.forEach((field) => {
  field.addEventListener("focus", () => {
    field.classList.remove("red-outline");
    saveBtn.classList.add("disabled");
  });
});
nameOne.addEventListener("blur", (event) => {
  if (event.target.value.trim().length === 0) {
    event.target.classList.add("red-outline");
  }
});
nameTwo.addEventListener("blur", (event) => {
  if (event.target.value.trim().length === 0) {
    event.target.classList.add("red-outline");
  }
});
symbolOne.addEventListener("blur", (event) => {
  if (!event.target.value.trim()) {
    event.target.classList.add("red-outline");
  }
});
symbolTwo.addEventListener("blur", (event) => {
  if (!event.target.value.trim()) {
    event.target.classList.add("red-outline");
  }
});
boardSize.addEventListener("blur", (event) => {
  if (event.target.value < 3) {
    event.target.classList.add("red-outline");
  }
});
patterLength.addEventListener("blur", (event) => {
  if (event.target.value < 3) {
    event.target.classList.add("red-outline");
  }
});
maxPoints.addEventListener("blur", (event) => {
  if (event.target.value < 2) {
    event.target.classList.add("red-outline");
  }
});

function inputChecker() {
  if (
    nameOne.value &&
    nameOne.value.toLowerCase() === nameTwo.value.toLowerCase()
  ) {
    nameTwo.classList.add("red-outline");
  }
  if (
    symbolOne.value &&
    symbolOne.value.toLowerCase() === symbolTwo.value.toLowerCase()
  ) {
    symbolTwo.classList.add("red-outline");
  }
  if (parseInt(boardSize.value) < parseInt(patterLength.value)) {
    patterLength.value = boardSize.value;
    if (patterLength.value < 3) {
      patterLength.value = 3;
    }
  }

  if (!document.querySelector(".red-outline")) {
    saveBtn.classList.remove("disabled");
    formatValues();
  }
}

function formatValues() {
  nameOne.value = capitalizeFirstLetter(nameOne.value.trim());
  symbolOne.value = symbolOne.value.toUpperCase();
  nameTwo.value = capitalizeFirstLetter(nameTwo.value.trim());
  symbolTwo.value = symbolTwo.value.toUpperCase();
  boardSize.value = parseInt(boardSize.value) || 10;
  patterLength.value = parseInt(patterLength.value) || 5;
  maxPoints.value = parseInt(maxPoints.value) || 3;
}

function assignValues() {
  playerOne.name = nameOne.value;
  playerOne.symbol = symbolOne.value;
  playerOne.color = colorOne.value;
  playerTwo.name = nameTwo.value;
  playerTwo.symbol = symbolTwo.value;
  playerTwo.color = colorTwo.value;
  settings.boardSize = parseInt(boardSize.value);
  settings.patternLength = parseInt(patterLength.value);
  settings.maxPoints = parseInt(maxPoints.value);
}

function quickStartValues() {
  const names = [
    "BoiledEgg",
    "FrostedCupcake",
    "ChickenNuggets",
    "CornedTuna",
    "CheeseBread",
    "MangoShake",
    "PineapplePie",
    "BakedPotato",
    "SourCream",
    "SaltedNuts",
  ];
  nameOne.value = names[Math.floor(Math.random() * 10)];
  nameTwo.value = names[Math.floor(Math.random() * 10)];
  while (nameOne.value === nameTwo.value) {
    nameTwo.value = names[Math.floor(Math.random() * 10)];
  }
  symbolOne.value = "X";
  symbolTwo.value = "O";
  boardSize.value = 10;
  patterLength.value = 5;
  settings.firstPlayer = nameOne.value;
  settings.firstSymbol = symbolOne.value;
  maxPoints.value = 3;
}

const inputDisableToggle = () => {
  if (isEditing) {
    boardSize.disabled = true;
    patterLength.disabled = true;
  } else {
    boardSize.disabled = false;
    patterLength.disabled = false;
  }
};
const editSettingsFunc = () => {
  closeBtn.style.display = "block";
  isEditing = 1;
  img.style.opacity = "0.2";
  gameContainer.style.opacity = "0.4";
  gameContainer.style.pointerEvents = "none";
  disablePointerEvents();
  gameSetup.style.display = "block";
  inputDisableToggle();
  quickStartBtn.classList.add("disabled");
};
editSettingsA.addEventListener("click", () => {
  editSettingsFunc();
});
editSettingsB.addEventListener("click", () => {
  editSettingsFunc();
});
const currentValuesChecker = () => {
  player = player === playerOne.name ? nameOne.value : nameTwo.value;
  settings.firstPlayer =
    settings.firstPlayer === playerOne.name ? nameOne.value : nameTwo.value;
  symbol = symbol === playerOne.symbol ? symbolOne.value : symbolTwo.value;
  settings.firstSymbol =
    settings.firstSymbol === playerOne.symbol
      ? symbolOne.value
      : symbolTwo.value;
};
const replaceSymbols = (currentSymbolOne, currentSymbolTwo) => {
  history = history.map((board) => {
    board = board.map((row) => {
      row = row.map((item) => {
        if (item === currentSymbolOne) {
          item = playerOne.symbol;
        } else if (item === currentSymbolTwo) {
          item = playerTwo.symbol;
        }
        return item;
      });
      return row;
    });
    return board;
  });
  boardState = structuredClone(history[moves]);
};
const pointsToWinChecker = () => {
  maxPoints.value =
    maxPoints.value > playerOne.score && maxPoints.value > playerTwo.score
      ? parseInt(maxPoints.value)
      : parseInt(settings.maxPoints);
};
verifyBtn.addEventListener("click", () => {
  pointsToWinChecker();
});
saveBtn.addEventListener("click", () => {
  if (isEditing) {
    let currentSymbolOne = playerOne.symbol;
    let currentSymbolTwo = playerTwo.symbol;

    currentValuesChecker();
    assignValues();
    replaceSymbols(currentSymbolOne, currentSymbolTwo);
    updateInfo();
    updateMessage();
    updateDisplay(boardState);
    highlightCells();
    saveBtn.classList.add("disabled");
  }
  closeSettings();
});

closeBtn.addEventListener("click", () => {
  closeSettings();
});

function closeSettings() {
  closeBtn.style.display = "none";
  isEditing = 0;
  img.style.opacity = "1";
  gameContainer.style.opacity = "1";
  gameContainer.style.pointerEvents = "all";
  if (!roundEnded) updatePointerEvents();
  gameSetup.style.display = "none";
  inputDisableToggle();
  quickStartBtn.classList.remove("disabled");
}
