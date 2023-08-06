const path = require("path");
const express = require("express"); // imports express
const cors = require("cors"); // imports cors

require("dotenv").config();
const PORT = process.env.PORT || 8000;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express(); // creates express application
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname + "/public")));

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

const ySize = 6;
const xSize = 7;

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

async function setPieceHere(x) {
  if (gameOver === true) {
    return false;
  } // if human player wins, human cannot place another piece whilst it is game over

  const y = currentColumns[x]; // gets row of specific column

  if (y < 0) {
    return;
  } // if y < 0, means column is filled, so cannot place piece.

  if (currentPlayer === "Red") {
    boardArr[y][x] = "Red"; // set red piece
    currentPlayer = "Yellow"; // change player to yellow
    checkWinner(); // passing in human board
  } else if (currentPlayer === "Yellow") {
    boardArr[y][x] = "Yellow"; // set yellow piece
    currentPlayer = "Red"; // change player to red
    checkWinner(); // passing in human board
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
    if (boardArr[y][x] === `Red`) {
      winner = "Red";
      currentPlayer = "Red"; // when Red wins, currentPlayer remains Red
      gameOver = true;
    } else if (boardArr[y][x] === `Yellow`) {
      winner = "Yellow";
      currentPlayer = "Yellow"; // when Yellow wins, currentPlayer remains Yellow
      gameOver = true;
    }
  }
}

app.post("/setPiece", async (req, res) => {
  if (currentPlayer === "Yellow") {
    return false;
  } // If it is the computer's (Yellow's) turn, the human player (Red) cannot make another move
  const data = req.body; // x and y positions
  const x = data["x"];
  await setPieceHere(x);
  await openAiSetPiece();
  res.status(200);
  res.send();
});

async function openAiSetPiece() {
  if (gameOver === true) {
    return false;
  } // when human player wins, openAi isn't called to place an x value to place a piece

  const content = `You are playing Connect 4. You are the ${currentPlayer} player. The game board is modeled as a JavaScript array. Assume your opponent will always play optimally, and try to minimise the maximum gain of your opponent, output your next move as a JSON object with only an "x" field.

  ${JSON.stringify(boardArr)}

  Yellow's move:`;
  console.log("CONTENT", content);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });
  const responseString = response.data.choices[0].message.content;
  console.log("RESPONSE STRING", responseString);
  const responseData = JSON.parse(response.data.choices[0].message.content);

  await setPieceHere(responseData.x);
}

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
  currentPlayer = "Red";

  res.status(200);
  res.send();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
