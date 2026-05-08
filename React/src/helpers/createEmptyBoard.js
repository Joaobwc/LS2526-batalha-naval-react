//Função para criar o tabuleiro

import { BOARD_SIZE } from "../constants/index";
import createEmptyCell from "./createEmptyCell";

function createEmptyBoard(size = BOARD_SIZE) {
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

export default createEmptyBoard;
