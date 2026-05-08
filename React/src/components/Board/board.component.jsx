import React from "react";
import "./board.css";

import { BOARD_SIZE } from "../../constants";
import Square from "../Square/square.componet";

function Board({ title, debug = false }) {
  const squares = [];
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i += 1) {
    // Só para demonstrar CSS (remove depois quando ligares a lógica)
    let extraClass = "cell--unknown";
    if (i === 12) extraClass = "cell--miss";
    if (i === 44) extraClass = "cell--hit";
    if (i === 77) extraClass = "cell--sunk";
    if (debug && i === 23) extraClass = "cell--ship-debug";

    squares.push(<Square key={i} className={extraClass} label={i} />);
  }

  return (
    <section className="panel-board">
      <h3 className="board-title">{title}</h3>
      <div className="board" role="grid" aria-label={title}>
        {squares}
      </div>
    </section>
  );
}

export default Board;
