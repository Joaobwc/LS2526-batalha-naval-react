import { useState } from "react";
import { FUEL, REQUIRED_FLEET } from "../../constants";
import { createEmptyBoard, createPlayer, criarNavio } from "../../helpers";
import { Setup, ControlPanel, Board } from "../../components";

function Game() {
  //Variáveis de estado
  const [debug, setDebug] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [palyerInfo, setPlayerInfo] = useState({
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

  //Tabuleito pre-definido do computador
  const [selectedBoard, setSelectedBoard] = useState("1");

  // const [player, setPlayer] = useState(function () {
  // return createPlayer("");
  //});
  ///const [playerBoard, setPlayerBoard] = useState(() => createEmptyBoard());

  //Funções auxiliares dos handlers

  //reset do jogo
  const resetJogo = () => {
    setGameStarted(false);
    setDebug(false);
    setSelectedBoard("1");
    setPlayerInfo({
      name: "",
      orientation: "",
      fuel: FUEL.MAX,
      moveCount: 0,
      radarCharges: 0,
    });
    setNavios([criarNavio(1, 3, 10, "h"), criarNavio(2, 2, 45, "v")]);
  };
  //handlers(calbacks)

  //trocar o valor do Board ao mudar
  const handleBoardChange = (e) => {
    const value = e.currentTarget.value;
    console.log("handleboardgame chamado com: ", value);

    setSelectedBoard(value);
  };

  const handleStartGame = (data) => {
    //se game true então termina o jogo e faz reset dos inputs
    if (gameStarted) {
      resetJogo();

      console.log("handleStartGame Chamando com: ", data);

      return;
    }
    //iniciar jogo
    setPlayerInfo({
      name: data.playerName,
      orientation: data.orientation,
      fuel: FUEL.MAX,
      moveCount: 0,
      radarCharges: 0,
    });
    setGameStarted(true);

    console.log("handleStartGame Chamando com: ", data);
  };

  const handleDebugChange = (e) => {
    const isChecked = e.currentTarget.checked;
    console.log("handleDebugChange chamado com: ", isChecked);

    setDebug(isChecked);
  };

  return (
    <div>
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
        fuelText={`${palyerInfo.fuel}`}
        radarText="Indisponível"
      />

      <section className="boards">
        <div className="board-container">
          <Board title="Tabuleiro do Jogador" ships={navios} debug={debug} />
        </div>
        <div className="board-container">
          <Board title="Tabuleiro do Computador" ships={navios} debug={debug} />
        </div>
      </section>
    </div>
  );
}

export default Game;
