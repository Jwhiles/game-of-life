const game = require('./game.js');
const { interpretGameState, makeGrid } = require('./visualise.js');

let init = ['3:4','5:2','3:3','2:2','3:3','2:4','3:4','3:4']

for (let i = 0; i <= 30; i++) {
  interpretGameState(makeGrid(15), init).forEach((x) => {
    console.log(x);
  });
  init = game.tick(init)
  console.log('---------')
}
