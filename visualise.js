const makeGrid = (x) => {
  let matrix = [];
  for (let i = 0; i < x; i++) {
    let row = []
    for (let i = 0; i < x; i++) {
      row[i] = ' '
    }
    matrix[i] = row
  }
  return matrix
}

const changeMatrix = (matrix, coord) => {
  const [xS, yS] = coord.split(':');
  const x = Number(xS)
  const y = Number(yS)
  const dimensions = matrix.length;
  if (x < matrix.length && x >= 0 && y < matrix.length && y >= 0) {
  const newTrix = matrix.slice(0);
  newTrix[y][x] = 'x';
  return newTrix;
  } else {
  return matrix;
  }
}

const interpretGameState = (matrix, game) => {
  let newTrix = matrix.slice(0);
  game.forEach((x) => {
    newTrix = changeMatrix(newTrix, x)
  })
  return newTrix
}

module.exports = {
  interpretGameState,
  makeGrid
}
