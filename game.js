const neighbours = (location) => {
  const [xS, yS] = location.split(':')
  const x = Number(xS)
  const y = Number(yS)
  const result = [
    `${x - 1}:${y - 1}`,
    `${x - 1}:${y}`,
    `${x - 1}:${y + 1}`,
    `${x}:${y - 1}`,
    `${x}:${y + 1}`,
    `${x + 1}:${y - 1}`,
    `${x + 1}:${y}`,
    `${x + 1}:${y + 1}`,
  ];
  return result;
}

const count = (obj, neighbours) => {
  const inter = Object.assign({}, obj);
  neighbours.forEach((x) => {
    if (inter[x]) {
      inter[x] = inter[x] + 1
    } else {
      inter[x] = 1
    }
  })
  return inter;
}

const checkLife = (count, neighbours, coord) => {
  return neighbours.indexOf(coord) !== -1 ? count[coord] === 2 || count[coord] === 3 : count[coord] === 3
}

const tick = (coords) => {
  let state = {}
  coords.forEach((x) => {
    state = count(state, neighbours(x));
  });
  const alive = Object.keys(state).filter((x) => {
    return checkLife(state, coords, x);
  });
  return alive
}

module.exports = {
  neighbours,
  count,
  checkLife,
  tick
}
