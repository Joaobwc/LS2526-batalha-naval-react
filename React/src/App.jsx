import React, { useState } from "react";
import "./assets/styles/App.css";
import criarNavio from "./helpers/criarNavio";

import {
  Board,
  ControlPanel,
  Setup,
  GameOver,
  Header,
  Footer,
  Game,
} from "./components";

function App() {
  const [debug, setDebug] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);

  const [playerInfo, setPlayerInfo] = useState({ name: "", orientation: "" });
  const [navios, setNavios] = useState([
    criarNavio(1, 3, 10, "h"),
    criarNavio(2, 2, 45, "v"),
  ]);

  //receber o valor do filho setup
  const handleStartGame = (data) => {
    console.log("handleStartGame Chamando com: ", data);
    setPlayerInfo({
      name: data.playerName,
      orientation: data.orientation,
    });
    setGameStarted(true);
  };

  const handleDebugChange = (valor) => {
    setDebug(valor);
  };
  return (
    <div id="container">
      <Header />
      <main>
        {/* Envolvemos o Setup numa caixa limpa */}
        <div className="setup-wrapper">
          <Setup onStart={handleStartGame} />
        </div>

        <ControlPanel
          debug={debug}
          onDebugChange={handleDebugChange}
          gameStarted={gameStarted}
          timeText="15s"
          fuelText="100"
          radarText="Indisponível"
        />

        <section className="boards">
          {/* Envolvemos os Boards nas caixas cinzentas corretas */}
          <div className="board-container">
            <Board title="Tabuleiro do Jogador" ships={navios} debug={debug} />
          </div>
          <div className="board-container">
            <Board
              title="Tabuleiro do Computador"
              ships={navios}
              debug={debug}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
