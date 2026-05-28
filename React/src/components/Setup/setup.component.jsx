import React, { useState } from "react";
import "./setup.css";

function Setup({
  onStart,
  gameStarted,
  selectedBoard,
  onBoardChange,
  orientation,
  onOrientationChange,
  playerName,
  onPlayerNameChange,
}) {
  function handleNameChange(event) {
    const nameString = event.currentTarget.value;
    console.log("Nome:", nameString);
    onPlayerNameChange(nameString);
  }

  /*
  Ou faço uma arrow func logo no envento
  function handleOrientationChange() {
    setOrientation ("v");
  }
  */

  return (
    <section id="panel-setup">
      <h3>Configuração Inicial</h3>

      <form className="setup-form">
        <div className="setup-group">
          <label htmlFor="playerName">Nome do Jogador:</label>
          <input
            id="playerName"
            type="text"
            value={playerName}
            onChange={handleNameChange}
            placeholder="Ex.: Joao"
            autoComplete="off"
            //gameStared = false, quando passa a true o disabled={true}
            disabled={gameStarted}
          />
        </div>
        <div className="setup-group">
          <span className="setup-label">Orientação:</span>
          <div className="setup-buttons">
            <button
              type="button"
              className={`setup-btn ${orientation === "H" ? "is-active" : ""}`}
              onClick={() => {
                onOrientationChange("H");
                console.log("Clik no botão Horizontal");
              }}
            >
              Horizontal
            </button>
            <button
              type="button"
              className={`setup-btn ${orientation === "V" ? "is-active" : ""}`}
              onClick={() => {
                onOrientationChange("V");
                console.log("Clik no botão Vertical");
              }}
            >
              Vertical
            </button>
          </div>
        </div>
        <div className="setup-group">
          <span className="setup-label">Computador:</span>
          <select
            value={selectedBoard}
            disabled={gameStarted}
            onChange={onBoardChange}
          >
            <option value="1">Tabuleiro pré-definido #1</option>
            <option value="2">Tabuleiro pré-definido #2</option>
            <option value="3">Tabuleiro pré-definido #3</option>
            <option value="4">Frota aleatória</option>
          </select>
        </div>
        <div className="setup-group setup-actions">
          <button
            type="button"
            className={`setup-action-btn ${
              gameStarted ? "is-danger" : "is-primary"
            }`}
            disabled={playerName.trim() === ""}
            onClick={() => onStart({ playerName, orientation })}
          >
            {gameStarted ? "Terminar Jogo" : "Iniciar Jogo"}
          </button>
        </div>
        <p className="setup-hint">
          Posiciona a frota clicando no teu tabuleiro (ainda sem lógica).
        </p>
      </form>
    </section>
  );
}

export default Setup;
