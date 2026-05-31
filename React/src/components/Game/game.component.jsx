import { useEffect, useState } from "react";
import { FUEL, REQUIRED_FLEET, TURN, TIMER, BOARD_SIZE } from "../../constants";
import {
  createEmptyBoard,
  createPlayer,
  criarNavio,
  existeNavio,
} from "../../helpers";
import { Setup, ControlPanel, Board, GameOver } from "../../components";

function Game() {
  //Variáveis de estado
  const [debug, setDebug] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [playerName, setPlayerName] = useState("");

  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    orientation: "h",
    fuel: FUEL.MAX,
    moveCount: 0,
    radarCharges: 0,
  });

  const [gameOverInfo, setGameOverInfo] = useState(null);

  const [inteligenciaComputador, setInteligenciaCOmputador] =
    useState("PROCURA");
  const [computadorUltimoAcerto, setComputadorUltimoAcerto] = useState(null);
  const [computadorAlvos, setComputadorAlvos] = useState([]);

  const [tamanhoFrota, setTamanhoFrota] = useState(0);
  const [naviosAtingidos, setNaviosAtingidos] = useState(1);
  const [playerShips, setPlayerShips] = useState([]);
  const [computerShips, setComputerShips] = useState([]);
  //const [orientation, setOrientation] = useState("h");
  const [tirosNoComputador, setTirosNoComputador] = useState([]);
  const [tirosNoJogador, setTirosNoJogador] = useState([]);

  //Tabuleito pre-definido do computador
  const [selectedBoard, setSelectedBoard] = useState("1");

  //de quem é a vez
  const [turn, setTurn] = useState(TURN.PLAYER);
  const [timeLeft, setTimeLeft] = useState(TIMER.TURN_SECONDS);

  //Frota do jogador
  const PLAYER_FLEET_SIZES = [5, 4, 3, 3, 2, 2];
  const COMPUTER_FLEET_SIZES = [5, 4, 3, 3, 2, 2];

  const isFleetReady = playerShips.length == PLAYER_FLEET_SIZES.length;

  // radar
  const [radarDisponivel, setRadarDisponivel] = useState(false);
  const [radarCells, setRadarCells] = useState([]);

  //Funções auxiliares dos handlers

  //reset do jogo
  const resetJogo = () => {
    setGameStarted(false);
    setGameOverInfo(null);
    setDebug(false);

    setInteligenciaCOmputador("PROCURA");
    setComputadorUltimoAcerto(null);
    setComputadorAlvos([]);

    setSelectedBoard("1");
    setPlayerName("");
    setPlayerInfo({
      name: "",
      orientation: "h",
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
    setRadarCells();
  };

  //handlers(calbacks)

  const getLinha = (index) => Math.floor(index / BOARD_SIZE);
  const getColuna = (index) => index % BOARD_SIZE;

  const canPlaceShipAt = (startIndex, size, orientation, ships) => {
    // 1) Validar limites do tabuleiro
    if (orientation === "h") {
      // Ex.: startIndex=9, size=5 => startCol=9, endCol=13 => inválido
      const startCol = getColuna(startIndex);
      const endCol = startCol + (size - 1);
      if (endCol >= BOARD_SIZE) return false;

      // Garantia extra: todos os índices têm de ficar na mesma linha
      const startRow = getLinha(startIndex);
      for (let i = 0; i < size; i++) {
        const idx = startIndex + i;
        if (getLinha(idx) !== startRow) return false;
      }
    } else {
      // Vertical: não pode passar do último índice (99 num board 10x10)
      const endIndex = startIndex + (size - 1) * BOARD_SIZE;
      if (endIndex >= BOARD_SIZE * BOARD_SIZE) return false;
    }

    // 2) Validar sobreposição
    for (let i = 0; i < size; i++) {
      const idx =
        orientation === "h" ? startIndex + i : startIndex + i * BOARD_SIZE;

      if (existeNavio(ships, idx)) return false;
    }

    return true;
  };

  const handlePlaceShip = (index) => {
    // Verificar se colocaste a frota toda
    if (playerShips.length >= PLAYER_FLEET_SIZES.length) {
      console.log("Já colocaste toda a frota!");
      return;
    }

    // Tamanho do navio atual (depende de quantos já colocaste)
    const size = PLAYER_FLEET_SIZES[playerShips.length];

    // Orientação (garantir que é "h" ou "v")
    const orientation = playerInfo.orientation || "h";

    // 4) Validar posição
    const ok = canPlaceShipAt(index, size, orientation, playerShips);
    if (!ok) {
      console.log("Posição inválida (fora do tabuleiro ou sobreposição).");
      return;
    }

    // 5) Criar navio válido e guardar
    const novoNavio = criarNavio(
      playerShips.length + 1, //ID(1,2...)
      size, //tamanho do barco atual
      index, // Posição onde o jogador clicou
      orientation, //orientação
    );

    setPlayerShips((prevShips) => [...prevShips, novoNavio]);
    console.log("Navio colocado com sucesso:", novoNavio);
  };

<<<<<<< HEAD
  const handleRadar = () => {
    if (!radarDisponivel) return;

    const quadradosValidos = [];

    for (let linha = 0; linha < BOARD_SIZE - 1; linha++) {
      for (let coluna = 0; coluna < BOARD_SIZE - 1; coluna++) {
        const c1 = linha * BOARD_SIZE + coluna;
        const c2 = c1 + 1;
        const c3 = c1 + BOARD_SIZE;
        const c4 = c3 + 1;

        const area = [c1, c2, c3, c4];

        // Radar só interessa se houver pelo menos 1 navio
        const temNavio = area.some((i) => existeNavio(computerShips, i));

        if (temNavio) {
          quadradosValidos.push(area);
        }
      }
    }

    if (quadradosValidos.length === 0) return;

    const escolhido =
      quadradosValidos[Math.floor(Math.random() * quadradosValidos.length)];

    setRadarCells(escolhido);
    setRadarDisponivel(false);
  };

  const handleRadarClick = handleRadar;

=======
  const criarNavioRandom = (id, size, placedShips) => {
    // limitar tentativas para 500
    const maxTries = 500;

    for (let tries = 0; tries < maxTries; tries += 1) {
      const orientation = Math.random() < 0.5 ? "h" : "v"; //escolhe orientação
      const startIndex = Math.floor(Math.random() * (BOARD_SIZE * BOARD_SIZE)); //ecolhe aleatóriamente a posição de inicio

      //verifica se a posição é valida
      const ok = canPlaceShipAt(startIndex, size, orientation, placedShips);
      if (!ok) continue;

      return criarNavio(id, size, startIndex, orientation);
    }

    // Em caso de erro returna NULL
    return null;
  };

  //Criar o Tab da frota aleatória
  const criarFrotaRandom = () => {
    const ships = [];

    //criar os os navios tendo em conta os tamanhos
    for (let i = 0; i < COMPUTER_FLEET_SIZES.length; i += 1) {
      const size = COMPUTER_FLEET_SIZES[i];
      const ship = criarNavioRandom(i + 1, size, ships);

      if (!ship) {
        // Se falhou a gerar um navio, devolve o que tem ou array vazio
        console.log("Falha ao gerar navio aleatório:", { id: i + 1, size });
        return [];
      }
      //colocar no array o navio
      ships.push(ship);
    }

    return ships;
  };
>>>>>>> 1658855 (Adição da frota aleatoria e fix resetJogo())
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
        criarNavio(1, 5, 0, "h"), // 0, 1, 2, 3, 4
        criarNavio(2, 4, 20, "h"), // 20, 21, 22, 23
        criarNavio(3, 3, 40, "h"), // 40, 41, 42
        criarNavio(4, 3, 66, "v"), // 66, 76, 86
        criarNavio(5, 2, 9, "v"), // 9, 19
        criarNavio(6, 2, 95, "h"), // 95, 96
      ];
    } else if (selectedBoard === "2") {
      frotaComputador = [
        criarNavio(1, 5, 10, "h"), // 10, 11, 12, 13, 14
        criarNavio(2, 4, 50, "h"), // 50, 51, 52, 53
        criarNavio(3, 3, 5, "v"), // 5, 15, 25
        criarNavio(4, 3, 70, "h"), // 70, 71, 72
        criarNavio(5, 2, 88, "v"), // 88, 98
        criarNavio(6, 2, 20, "h"), // 20, 21
      ];
    } else if (selectedBoard === "3") {
      frotaComputador = [
        criarNavio(1, 5, 30, "h"), // 30, 31, 32, 33, 34
        criarNavio(2, 4, 6, "v"), // 6, 16, 26, 36
        criarNavio(3, 3, 71, "h"), // 71, 72, 73
        criarNavio(4, 3, 57, "v"), // 57, 67, 77 (Substituiu o 83 inválido)
        criarNavio(5, 2, 52, "v"), // 52, 62
        criarNavio(6, 2, 97, "h"), // 97, 98
      ];
    } else if (selectedBoard === "4") {
      // Frota aleatória, falta fazer
      frotaComputador = criarFrotaRandom();
    } else {
      //no casso da função falhar
      frotaComputador = [
        criarNavio(1, 5, 10, "h"), // 10, 11, 12, 13, 14
        criarNavio(2, 4, 50, "h"), // 50, 51, 52, 53
        criarNavio(3, 3, 5, "v"), // 5, 15, 25
        criarNavio(4, 3, 70, "h"), // 70, 71, 72
        criarNavio(5, 2, 88, "v"), // 88, 98
        criarNavio(6, 2, 20, "h"), // 20, 21
      ];
      console.log("Erro na Criação da frota aleatória");
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
    setRadarCells([]);
    // Chama a função 'existeNavio' para ver se o tiro acertou
    const tempoGasto = TIMER.TURN_SECONDS - timeLeft;

    const acerta = existeNavio(computerShips, index);
    if (acerta && tempoGasto < 3) {
      setRadarDisponivel(true);
    }
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
    const novosNaviosAtingidos = acerta ? naviosAtingidos + 1 : naviosAtingidos;

    if (novosNaviosAtingidos === tam) {
      console.log("Parabéns! Você afundou toda a frota inimiga!", tam);
      resetJogo();
    } else {
      // Se o jogo NÃO acabou, passas IMEDIATAMENTE o turno para o Computador!
      setTurn(TURN.COMPUTER);
    }
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
      let tiroIndex;

      if (inteligenciaComputador == "CAÇA" && computadorAlvos > 0) {
        const proximosAlvos = [...computadorAlvos];
        tiroIndex = proximosAlvos.shift();
      } else {
        do {
          tiroIndex = Math.floor(Math.random() * 100); // Gerar posição aleatória
        } while (tirosNoJogador.includes < tiroIndex);
      }

      setTirosNoJogador((prev) => [...prev, tiroIndex]);
      const acertouNoJogador = existeNavio(playerShips, tiroIndex);

      if (acertouNoJogador) {
        console.log(`Computador disparou em ${tiroIndex} e acertou`);
        if (inteligenciaComputador === "PROCURA") {
          setInteligenciaCOmputador("CAÇA");

          const vizinhos = [];
          const linha = Math.floor(tiroIndex / 10);
          const coluna = tiroIndex % 10;

          if (linha > 0) vizinhos.push(tiroIndex - 10);
          if (linha < 9) vizinhos.push(tiroIndex + 10);
          if (coluna > 0) vizinhos.push(tiroIndex - 1);
          if (coluna < 9) vizinhos.push(tiroIndex + 1);

          const vizinhosValidos = vizinhos.filter(
            (v) => !tirosNoJogador.includes(v),
          );
          setComputadorAlvos(vizinhosValidos);
        }
      } else {
        console.log(`Computador disparou em ${tiroIndex} e falhou`);
      }

      if (
        inteligenciaComputador === "CAÇA" &&
        (setComputadorAlvos.length === 0 ||
          (!acertouNoJogador && computadorAlvos.length === 1))
      ) {
        setInteligenciaCOmputador("PROCURA");
        setComputadorAlvos([]);
      }

      setTurn(TURN.PLAYER);
      setTimeLeft(TIMER.TURN_SECONDS);
    }, 500);

    return () => clearTimeout(t);
  }, [
    gameStarted,
    turn,
    inteligenciaComputador,
    computadorAlvos,
    tirosNoJogador,
    playerShips,
  ]);

  //useeffect que vai verificar a frota do jogador e computador
  useEffect(() => {
    if (!gameStarted) return;
    if (gameOverInfo) return;

    //Sempre que há um tiro  (os arrays mudam), é verificado se alguem perdeu
    if (isFleetDestroyed(computerShips)) {
      endGame({ winner: "PLAYER", reason: "FLEET" });
      return;
    }

    if (isFleetDestroyed(playerShips)) {
      endGame({ winner: "COMPUTER", reason: "FLEET" });
    }
  }, [gameStarted, gameOverInfo, computerShips, playerShips]);

  //Renderização Condicional
  //verificar se o GameOverIndo existe, se existir é renderizado, caso contrário renderia o jogo pronto a jogar
  //if (gameOverInfo) {
  //  return <GameOver info={gameOverInfo} onRestart={resetJogo} />;
  //}

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
          isFleetReady={isFleetReady}
        />
      </div>

      <ControlPanel
        debug={debug}
        onDebugChange={handleDebugChange}
        gameStarted={gameStarted}
        timeout={TIMER.TURN_SECONDS}
        fuelText={`${playerInfo.fuel}`}
        radarText={radarDisponivel ? "Disponível" : "Indisponível"}
        onTimerTick={handleTimerTick}
        isPlayerTurn={turn == TURN.PLAYER}
        onRadarClick={handleRadarClick}
        radarDisponivel={radarDisponivel}
      />

      <section className="boards">
        <div className="board-container">
          <Board
            title="Tabuleiro do Jogador"
            ships={playerShips}
            debug={true}
            onSquareClick={!gameStarted ? handlePlaceShip : () => {}} // Só permite se o gameStarted for false
            clicks={[]}
          />
        </div>

        <div className="board-container">
          <Board
            title="Tabuleiro do Computador"
            ships={computerShips}
            debug={debug}
            onSquareClick={
              gameStarted && turn === TURN.PLAYER
                ? handleAtaqueComputador
                : () => {}
            }
            clicks={tirosNoComputador}
            radarCells={radarCells}
          />
        </div>
      </section>
      {gameOverInfo && <GameOver info={gameOverInfo} onRestart={resetJogo} />}
    </div>
  );
}

export default Game;
