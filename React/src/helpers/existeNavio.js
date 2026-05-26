function existeNavio(ships, index) {
  for (let j = 0; j < ships.length; j++) {
    for (let k = 0; k < ships[j].position.length; k++) {
      if (index === ships[j].position[k]) {
        return true;
      }
    }
  }
  return false;
}
export default existeNavio;
