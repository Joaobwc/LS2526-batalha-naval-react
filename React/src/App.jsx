import React from "react";
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
  return (
    <div id="container">
      <Header />
      <main>
        <Setup />

        <ControlPanel timeText="15s" fuelText="100" radarText="Indisponível" />

        <section className="boards">
          <Board title="Tabuleiro do Jogador" />
          <Board title="Tabuleiro do Computador" debug />
        </section>
      </main>
    </div>
  );
}

export default App;
