import React from "react";
import "./game-over.css";

function GameOver({ info, onRestart }) {
  if (!info) return null;

  const winnerLabel = info.winner === "PLAYER" ? "Jogador" : "Computador";
  const reasonLabel =
    info.reason === "FUEL" ? "Ficou sem combustível" : "Frota destruída";

  return (
    <div className="gameover-overlay" role="dialog" aria-modal="true">
      <div className="gameover-panel">
        <div className="gameover-header">
          <h2>Jogo Terminado</h2>
        </div>

        <div className="gameover-body">
          <p>
            <strong>Jogador:</strong> {info.playerName || "—"}
          </p>

          <p>
            <strong>Vencedor:</strong> {winnerLabel}
          </p>

          <p>
            <strong>Motivo:</strong> {reasonLabel}
          </p>

          <p>
            <strong>Nº jogadas (jogador):</strong> {info.moves}
          </p>
        </div>

        <div className="gameover-actions">
          <button type="button" className="gameover-btn" onClick={onRestart}>
            Jogar novamente
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
