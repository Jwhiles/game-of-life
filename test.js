const test = require('tape');

const game = require('./game.js');
const { interpretGameState, makeGrid } = require('./visualise.js');

test('Should return all neighbours for a live cell', (t) => {
  const expected = ['0:1','0:2','0:3','1:1','1:3','2:1','2:2','2:3']
  t.deepEqual(game.neighbours('1:2').sort(), expected.sort(), 'returns the expected neighbours');
  t.end()
})

test('Should update count object with neighbours', (t) => {
  const neighbours = ['0:1','0:2','0:3','1:1','1:3','2:1','2:2','2:3']
  const expected = {
    '0:1': 1,
    '0:2': 1,
    '0:3': 1,
    '1:1': 1,
    '1:3': 1,
    '2:1': 1,
    '2:2': 1,
    '2:3': 1
  }
  t.deepEqual(game.count({}, neighbours), expected, `should update a new object`)
  t.end();
})

test('Should update count object with neighbours, when there is already a count', (t) => {
  const neighbours = ['0:1','0:2','0:3','1:1','1:3','2:1','2:2','2:3']
  const start = {
    '0:1': 2,
    '1:2': 1,
    '0:3': 1,
  }
  const expected = {
    '0:1': 3,
    '0:2': 1,
    '0:3': 2,
    '1:1': 1,
    '1:2': 1,
    '1:3': 1,
    '2:1': 1,
    '2:2': 1,
    '2:3': 1
  }
  t.deepEqual(game.count(start, neighbours), expected, `Should have updated count including values greater than 1`)
  t.end();
})

test('Should check if a given coordinate will live', (t) => {
  const neighbours = ['0:1','0:2','0:3','1:1','1:3','2:1','2:2','2:3']
  const count = {
    '0:1': 3,
    '0:2': 1,
    '0:3': 2,
    '1:1': 1,
    '1:2': 1,
    '1:3': 4,
    '2:1': 1,
    '2:2': 1,
    '2:3': 1,
    '4:5': 3
  }
  t.equal(game.checkLife(count, neighbours, '0:1'), true, `confirms continued life`);
  t.equal(game.checkLife(count, neighbours, '0:2'), false, `confirms death from isolation`);
  t.equal(game.checkLife(count, neighbours, '4:5'), true, `confirms new life`);
  t.equal(game.checkLife(count, neighbours, '1:3'), false, `confirms death from overcrowding`);
  t.end();
})

test(`Should make an array of coords to check, from a count object`, (t) => {
  const count = {
    '0:1': 3,
    '0:2': 1,
    '0:3': 2,
    '1:1': 1,
    '1:2': 1,
    '1:3': 4,
    '2:1': 1,
    '2:2': 1,
    '2:3': 1,
    '4:5': 3
  }
  const expected = ['0:1','0:2', '0:3', '1:1', '1:2',
  '1:3', '2:1', '2:2', '2:3', '4:5'];

  t.deepEqual(game.toCheck(count).sort(), expected.sort(), `should male the expected list of coords to check`);
  t.end()
})

test(`should run a tick`, (t) => {
  const starting = ['1:1','1:2','1:3']
  const expected = ['1:2','0:2','2:2']
  t.deepEqual(game.tick(starting).sort(), expected.sort(), `ticks`)
  t.end();
})


let init = ['3:4','5:2','3:3','2:2','3:3','2:4','3:4','3:4']

for (let i = 0; i <= 30; i++) {
  interpretGameState(makeGrid(10), init).forEach((x) => {
    console.log(x);
  });
  init = game.tick(init)
  console.log('---------')
}
