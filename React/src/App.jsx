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
        <Setup />

        <ControlPanel
          debug={debug}
          onDebugChange={handleDebugChange}
          timeText="15s"
          fuelText="100"
          radarText="Indisponível"
        />

        <section className="boards">
          <Board title="Tabuleiro do Jogador" />
          <Board title="Tabuleiro do Computador" debug />
        </section>
      </main>
    </div>
  );
}

export default App;
