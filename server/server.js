const path = require("path");
const express = require("express"); // imports express
const cors = require("cors"); // imports cors
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORG_ID,
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const secret_key = process.env.SENDGRID_API_KEY;

// sgMail.setApiKey(secret_key);

// const message = {
//   to: "prra@prra.codes",
//   from: "prra@prra.codes",
//   subject: "Hello from sendgrid",
//   text: "Hello from sendgrid",
//   html: "<h1>Hello from sendgrid</h1>",
// };

// sgMail
//   .send(message)
//   .then((response) => console.log("Email sent.."))
//   .catch((error) => console.log(error.message));

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

async function setPieceHere(x) {
  const y = currentColumns[x]; // gets row of specific column

  if (y < 0) {
    return;
  } // if y < 0, means column is filled, so cannot place piece.

  if (currentPlayer === "Red") {
    boardArr[y][x] = "Red"; // set red piece
    currentPlayer = "Yellow"; // change player to yellow
    checkWinner();
  } else if (currentPlayer === "Yellow") {
    boardArr[y][x] = "Yellow"; // set yellow piece
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
    if (boardArr[y][x] === `Red`) {
      winner = "Red";
      gameOver = true;
    } else if (boardArr[y][x] === `Yellow`) {
      winner = "Yellow";
      gameOver = true;
    }
  }
}

app.post("/setPiece", async (req, res) => {
  const data = req.body; // x and y positions

  const x = data["x"];

  await setPieceHere(x);

  console.log(boardArr);

  await openAiSetPiece();
  res.status(200);
  res.send();
});

async function openAiSetPiece() {
  const content = `You are playing Connect 4. You are the ${currentPlayer} player. The game board is modeled as a JavaScript array. Output your next move as a JSON object with only an "x" field.
 
  ${JSON.stringify(boardArr)} 

  ${currentPlayer}'s move:`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });
  console.log("FROM API");
  const responseString = response.data.choices[0].message.content;
  const responseData = JSON.parse(response.data.choices[0].message.content); // over here call to new func. e.g. responseArr,
  console.log(responseData);
  console.log(responseData.x);

  await setPieceHere(responseData.x);
  // openAiSetPiece()
  //over here call the new function when it exists...  setPiece(responseData.x) when exists. So it'll pass in the value of x from the API
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

  res.status(200);
  res.send();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
