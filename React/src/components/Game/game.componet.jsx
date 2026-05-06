import { useState } from "react";
import { REQUIRED_FLEET } from "../../constants";
import { createEmptyBoard, createPlayer } from "../../helpers";

export default function Game() {
  const [player, setPlayer] = useState(function () {
    return createPlayer("");
  });
  const [playerBoard, setPlayerBoard] = useState(() => createEmptyBoard());

  // Por agora ainda não há navios colocados (Fase 2)
  const [playerShips, setPlayerShips] = useState([]);

  return (
    <div style={{ padding: 16 }}>
      <h1>Batalha Naval Avançada</h1>

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
          <strong>Navios colocados:</strong> {playerShips.length}
        </div>
      </section>
    </div>
  );
}
