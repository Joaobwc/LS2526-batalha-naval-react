import React from "react";
import "./setup.css";

function Setup() {
  return (
    <section id="panel-setup">
      <h3>Configuração Inicial</h3>

      <form className="setup-form">
        <div className="setup-group">
          <label htmlFor="playerName">Nome do Jogador:</label>
          <input
            id="playerName"
            type="text"
            placeholder="Ex.: Joao"
            autoComplete="off"
          />
        </div>

        <div className="setup-group">
          <span className="setup-label">Orientação:</span>
          <div className="setup-buttons">
            <button type="button">Horizontal</button>
            <button type="button">Vertical</button>
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
          <button type="button">Iniciar Jogo</button>
          <button type="button">Limpar</button>
        </div>

        <p className="setup-hint">
          Posiciona a frota clicando no teu tabuleiro (ainda sem lógica).
        </p>
      </form>
    </section>
  );
}

export default Setup;
