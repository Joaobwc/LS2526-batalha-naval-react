import React from "react";
import "./controlPanel.css";
import Timer from "../Timer/timer.component";
import { TURN } from "../../constants";

function ControlPanel({
  timeout,
  fuelText = "100",
  radarText = "Indisponível",
  debug, // 1. Receber o valor atual do debug
  onDebugChange, // 1. Receber a função que o pai enviou
  gameStarted,
  onTimerTick,
  isPlayerTurn,
}) {
  const handleTimer = (seconds) => {
    if (onTimerTick) onTimerTick(seconds);
  };

  return (
    <section id="panel-control">
      <h3 className="sr-only">Painel de Informações</h3>

      <div className="form-metadata">
        <dl className="list-item left">
          <dt>Cronómetro:</dt>
          <dd id="turnTime">
            {gameStarted && isPlayerTurn && (
              <Timer timeout={timeout} onTimer={handleTimer} />
            )}
            s
          </dd>
        </dl>

        <dl className="list-item right">
          <dt>Combustível:</dt>
          <dd id="fuel">{fuelText}</dd>
        </dl>

        <dl className="list-item left">
          <dt>Radar:</dt>
          <dd id="radarState">{radarText}</dd>
        </dl>

        <div className="right">
          <button type="button" id="btRadar">
            Ativar Radar
          </button>
        </div>

        <div className="left debug-box">
          <label htmlFor="debugToggle">
            <input
              id="debugToggle"
              type="checkbox"
              checked={debug}
              disabled={!gameStarted}
              onChange={onDebugChange}
            />
            Debug (mostrar frota do PC)
          </label>
        </div>
      </div>
    </section>
  );
}

export default ControlPanel;
