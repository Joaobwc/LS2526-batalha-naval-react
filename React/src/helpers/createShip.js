//FunÇão de criar navio vazio
function createShip(id, size) {
  return {
    id,
    size,
    position: [], // [{x,y}]
    hits: [], // ["x,y"]
    sunk: false,
  };
}

export default createShip;
