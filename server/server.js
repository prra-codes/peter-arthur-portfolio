const path = require("path");
const express = require("express"); // imports express
const cors = require("cors"); // imports cors
const PORT = process.env.PORT || 8000;

let boardArr = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];
let currentColumns = [5, 5, 5, 5, 5, 5, 5];
let currentPlayer = "Red";
let gameOver = false;
let winner = null;
let showNewGameButton = false;
const app = express(); // creates express application

const ySize = 6;
const xSize = 7;

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname + "/public")));

app.get("/fetchGameStateVariables", (req, res) => {
  res.json({
    boardArr,
    currentPlayer,
    currentColumns,
    winner,
    gameOver,
    showNewGameButton,
  }); // sending boardArr, currentPlayer, currentColumns, winner, gameOver and showNewGameButton variables to client
});

app.post("/setPiece", (req, res) => {
  const data = req.body; // x and y positions

  const x = data["x"];
  const y = currentColumns[x]; // gets row of specific column

  if (y < 0) {
    return;
  } // if y < 0, means column is filled, so cannot place piece.

  if (currentPlayer === "Red") {
    boardArr[y][x] = "linear-gradient(to bottom right, #df7880, #c82525)"; // set red piece
    currentPlayer = "Yellow"; // change player to yellow
    checkWinner();
  } else if (currentPlayer === "Yellow") {
    boardArr[y][x] = "linear-gradient(to bottom right, #f4e887, #a99523)"; // set yellow piece
    currentPlayer = "Red"; // change player to red
    checkWinner();
  }

  currentColumns[x] = y - 1; // so row moves up by 1 row

  for (let y = 0; y < ySize; y++) {
    for (let x = 0; x < xSize; x++) {
      if (boardArr[y][x] !== null) {
        showNewGameButton = true;
      }
    }
  }

  function checkWinner() {
    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize - 3; x++) {
        if (boardArr[y][x] !== null) {
          if (
            boardArr[y][x] === boardArr[y][x + 1] &&
            boardArr[y][x + 1] === boardArr[y][x + 2] &&
            boardArr[y][x + 2] === boardArr[y][x + 3]
          ) {
            decideWinner(y, x);
            return;
            // don't have to check vertically or diagonally when we've found a connect 4 horizontally
          }
        }
      }
    }

    // vertically

    for (let x = 0; x < xSize; x++) {
      for (let y = 0; y < ySize - 3; y++) {
        if (boardArr[y][x] !== null) {
          if (
            boardArr[y][x] === boardArr[y + 1][x] &&
            boardArr[y + 1][x] === boardArr[y + 2][x] &&
            boardArr[y + 2][x] === boardArr[y + 3][x]
          ) {
            decideWinner(y, x);
            return; // don't have to check diagonally or anti-diagonally when we've found a connect 4 vertically
          }
        }
      }
    }

    // anti diagonally

    for (let y = 0; y < ySize - 3; y++) {
      for (let x = 0; x < xSize - 3; x++) {
        if (boardArr[y][x] !== null) {
          if (
            boardArr[y][x] === boardArr[y + 1][x + 1] &&
            boardArr[y + 1][x + 1] === boardArr[y + 2][x + 2] &&
            boardArr[y + 2][x + 2] === boardArr[y + 3][x + 3]
          ) {
            decideWinner(y, x);
            return; // don't have to check diagonally when we've found a connect 4 anti-diagonally
          }
        }
      }
    }

    // diagonally

    for (let y = 3; y < ySize; y++) {
      for (let x = 0; x < xSize - 3; x++) {
        if (boardArr[y][x] !== null) {
          if (
            boardArr[y][x] === boardArr[y - 1][x + 1] &&
            boardArr[y - 1][x + 1] === boardArr[y - 2][x + 2] &&
            boardArr[y - 2][x + 2] === boardArr[y - 3][x + 3]
          ) {
            decideWinner(y, x);
            return;
          }
        }
      }
    }
  }

  function decideWinner(y, x) {
    if (
      boardArr[y][x] === `linear-gradient(to bottom right, #df7880, #c82525)`
    ) {
      winner = "Red";
      gameOver = true;
    } else if (
      boardArr[y][x] === `linear-gradient(to bottom right, #f4e887, #a99523)`
    ) {
      winner = "Yellow";
      gameOver = true;
    }
  }

  res.status(200);
  res.send();
});

app.post("/newGame", (req, res) => {
  const newBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];

  const resetCurrentColumns = [5, 5, 5, 5, 5, 5, 5];

  currentColumns = [...resetCurrentColumns];

  boardArr = [...newBoard];

  winner = null;
  gameOver = false;
  showNewGameButton = false;

  res.status(200);
  res.send();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
