import { BOARD_SIZE, CELL_STATE, FUEL } from "../constants";

//Criar uma célula do tabuleiro
export function createEmptyCell(x, y) {
  return {
    x: x,
    y: y,
    hasShip: false,
    shipId: null,
    shotState: CELL_STATE.UNKNOWN_WATER,
  };
}

//Função para criar o tabuleiro
export function createEmptyBoard(size = BOARD_SIZE) {
  const board = [];

  //linhas
  for (let x = 0; x < size; x++) {
    const row = [];

    //coluna
    for (let y = 0; y < size; y++) {
      row.push(createEmptyCell(x, y));
    }
    board.push(row);
  }
  return board;
}

export function createPlayer(name = "") {
  return {
    name,
    fuel: FUEL.MAX,
    moveCount: 0,
    radarCharges: 0,
  };
}

//FunÇão de criar navio vazio
export function createShip(id, size) {
  return {
    id,
    size,
    position: [], // [{x,y}]
    hits: [], // ["x,y"]
    sunk: false,
  };
}
