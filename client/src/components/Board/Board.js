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

  const [currentPlayer, setCurrentPlayer] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [cursorXY, setCursorXY] = useState({ x: 0, y: 0 });
  const [showNewGameButton, setShowNewGameButton] = useState(false);
  const [currentColumns, setCurrentColumns] = useState([5, 5, 5, 5, 5, 5, 5]); // array to mark the height of each column, starts at bottom row

  useEffect(() => {
    const interval = setInterval(
      () =>
        axios
          .get("http://localhost:8000/fetchGameStateVariables")
          .then((res) => {
            console.log();
            setBoardArr(res.data.boardArr);
            console.log(res.data.boardArr);
            setCurrentColumns(res.data.currentColumns);
            console.log(res.data.currentColumns);
            // decideWinner(res.data.currentY, res.data.currentX);
            // checkWinner();
            setCurrentPlayer(res.data.currentPlayer);
            console.log(res.data.currentPlayer);
            console.log(res.data.currentX, res.data.currentY);
          }),
      500
    );

    // console.log(boardArr, currentPlayer, currentColumns);
    return () => {
      clearInterval(interval);
    };
  }, [setCurrentColumns, setBoardArr, setCurrentPlayer]);

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

  async function newGame() {
    const newBoard = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];

    const resetCurrentColumns = [5, 5, 5, 5, 5, 5, 5];
    let player = winner === RED ? YELLOW : RED;

    // let player = null;
    // if (winner === RED) {
    //   player = YELLOW;
    // } else if (winner === YELLOW) {
    //   player = RED;
    // }

    await axios.post("http://localhost:8000/newGame", {
      newBoard,
      resetCurrentColumns,
      player,
    });

    setShowNewGameButton(false);
    setWinner(null);
    setGameOver(false);
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
    // await axios.post("http://localhost:8000/decideWinner", { x, y }); // passing x and y to the server

    if (
      boardArr[y][x] === `linear-gradient(to bottom right, #df7880, #c82525)`
    ) {
      setWinner(currentPlayer);
      setGameOver(true);
    } else if (
      boardArr[y][x] === `linear-gradient(to bottom right, #f4e887, #a99523)`
    ) {
      setWinner(currentPlayer);
      setGameOver(true);
    }
  }

  // function newGame() {
  //   setBoardArr([
  //     [null, null, null, null, null, null, null],
  //     [null, null, null, null, null, null, null],
  //     [null, null, null, null, null, null, null],
  //     [null, null, null, null, null, null, null],
  //     [null, null, null, null, null, null, null],
  //     [null, null, null, null, null, null, null],
  //   ]);
  //   setCurrentColumns([5, 5, 5, 5, 5, 5, 5]);

  //   setShowNewGameButton(false);

  //   if (winner === RED) {
  //     setCurrentPlayer(YELLOW);
  //   } else if (winner === YELLOW) {
  //     setCurrentPlayer(RED);
  //   }

  //   setWinner(null);
  //   setGameOver(false);
  // }

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
