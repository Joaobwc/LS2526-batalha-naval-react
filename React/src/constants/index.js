export const BOARD_SIZE = 10;

//Array que contém os tamanhos obrigatórios da frota de navios
//Object.freeze() -> Impede a mutação do array, pode ser retirado
export const REQUIRED_FLEET = Object.freeze([5, 4, 3, 3, 2, 2]);

export const ORIENTATION = Object.freeze({
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL",
});

export const CELL_STATE = Object.freeze({
  UNKNOWN_WATER: "UNKNOWN_WATER",
  MISS: "MISS",
  HIT: "HIT",
  SUNK: "SUNK",
});

export const FUEL = Object.freeze({
  MAX: 100,
  SHOT_COST: 5,
  HIT_REWARD: 10,
  TIMEOUT_PENALTY: 5,
});

export const TURN = Object.freeze({
  PLAYER: "PLAYER",
  COMPUTER: "COMPUTER",
});

export const TIMER = Object.freeze({
  TURN_SECONDS: 15,
  RADAR_BONUS_MAX_SECONDS: 3,
});
