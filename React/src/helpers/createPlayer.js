function createPlayer(name = "") {
  return {
    name,
    fuel: FUEL.MAX,
    moveCount: 0,
    radarCharges: 0,
  };
}

export default createPlayer;
