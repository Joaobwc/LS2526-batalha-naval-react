import React, { useState } from "react";
import "./assets/styles/App.css";
//import criarNavio from "./helpers/criarNavio";

import { Header, Footer, Game } from "./components";

function App() {
  /*
  const [debug, setDebug] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    orientation: "",
    fuel: FUEL.MAX,
    moveCount: 0,
    radarCharges: 0,
  });
  const [navios, setNavios] = useState([
    criarNavio(1, 3, 10, "h"),
    criarNavio(2, 2, 45, "v"),
  ]);

  //Var para o tabuleito pre-definido do computador
  const [selectedBoard, setSelectedBoard] = useState("1");

  //ALterar o valor do tabuleiro quando alterado
  const handleBoardChange = (e) => {
    const value = e.currentTarget.value;
    console.log("handleboardgame chamado com: ", value);
    setSelectedBoard(value);
  };
  //receber o valor do filho setup do inicio do jogo
  const handleStartGame = (data) => {
    console.log("handleStartGame Chamando com: ", data);
    if (gameStarted) setGameStarted(false);
    else {
      setPlayerInfo({
        name: data.playerName,
        orientation: data.orientation,
      });
      setGameStarted(true),  ;
    }
  };

  const handleDebugChange = (valor) => {
    setDebug(valor);
  };
  return (
    <div id="container">
      <Header />
      <main>
        <div className="setup-wrapper">
          <Setup
            gameStarted={gameStarted}
            onStart={handleStartGame}
            selectedBoard={selectedBoard}
            onBoardChange={handleBoardChange}
          />
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
  */
  return (
    <div id="container">
      <Header />
      <main>
        <Game />
      </main>
      <Footer />
    </div>
  );
}

export default App;
