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
  const newTrix = matrix.slice(0);
  console.log(newTrix);
  newTrix[y][x] = 1;
  return newTrix;
}

const interpretGameState = (matrix, game) => {
  let newTrix = matrix.slice(0);
  game.forEach((x) => {
    newTrix = changeMatrix(newTrix, x)
  })
  return newTrix
}
// 
// const init = ['0:1','0:2','0:3','1:1','1:3','2:1','2:2','2:3'];
//
// const state = interpretGameState(makeGrid(5), init);
//
// state.forEach((x) => {
//   console.log(x)
// })

module.exports = {
  interpretGameState,
  makeGrid
}
