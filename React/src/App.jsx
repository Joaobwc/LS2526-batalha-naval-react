import React, { useState } from "react";
import "./assets/styles/App.css";

import {
  Board,
  ControlPanel,
  Setup,
  GameOver,
  Header,
  Footer,
} from "./components";

function App() {
  const [debug, setDebug] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);

  const handleDebugChange = (valor) => {
    setDebug(valor);
  };
  return (
    <div id="container">
      <Header />
      <main>
        {/* Envolvemos o Setup numa caixa limpa */}
        <div className="setup-wrapper">
          <Setup />
        </div>

        <ControlPanel
          debug={debug}
          onDebugChange={handleDebugChange}
          timeText="15s"
          fuelText="100"
          radarText="Indisponível"
        />

        <section className="boards">
          {/* Envolvemos os Boards nas caixas cinzentas corretas */}
          <div className="board-container">
            <Board title="Tabuleiro do Jogador" />
          </div>
          <div className="board-container">
            <Board title="Tabuleiro do Computador" debug={debug} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
