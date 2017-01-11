const game = require('./game.js').tick;

const makeGrid = (x) => {
  let matrix = [];
  for (let i = 0; i < x; i++) {
    let row = []
    for (let i = 0; i < x; i++) {
      row[i] = 0
    }
    matrix[i] = row
  }
  return matrix
}

const changeMatrix = (matrix, coord) => {
  const [xS, yS] = coord.split(':');
  const x = Number(xS)
  const y = Number(yS)
  const

}

makeGrid(5)
