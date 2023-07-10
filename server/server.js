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
const app = express(); // creates express application

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname + "/public")));

app.post("/setPiece", (req, res) => {
  const data = req.body; // x and y positions

  const x = data["x"];
  const y = currentColumns[x]; // gets row of specific column

  if (y < 0) {
    return;
  } // if y < 0, means column is filled, so cannot place piece.

  if (currentPlayer === "Red") {
    boardArr[y][x] = "linear-gradient(to bottom right, #df7880, #c82525)";
    currentPlayer = "Yellow";
  } else if (currentPlayer === "Yellow") {
    boardArr[y][x] = "linear-gradient(to bottom right, #f4e887, #a99523)";
    currentPlayer = "Red";
  }

  currentColumns[x] = y - 1; // so row moves up by 1 row
  res.status(200);
  res.send();
});

app.get("/fetchGameStateVariables", (req, res) => {
  res.json({
    boardArr,
    currentPlayer,
    currentColumns,
  }); // sending boardArr, currentPlayer and currentColumns variables to client
});

app.post("/newGame", async (req, res) => {
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

  res.status(200);
  res.send();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
