import { BOARD_SIZE } from "../constants";

// 1. A função que já conheces (Responsável por UM navio)
function criarNavio(id, size, startPos, orientation) {
  const position = [];
  for (let i = 0; i < size; i++) {
    if (orientation === "h") {
      position.push(startPos + i);
    } else {
      position.push(startPos + i * BOARD_SIZE);
    }
  }

  return {
    id,
    size,
    position,
    hits: [],
    sunk: false,
  };
}

export default criarNavio;
