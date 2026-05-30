import { useEffect, useState } from "react";
import { FUEL, REQUIRED_FLEET, TURN, TIMER, BOARD_SIZE } from "../../constants";
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
    orientation: "h",
    fuel: FUEL.MAX,
    moveCount: 0,
    radarCharges: 0,
  });

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

  const isFleetReady = playerShips.length == PLAYER_FLEET_SIZES.length;

  //Funções auxiliares dos handlers

  //reset do jogo
  const resetJogo = () => {
    setGameStarted(false);
    setDebug(false);
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
    setTirosNoJogador([]);
    setTurn(TURN.PLAYER);
    setTimeLeft(TIMER.TURN_SECONDS);
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

  //Aplica um tiro numa frota e devolve uma frota Nova sem mudar o array antigo
  const applyShotToFleet = (ships, index) => {
    let hit = false;
    let sunkShipId = null;

    const nextShips = ships.map((ship) => {
      //Se o tiro não foi nesse navio, devolvemos o navio igual
      if (!ship.position.includes(index)) return ship;

      console.log("applyShotToFleet encontrou navio:", {
        shipId: ship.id,
        index,
        size: ship.size,
        hitsAntes: ship.hits,
        position: ship.position,
      });

      hit = true;

      //se já tinha sido atingida a posiçã0, não alteramos nada
      if (ship.hits.includes(index)) return ship;

      const nextHits = [...ship.hits, index];
      const isSunkNow = nextHits.length === ship.size;

      if (isSunkNow) sunkShipId = ship.id;

      return {
        ...ship,
        hits: nextHits,
        sunk: isSunkNow,
      };
    });

    console.log("applyShotToFleet resultado:", { index, hit, sunkShipId });

    return { nextShips, hit, sunkShipId };
  };

  const handleAtaqueComputador = (index) => {
    // Só permite disparar se o jogo já tiver começado!
    if (!gameStarted) return;
    if (turn !== TURN.PLAYER) return;

    //Impedir a repetição de tiros
    if (tirosNoComputador.includes(index)) return;

    //Aplicar tiro à frota do computador (marca hits/sunk)
    const { nextShips, hit, sunkShipId } = applyShotToFleet(
      computerShips,
      index,
    );
    setComputerShips(nextShips);

    // guardar o click para o Board pintar miss/hit
    setTirosNoComputador((prev) => [...prev, index]);

    // (para já) logs úteis
    console.log("Jogador tiro debug:", { index, hit, sunkShipId });
    console.log("PC tiro debug:", { tiroIndex, pcHit, pcSunkId });

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

      // 1) ESCOLHER o tiro primeiro (PROCURA ou CAÇA)
      if (inteligenciaComputador === "CAÇA" && computadorAlvos.length > 0) {
        const proximosAlvos = [...computadorAlvos];
        tiroIndex = proximosAlvos.shift();
        setComputadorAlvos(proximosAlvos);
      } else {
        do {
          tiroIndex = Math.floor(Math.random() * (BOARD_SIZE * BOARD_SIZE));
        } while (tirosNoJogador.includes(tiroIndex));
      }

      // 2) Guardar tiro (para pintar o board do jogador)
      setTirosNoJogador((prev) =>
        prev.includes(tiroIndex) ? prev : [...prev, tiroIndex],
      );

      // 3) Aplicar tiro à frota do jogador (atualiza hits/sunk)
      const {
        nextShips: nextPlayerShips,
        hit: pcHit,
        sunkShipId: pcSunkId,
      } = applyShotToFleet(playerShips, tiroIndex);

      setPlayerShips(nextPlayerShips);

      console.log(
        "PC disparou em",
        tiroIndex,
        pcHit ? "HIT" : "MISS",
        pcSunkId ? `(SUNK ship ${pcSunkId})` : "",
      );

      // 4) Atualizar modo CAÇA: se acertou e estava em PROCURA, criar alvos vizinhos
      if (pcHit) {
        if (inteligenciaComputador === "PROCURA") {
          setInteligenciaCOmputador("CAÇA");

          const vizinhos = [];
          const linha = Math.floor(tiroIndex / BOARD_SIZE);
          const coluna = tiroIndex % BOARD_SIZE;

          if (linha > 0) vizinhos.push(tiroIndex - BOARD_SIZE);
          if (linha < BOARD_SIZE - 1) vizinhos.push(tiroIndex + BOARD_SIZE);
          if (coluna > 0) vizinhos.push(tiroIndex - 1);
          if (coluna < BOARD_SIZE - 1) vizinhos.push(tiroIndex + 1);

          const vizinhosValidos = vizinhos.filter(
            (v) => !tirosNoJogador.includes(v) && v !== tiroIndex,
          );

          setComputadorAlvos(vizinhosValidos);
        }
      }

      // 5) Se afundou, voltar logo a PROCURA (mínimo funcional)
      if (pcSunkId) {
        setInteligenciaCOmputador("PROCURA");
        setComputadorAlvos([]);
      }

      // 6) Passar turno de volta ao jogador e reset ao timer
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
        radarText="Indisponível"
        onTimerTick={handleTimerTick}
        isPlayerTurn={turn == TURN.PLAYER}
      />

      <section className="boards">
        <div className="board-container">
          <Board
            title="Tabuleiro do Jogador"
            ships={playerShips}
            debug={true}
            onSquareClick={!gameStarted ? handlePlaceShip : () => {}} // Só permite se o gameStarted for false
            clicks={gameStarted ? tirosNoJogador : []}
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
          />
        </div>
      </section>
    </div>
  );
}

export default Game;
