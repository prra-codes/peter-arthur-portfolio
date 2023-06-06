import "./Tile.css";

const Tile = ({ color, id, setPiece, boxShadow }) => {
  let coords = id.split("-");
  let y = Number(coords[0]);
  let x = Number(coords[1]);

  return (
    <div
      className="tile"
      style={{
        background: color,
        boxShadow: boxShadow,
      }}
      onClick={() => setPiece(y, x)}
    ></div>
  );
};

export default Tile;
