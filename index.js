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

const toCheck = (count) => {
  return Object.keys(count).map((x) => {
    return x
  })
}

const tick = (coords) => {
  let state = {}
  coords.forEach((x) => {
    state = count(state, neighbours(x));
  })
  const toBeChecked = toCheck(state)
  const alive = toBeChecked.filter((x) => {
    return checkLife(state, coords, x);
  })
  return alive
}
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


let xs = document.getElementsByClassName('x');



function turn (state) {
  let something = tick(state)
  return something
}

function concat (state) {
  return [].concat.apply([], state)
}

function updateDom (array) {
  for (var i = 0; i < xs.length; i++) {
    if (array[i] === 'x') {
    xs[i].className = 'x alive'
  } else {
    xs[i].className = 'x'
  }
  }
}

function doit (state) {
  const current = concat(interpretGameState(makeGrid(9), state));
  updateDom(current);
  return turn(state)
}

let state = turn(['1:1','2:2','3:3','1:2','4:4','3:4','5:4','6:4'])
state = doit(state)

document.getElementsByClassName('start')[0].addEventListener('click', () => {
  setInterval(function(){
    state = doit(state)
  }, 225);
})
