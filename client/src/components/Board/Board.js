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
        axios.get("/fetchGameStateVariables").then((res) => {
          setBoardArr(res.data.boardArr);
          setCurrentColumns(res.data.currentColumns);
          setCurrentPlayer(res.data.currentPlayer);
          setWinner(res.data.winner);
          setGameOver(res.data.gameOver);
          setShowNewGameButton(res.data.showNewGameButton);
        }),
      500
    );

    return () => {
      clearInterval(interval);
    };
  }, [
    setCurrentColumns,
    setBoardArr,
    setCurrentPlayer,
    setWinner,
    setGameOver,
    setShowNewGameButton,
  ]);

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
    await axios.post("/setPiece", { x, y }); // passing x and y to the server
  }

  async function newGame() {
    await axios.post("/newGame");
  }

  const tiles = [];

  const ySize = 6;
  const xSize = 7;

  for (let y = 0; y < ySize; y++) {
    let rowArr = [];
    for (let x = 0; x < xSize; x++) {
      rowArr.push(
        <Tile
          color={
            boardArr[y][x] === null
              ? ""
              : boardArr[y][x] === "Red"
              ? "linear-gradient(to bottom right, #df7880, #c82525)"
              : "linear-gradient(to bottom right, #f4e887, #a99523)"
          }
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
