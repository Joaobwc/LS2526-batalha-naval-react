import { useState } from "react";
import { REQUIRED_FLEET } from "../../constants";
import { createEmptyBoard, createPlayer } from "../../helpers";
import criarNavio from "../../helpers/criarNavio";
import Board from "../Board/board.component";

function Game() {
  const [player, setPlayer] = useState(function () {
    return createPlayer("");
  });
  const [playerBoard, setPlayerBoard] = useState(() => createEmptyBoard());

  const [navios, setNavios] = useState([
    criarNavio(1, 3, 10, "h"),
    criarNavio(2, 2, 45, "v"),
  ]);

  return (
    <div style={{ padding: 16 }}>
      <h1>Batalha Naval Avançada</h1>

      <div className="boards">
        <Board
          title="O Meu Tabuleiro"
          ships={navios} // Passamos o estado 'navios' para a prop 'ships'
          debug={true}
        />
      </div>

      <section>
        <h2>Estado (Fase 1)</h2>
        <div>
          <strong>Nome:</strong> {player.name || "(por definir)"}
        </div>
        <div>
          <strong>Combustível:</strong> {player.fuel}
        </div>
        <div>
          <strong>Tiros do jogador:</strong> {player.playerShots}
        </div>
        <div>
          <strong>Radar charges:</strong> {player.radarCharges}
        </div>
        <div>
          <strong>Frota obrigatória:</strong> {REQUIRED_FLEET.join(", ")}
        </div>
        <div>
          <strong>Board:</strong> {playerBoard.length} {playerBoard[0]?.length}
        </div>
        <div>
          <strong>Navios colocados:</strong> {navios.length}
        </div>
      </section>
    </div>
  );
}

export default Game;
