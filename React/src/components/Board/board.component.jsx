import React, { useState } from "react";
import "./board.css";
import { BOARD_SIZE } from "../../constants";
import Square from "../Square/square.component";

function Board({ title, ships = [], debug = false }) {
  const squares = [];
  const [celulaClicada, setCelulaClicada] = useState([]);

  const existe = (ships, index) => {
    for (let j = 0; j < ships.length; j++) {
      for (let k = 0; k < ships[j].position.length; k++) {
        if (index === ships[j].position[k]) {
          return true;
        }
      }
    }
    return false;
  };

  const handleCelulaClick = (index) => {
    const acerta = existe(ships, index);
    setCelulaClicada((prev) =>
      prev.includes(index) ? prev : [...prev, index],
    );
    console.log(`Célula ${index} clicada: ${acerta ? "HIT" : "MISS"}`);
    return index;
  };

  // O BOARD_SIZE tem de ser obrigatoriamente 10 no teu ficheiro constants.js!
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i += 1) {
    let extraClass = "cell--unknown";
    const isShip = existe(ships, i);
    const isClicked = celulaClicada.includes(i);
    const isHit = isClicked && existe(ships, i);

    if (isClicked && isShip) extraClass = "cell--hit";
    else if (isClicked && !isShip) extraClass = "cell--miss";
    else if (debug && isShip) extraClass = "cell--ship-debug";
    else if (isShip) extraClass = "cell--ship";

    if (i === 77) extraClass = "cell--sunk";

    squares.push(
      <Square
        key={i}
        className={extraClass}
        label={i}
        click={() => handleCelulaClick(i)}
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
