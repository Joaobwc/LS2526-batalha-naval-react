import React, { useState } from "react";
import "./board.css";
import { BOARD_SIZE } from "../../constants";
import Square from "../Square/square.component";
import { existeNavio } from "../../helpers";

function Board({
  title,
  ships = [],
  debug = false,
  onSquareClick,
  clicks = [],
}) {
  const squares = [];
  const [celulaClicada, setCelulaClicada] = useState([]);

  const isSunkCell = (index) => {
    const ship = ships.find((s) => s.position.includes(index));
    return ship ? ship.sunk : false;
  };

  // O BOARD_SIZE tem de ser obrigatoriamente 10 no teu ficheiro constants.js!
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i += 1) {
    let extraClass = "cell--unknown";

    const isShip = existeNavio(ships, i);
    const isClicked = clicks.includes(i);
    const isSunk = isSunkCell(i);

    if (isSunk) extraClass = "cell--sunk";
    else if (isClicked && isShip) extraClass = "cell--hit";
    else if (isClicked && !isShip) extraClass = "cell--miss";
    else if (debug && isShip) extraClass = "cell--ship-debug";

    //else if (isShip) extraClass = "cell--ship";
    //if (i === 77) extraClass = "cell--sunk";

    squares.push(
      <Square
        key={i}
        className={extraClass}
        label={i}
        click={() => onSquareClick(i)}
      />,
    );
  }

  return (
    // Mudei panel-board para board-container e board para board-grid
    <section className="board-container">
      <h3 className="board-title">{title}</h3>
      <div className="board-grid" role="grid" aria-label={title}>
        {squares}
      </div>
    </section>
  );
}

export default Board;
