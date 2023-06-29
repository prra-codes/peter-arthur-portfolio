const express = require("express"); // imports express
const cors = require("cors"); // imports cors

const boardArr = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];
const currentColumns = [5, 5, 5, 5, 5, 5, 5];
let currentPlayer = "Red";
const app = express(); // creates express application

app.use(cors());
app.use(express.json());

app.post("/setPiece", async (req, res) => {
  const data = req.body; // x and y positions

  const x = data["x"];
  const y = currentColumns[x]; // gets row of specific column

  if (y < 0) {
    return;
  } // if y < 0, means column is filled, so cannot place piece.

  console.log("X", x);
  console.log("Y", y);
  console.log("CURRENT PLAYER", currentPlayer);
  console.log("CURRENT COLUMNS", currentColumns);

  if (currentPlayer === "Red") {
    boardArr[y][x] = "linear-gradient(to bottom right, #df7880, #c82525)";
    currentPlayer = "Yellow";
  } else if (currentPlayer === "Yellow") {
    boardArr[y][x] = "linear-gradient(to bottom right, #f4e887, #a99523)";
    currentPlayer = "Red";
  }

  currentColumns[x] = y - 1; // so row moves up by 1 row
  console.log("BOARD", boardArr);
  res.send(JSON.stringify({ boardArr })); // sending boardArr to /setPiece url
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
