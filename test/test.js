const test = require('tape');

const game = require('../src/game.js');
const { interpretGameState, makeGrid } = require('../src/visualise.js');

test('Should return all neighbours for a live cell', (t) => {
  const expected = ['0:1','0:2','0:3','1:1','1:3','2:1','2:2','2:3']
  t.deepEqual(game.neighboursFromCoord('1:2').sort(), expected.sort(), 'returns the expected neighbours');
  t.end()
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

test(`Should count all coords to be checked`, (t) => {
  t.plan(1)

  const starting = ['1:1','1:2','1:3']
  const expected =
    ['0:0','0:1','0:2','1:0','1:2','2:0','2:1','2:2','0:1','0:2','0:3','1:1',
    '1:3','2:1','2:2','2:3','0:2','0:3','0:4','1:2','1:4','2:2','2:3','2:4'];

  t.deepEqual(game.countAll(starting), expected, `Should return an array of many coordinates`);
})

test(`Should return all live neighbours from array of coords`, (t) => {
  const starting = ['0:0', '0:1']
  const expected = { '-1:-1': 1, '-1:0': 2, '-1:1': 2, '0:-1': 1, '0:1': 1,
    '1:-1': 1, '1:0': 2, '1:1': 2, '-1:2': 1, '0:0': 1, '0:2': 1, '1:2': 1 }
  t.plan(1);
  console.log();
  t.deepEqual(game.countAllNeighbours(starting), expected,
    `should return list of coordinates with their number of live neighbours`)
})

test(`should run a tick`, (t) => {
  const starting = ['1:1','1:2','1:3']
  const expected = ['1:2','0:2','2:2']
  t.deepEqual(game.tick(starting).sort(), expected.sort(), `ticks`)
  t.end();
})
