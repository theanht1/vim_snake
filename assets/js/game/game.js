import Phaser from 'phaser';

import Snake from './Snake';
import FoodManager from './FoodManager';
import { DEFAULT_LENGTH, DIRECTION, DIRECTION_CODE } from '../utils/constants';


export class Game {
  constructor(engine, channel) {
    this.engine = engine;
    this.channel = channel;
  }

  start(engine) {
    this.channel.push('new_player', {});

    // Listen events
    this.channel.on('update_players', data => {
    });

    this.channel.on('update_ranking', data => {
    });

    this.channel.on('update_snakes', data => {
      const { snakes } = data;
      if (snakes.length > 0) {
        this.snake.update(snakes[0]);
        // console.log('POS', snakes[0].pos)
      }
    });

    this.channel.on('update_foods', data => {
      const { foods } = data;
      this.foodManager.update(foods);
      // console.log('FOOD', foods);
    });

    engine.input.keyboard.on('keydown', ({ keyCode }) => {
      if (Object.keys(DIRECTION_CODE).includes(String(keyCode))) {
        this.updateDirection(DIRECTION[DIRECTION_CODE[String(keyCode)]]);
      }
    });
  }

  updateDirection(newDir) {
    const { direction } = this.snake;

    if (newDir !== direction
      && ((newDir === DIRECTION.UP && direction !== DIRECTION.DOWN)
      || (newDir === DIRECTION.RIGHT && direction !== DIRECTION.LEFT)
      || (newDir === DIRECTION.DOWN && direction !== DIRECTION.UP)
      || (newDir === DIRECTION.LEFT && direction !== DIRECTION.RIGHT))) {
      this.channel.push('change_direction', { direction: newDir });
    }
  }

  preload(engine) {
    engine.load.image('food', '/images/game/food.png');
    engine.load.image('body', '/images/game/body.png');
  }

  create(engine) {
    this.foodManager = new FoodManager(engine);
    this.snake = new Snake(engine);

    this.start(engine);
  }

  update(state) {
    //console.log('Update');
    if (!this.snake.alive) {
        return;
    }
  }
};

export const createGame = (elId, channel, width, height) => {
  const config = {
    type: Phaser.WEBGL,
    width,
    height,
    backgroundColor: '#bfcc00',
    parent: elId,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
  };

  const engine = new Phaser.Game(config);
  const game = new Game(engine, channel);

  function preload() {
    game.preload(this);
  }

  function create() {
    game.create(this);
  }

  function update(time, delta) {
    game.update(this);
  }
}


/**
* We can place the food anywhere in our 40x30 grid
* *except* on-top of the snake, so we need
* to filter those out of the possible food locations.
* If there aren't any locations left, they've won!
*
* @method repositionFood
* @return {boolean} true if the food was placed, otherwise false
*/
function repositionFood () {
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++) {
        testGrid[y] = [];

        for (var x = 0; x < 40; x++) {
            testGrid[y][x] = true;
        }
    }

    snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++) {
        for (var x = 0; x < 40; x++) {
            if (testGrid[y][x] === true) {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0) {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        console.log(pos)
        food.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else {
        return false;
    }
}

