import React from "react";
import "./board.css";

import { BOARD_SIZE } from "../../constants";
import Square from "../Square/square.componet";

function Board({ title, debug = false }) {
  const squares = [];

  // O BOARD_SIZE tem de ser obrigatoriamente 10 no teu ficheiro constants.js!
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i += 1) {
    let extraClass = "cell--unknown";
    if (i === 11) extraClass = "cell--miss";
    if (i === 46) extraClass = "cell--hit";
    if (i === 87) extraClass = "cell--sunk";
    if (debug && i === 20) extraClass = "cell--ship-debug";

    squares.push(<Square key={i} className={extraClass} label={i} />);
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
