import React, { useState } from "react";
import "./setup.css";

function Setup({ onStart }) {
  const [playerName, setPlayerName] = useState("");
  const [orientation, setOrientation] = useState("H");

  function handleNameChange(event) {
    const nameString = event.currentTarget.value;
    console.log("Nome:", nameString);
    setPlayerName(nameString);
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
          />
        </div>

        <div className="setup-group">
          <span className="setup-label">Orientação:</span>
          <div className="setup-buttons">
            <button
              type="button"
              value={orientation}
              className={`setup-btn ${orientation === "H" ? "is-active" : ""}`}
              onClick={() => {
                setOrientation("H");
                console.log("Clik no botão Horizontal");
              }}
            >
              Horizontal
            </button>
            <button
              type="button"
              value={orientation}
              className={`setup-btn ${orientation === "V" ? "is-active" : ""}`}
              onClick={() => {
                console.log("Clik no botão Vertical");
                setOrientation("V");
              }}
            >
              Vertical
            </button>
          </div>
        </div>

        <div className="setup-group">
          <span className="setup-label">Computador:</span>
          <select>
            <option value="0">Tabuleiro pré-definido #1</option>
            <option value="1">Tabuleiro pré-definido #2</option>
            <option value="2">Tabuleiro pré-definido #3</option>
            <option value="random">Frota aleatória</option>
          </select>
        </div>

        <div className="setup-group setup-actions">
          <button
            type="button"
            disabled={playerName.trim() === ""}
            onClick={() => onStart({ playerName, orientation })}
          >
            Iniciar Jogo
          </button>
          <button
            type="button"
            onClick={() => {
              (setPlayerName(""), setOrientation("H"));
            }}
          >
            Limpar
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
