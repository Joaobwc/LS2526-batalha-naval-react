import React from "react";
import "./controlPanel.css";

function ControlPanel({
  timeText = "15s",
  fuelText = "100",
  radarText = "Indisponível",
}) {
  return (
    <section id="panel-control">
      <h3 className="sr-only">Painel de Informações</h3>

      <div className="form-metadata">
        <dl className="list-item left">
          <dt>Cronómetro:</dt>
          <dd id="turnTime">{timeText}</dd>
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
            <input id="debugToggle" type="checkbox" />
            Debug (mostrar frota do PC)
          </label>
        </div>
      </div>
    </section>
  );
}

export default ControlPanel;
