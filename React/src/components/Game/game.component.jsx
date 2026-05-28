import { useEffect, useState } from "react";
import { FUEL, REQUIRED_FLEET, TURN, TIMER } from "../../constants";
import {
  createEmptyBoard,
  createPlayer,
  criarNavio,
  existeNavio,
} from "../../helpers";
import { Setup, ControlPanel, Board } from "../../components";

function Game() {
  //Variáveis de estado
  const [debug, setDebug] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [playerName, setPlayerName] = useState("");

  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    orientation: "",
    fuel: FUEL.MAX,
    moveCount: 0,
    radarCharges: 0,
  });

  const [tamanhoFrota, setTamanhoFrota] = useState(0);
  const [naviosAtingidos, setNaviosAtingidos] = useState(1);
  const [playerShips, setPlayerShips] = useState([]);
  const [computerShips, setComputerShips] = useState([]);
  const [orientation, setOrientation] = useState("H");
  const [tirosNoComputador, setTirosNoComputador] = useState([]);

  //Tabuleito pre-definido do computador
  const [selectedBoard, setSelectedBoard] = useState("1");

  //de quem é a vez
  const [turn, setTurn] = useState(TURN.PLAYER);
  const [timeLeft, setTimeLeft] = useState(TIMER.TURN_SECONDS);

  //Funções auxiliares dos handlers

  //reset do jogo
  const resetJogo = () => {
    setGameStarted(false);
    setDebug(false);
    setSelectedBoard("1");
    setPlayerName("");
    setPlayerInfo({
      name: "",
      orientation: "H",
      fuel: FUEL.MAX,
      moveCount: 0,
      radarCharges: 0,
    });
    setPlayerShips([]);
    setComputerShips([]);
    setNaviosAtingidos(0);
    setTirosNoComputador([]);
    setTurn(TURN.PLAYER);
    setTimeLeft(TIMER.TURN_SECONDS);
  };
  //handlers(calbacks)

  const handlePlaceShip = (index) => {
    if (playerShips.length === REQUIRED_FLEET.length) {
      // Verificar se já atingiu o limite de navios
      console.log("Limite de navios atingido! Já não podes colocar mais.");
      return;
    }
    const tamanhosPredefinidos = [4, 3, 2, 1]; // Definir o tamanho dos barcos

    // Vamos buscar o tamanho correspondente à quantidade de barcos que já temos
    const tamanhoDoBarco = tamanhosPredefinidos[playerShips.length] || 2; // Caso falhe, assume tamanho 2

    // Passamos o ID, o tamanho calculado, o index (clique) e a orientação em minúsculas
    const novoNavio = criarNavio(
      playerShips.length + 1, // ID (1, 2, 3...)
      tamanhoDoBarco, // Tamanho do barco atual
      index, // Posição onde o jogador clicou
      playerInfo.orientation.toLowerCase(), // Orientação convertida para "h" ou "v"
    );

    // TAREFA D: Atualizar o estado do React adicionando o novo navio ao array
    setPlayerShips((prevShips) => [...prevShips, novoNavio]);
    console.log("Navio colocado com sucesso:", novoNavio);
  };

  //trocar o valor do Board ao mudar
  const handleBoardChange = (e) => {
    const value = e.currentTarget.value;
    console.log("handleboardgame chamado com: ", value);

    setSelectedBoard(value);
  };

  const handleStartGame = (data) => {
    let frotaComputador = [];

    //se game true então termina o jogo e faz reset dos inputs
    if (gameStarted) {
      resetJogo();

      console.log("handleStartGame Chamando com: ", data);

      return;
    }

    if (selectedBoard === "1") {
      frotaComputador = [
        criarNavio(1, 4, 1, "h"),
        criarNavio(2, 3, 34, "v"),
        criarNavio(3, 2, 67, "h"),
        criarNavio(4, 1, 89, "h"),
      ];
    } else if (selectedBoard === "2") {
      frotaComputador = [
        criarNavio(1, 4, 5, "v"),
        criarNavio(2, 3, 41, "h"),
        criarNavio(3, 2, 73, "v"),
        criarNavio(4, 1, 19, "h"),
      ];
    } else {
      // Frota aleatória, falta fazer
      // Tabuleiros 3, 4 ou padrão caso não coincida
      frotaComputador = [
        criarNavio(1, 3, 20, "h"),
        criarNavio(2, 2, 55, "v"),
        criarNavio(3, 4, 0, "h"),
        criarNavio(4, 1, 99, "h"),
      ];
    }

    setComputerShips(frotaComputador);

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

  // Contar o tamanho da frota do inimigo
  let tam = 0;
  for (let i = 0; i < computerShips.length; i++) {
    tam = tam + computerShips[i].size;
  }

  const handleAtaqueComputador = (index) => {
    // Só permite disparar se o jogo já tiver começado!
    if (!gameStarted) return;
    //console.log(frotaComputador.length);

    // Chama a função 'existeNavio' para ver se o tiro acertou
    const acerta = existeNavio(computerShips, index);
    if (existeNavio(computerShips, index)) {
      setNaviosAtingidos((prev) => prev + 1); // Contar quantos navios acertou

      if (playerInfo.fuel < 100) {
        if (playerInfo.fuel + 10 > FUEL.MAX) {
          //console.log("comb", diferenca_combustivel);
          setPlayerInfo(() => ({
            fuel: FUEL.MAX,
          }));
        } else if (playerInfo.fuel === FUEL.MAX) {
          setPlayerInfo(() => ({
            fuel: FUEL.MAX,
          }));
        } else if (playerInfo) {
          setPlayerInfo(() => ({
            fuel: playerInfo.fuel + FUEL.HIT_REWARD,
          }));
        }
      }

      console.log("Navios atingidos: ", naviosAtingidos);
    } else {
      setPlayerInfo((prev) => ({ ...prev, fuel: prev.fuel - FUEL.SHOT_COST }));
    }

    if (naviosAtingidos === tam) {
      console.log("Parabéns! Você afundou toda a frota inimiga!", tam);
      resetJogo();
    }

    // 2. GUARDAR O CLIQUE: Faz exatamente o mesmo que a tua função fazia, mas atualiza o estado global de tiros do Game
    setTirosNoComputador((prev) =>
      prev.includes(index) ? prev : [...prev, index],
    );
  };

  const handleDebugChange = (e) => {
    const isChecked = e.currentTarget.checked;
    console.log("handleDebugChange chamado com: ", isChecked);

    setDebug(isChecked);
  };

  const handleTimerTick = (seconds) => {
    //contar só o tempo do jogador
    if (!gameStarted) return;
    if (turn != TURN.PLAYER) return;

    setTimeLeft(seconds);

    if (seconds === 0) {
      // retirar -5 de combustivel
      /*setPlayerInfo(() => {
        fuel: playerInfo.fuel - FUEL.TIMEOUT_PENALTY;
      });
      */

      setPlayerInfo((prev) => ({
        ...prev,
        fuel: Math.max(0, prev.fuel - FUEL.TIMEOUT_PENALTY),
      }));
      setTurn(TURN.COMPUTER);
      setTimeLeft(TIMER.TURN_SECONDS);
    }
  };

  //Mudar a vez do PC para PLayer
  useEffect(() => {
    if (!gameStarted) return;
    if (turn !== TURN.COMPUTER) return;

    const t = setTimeout(() => {
      setTurn(TURN.PLAYER);
      setTimeLeft(TIMER.TURN_SECONDS);
    }, 500);

    return () => clearTimeout(t);
  }, [gameStarted, turn]);

  return (
    <div>
      <div className="setup-wrapper">
        <Setup
          gameStarted={gameStarted}
          onStart={handleStartGame}
          selectedBoard={selectedBoard}
          onBoardChange={handleBoardChange}
          orientation={playerInfo.orientation}
          onOrientationChange={(newOrientation) => {
            setPlayerInfo((prev) => ({ ...prev, orientation: newOrientation }));
          }}
          playerName={playerName}
          onPlayerNameChange={setPlayerName}
        />
      </div>

      <ControlPanel
        debug={debug}
        onDebugChange={handleDebugChange}
        gameStarted={gameStarted}
        timeout={TIMER.TURN_SECONDS}
        fuelText={`${playerInfo.fuel}`}
        radarText="Indisponível"
        onTimerTick={handleTimerTick}
        isPlayerTurn={turn == TURN.PLAYER}
      />

      <section className="boards">
        <div className="board-container">
          {/* TABULEIRO DO JOGADOR: 
              - Usa o estado 'playerShips'.
              - debug={true} para o jogador ver sempre onde estão os seus barcos.
              - Se o jogo NÃO começou, o clique coloca barcos (handlePlaceShip). Se começou, não faz nada. */}
          <Board
            title="Tabuleiro do Jogador"
            ships={playerShips}
            debug={true}
            onSquareClick={!gameStarted ? handlePlaceShip : () => {}} // Só permite se o gameStarted for false
            clicks={[]}
          />
        </div>

        <div className="board-container">
          {/* TABULEIRO DO COMPUTADOR:
              - Usa o estado 'computerShips'.
              - debug usa o estado real (só mostra a frota do PC se o botão Debug estiver ativo).
              - O clique ativa a função de ataque ao computador. */}
          <Board
            title="Tabuleiro do Computador"
            ships={computerShips}
            debug={debug}
            onSquareClick={gameStarted ? handleAtaqueComputador : () => {}} // Só permite se o gameStarted for true
            clicks={tirosNoComputador}
          />
        </div>
      </section>
    </div>
  );
}

export default Game;
