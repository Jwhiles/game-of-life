const { curry, forEach, filter, reduce, compose, map, concat } = require('ramda');

// [x:y] => [{}]
const neighboursFromCoord = curry((location) => {
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
})

// [] => {}
const findLiveNeighbours = reduce((acc, x) => {
  const tempAcc = Object.assign({}, acc);
  if (tempAcc[x]) {
    tempAcc[x] = tempAcc[x] + 1
  } else {
    tempAcc[x] = 1
  }
  return tempAcc
}, {})

// {}, [], [x:y] => boolean
const checkLife = curry((count, startPos, coord) => {
  return startPos.indexOf(coord) !== -1
    ? count[coord] === 2 || count[coord] === 3 : count[coord] === 3
})

const countAll = compose(reduce((acc, x) => concat(acc, x), []), map(neighboursFromCoord))
const countAllNeighbours = compose(findLiveNeighbours, countAll)

const tick = (coords) => {
  const toCheck = countAllNeighbours(coords)
  return filter(checkLife(toCheck, coords), Object.keys(toCheck))
}

module.exports = {
  neighboursFromCoord,
  checkLife,
  tick,
  countAll,
  countAllNeighbours
}
