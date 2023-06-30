import Tile from "../Tile/Tile";
import "./Board.css";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import axios from "axios";

const RED = "Red";
const YELLOW = "Yellow";

const Board = () => {
  const [boardArr, setBoardArr] = useState([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);

  // First thing: use a useEffect to get ask the server the state of the game, i.e. boardArr
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [cursorXY, setCursorXY] = useState({ x: 0, y: 0 });
  const [showNewGameButton, setShowNewGameButton] = useState(false);
  const [currentColumns, setCurrentColumns] = useState([5, 5, 5, 5, 5, 5, 5]); // array to mark the height of each column, starts at bottom row

  useEffect(() => {
    axios.get("http://localhost:8000/fetchGameStateVariables").then((res) => {
      console.log(res.data);
      setBoardArr(res.data.boardArr);
      setCurrentPlayer(res.data.currentPlayer);
      setCurrentColumns(res.data.currentColumns);
    });
  }, []); // I want to add boardArr, currentPlayer and  as a dependency, but it generates an infinite loop...

  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX - 16;
      const y = e.clientY - 16;
      setCursorXY({ x, y });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  async function setPiece(y, x) {
    await axios.post("http://localhost:8000/setPiece", { x, y }); // passing x and y to the server

    showGameButton();
    checkWinner();
  }

  const tiles = [];

  const ySize = 6;
  const xSize = 7;

  function showGameButton() {
    for (let y = 0; y < ySize; y++) {
      for (let x = 0; x < xSize; x++) {
        if (boardArr[y][x] !== null) {
          setShowNewGameButton(true);
        }
      }
    }
  }

  function checkWinner() {
    // horizontally

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
      setWinner(RED);
      setGameOver(true);
    } else {
      setWinner(YELLOW);
      setGameOver(true);
    }
  }

  function newGame() {
    setBoardArr([
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ]);
    setCurrentColumns([5, 5, 5, 5, 5, 5, 5]);
    setGameOver(false);
    setShowNewGameButton(false);

    if (winner === RED) {
      setCurrentPlayer(YELLOW);
    } else if (winner === YELLOW) {
      setCurrentPlayer(RED);
    }

    setWinner(null);
  }

  for (let y = 0; y < ySize; y++) {
    let rowArr = [];
    for (let x = 0; x < xSize; x++) {
      rowArr.push(
        <Tile
          color={boardArr[y][x]}
          key={y + " " + x}
          id={y + "-" + x}
          setPiece={setPiece}
          boxShadow={
            boardArr[y][x] === null
              ? ""
              : "1.5px 0px 3px 1px rgba(80,80,80, 0.8) inset"
          }
        />
      );
    }
    tiles.push(rowArr);
  }
  const confettiStyles = {
    width: "100%",
    height: "100%",
  };
  return (
    <div className="connect-four">
      {" "}
      {gameOver && <Confetti style={confettiStyles} />}
      <div className="winner-text"> </div>
      <div className="board">
        {tiles}
        {winner === null ? (
          ""
        ) : winner === RED ? (
          <h1 className="winner-red">RED WINS!</h1>
        ) : (
          <h1 className="winner-yellow">
            YELLOW <br></br> WINS!
          </h1>
        )}
      </div>
      <div
        className={`cursor ${
          currentPlayer === RED ? "red-background" : "yellow-background"
        }`}
        style={{
          transform: `translate(${cursorXY.x}px, ${cursorXY.y}px)`,
        }}
      />
      {showNewGameButton ? (
        <div className="new-game-div">
          <button className="new-game" onClick={newGame}>
            NEW GAME?
          </button>
        </div>
      ) : (
        <div className="new-game-div"></div>
      )}
    </div>
  );
};

export default Board;
