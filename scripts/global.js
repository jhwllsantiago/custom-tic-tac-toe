"use strict";

const gameSetup = document.querySelector("#game-setup");
const firstMove = document.querySelector("#first-move");
const firstMoveBtnOne = document.querySelector("#first-move-one");
const firstMoveBtnTwo = document.querySelector("#first-move-two");
const gameContainer = document.querySelector("#game-container");
const inputFields = document.querySelectorAll(".input-field");
const closeBtn = document.querySelector(".fa-circle-xmark");
const nameOne = document.querySelector("[data-name-one]");
const symbolOne = document.querySelector("[data-symbol-one]");
const colorOne = document.querySelector("[data-color-one]");
const nameTwo = document.querySelector("[data-name-two]");
const symbolTwo = document.querySelector("[data-symbol-two]");
const colorTwo = document.querySelector("[data-color-two]");
const maxPoints = document.querySelector("[data-max-points]");
const verifyBtn = document.querySelector("#verify");
const saveBtn = document.querySelector("#save");
const quickStartBtn = document.querySelector("#quick-start");

let playerOne = { score: 0 };
let playerTwo = { score: 0 };
let settings = {};

let moves = 0;
let history;
let symbol;

let player;
let boardState;
let boardSize;
let patternLength;
let cellSize;

let indexOfCellsToHighlight = [];

let roundEnded = 0;
let gameEnded = 0;
let isDraw = 0;
let isEditing = 0;

const controlsA = document.querySelector("#controls-a");
const controlsB = document.querySelector("#controls-b");
const undo = document.querySelector("#undo");
const startOver = document.querySelector("#start-over");
const nextRound = document.querySelector("#next-round");
const redo = document.querySelector("#redo");
const replay = document.querySelector("#replay");
const editSettingsA = document.querySelector("#edit-settings-a");
const editSettingsB = document.querySelector("#edit-settings-b");
const newGame = document.querySelector("#new-game");

const message = document.querySelector("#info-message");

const img = document.querySelector("#img");
