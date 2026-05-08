//Criar uma célula do tabuleiro
import { CELL_STATE } from "../constants";

function createEmptyCell(x, y) {
  return {
    x: x,
    y: y,
    hasShip: false,
    shipId: null,
    shotState: CELL_STATE.UNKNOWN_WATER,
  };
}

export default createEmptyCell;
