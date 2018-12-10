import Phaser from 'phaser';

import Snake from './Snake';
import FoodManager from './FoodManager';
import { DEFAULT_LENGTH, DIRECTION, DIRECTION_CODE } from '../utils/constants';


export class Game {
  constructor(engine, channel, user) {
    this.engine = engine;
    this.channel = channel;
    this.user = user;
  }

  start() {
    // Listen events
    this.channel.on('update_snakes', data => {
      const { snakes = [] } = data;
      this.updateSnakes(snakes);
    });

    this.channel.on('update_foods', data => {
      const { foods } = data;
      this.foodManager.update(foods);
    });

    this.scene.input.keyboard.on('keydown', ({ keyCode }) => {
      if (Object.keys(DIRECTION_CODE).includes(String(keyCode))) {
        this.updateDirection(DIRECTION[DIRECTION_CODE[String(keyCode)]]);
      }
    });
  }

  updateSnakes(snakes) {
    // Remove died snakes
    const userIds = snakes.map(({ user_id }) => String(user_id));
    Object.keys(this.snakes).forEach(userId => {
      if (!userIds.includes(userId)) {
        this.snakes[userId].destroy();
        delete this.snakes[userId];
      }
    });

    // Update snakes
    snakes.forEach(snake => {
      if (!this.snakes[snake.user_id]) {
        this.snakes[snake.user_id] = new Snake(this.scene, snake);
      } else {
        this.snakes[snake.user_id].update(snake);
      }
    });
  }

  updateDirection(newDir) {
    const userSnake = this.snakes[this.user.id];
    if (!userSnake) return;

    const { direction } = userSnake;

    if (newDir !== direction
      && ((newDir === DIRECTION.UP && direction !== DIRECTION.DOWN)
      || (newDir === DIRECTION.RIGHT && direction !== DIRECTION.LEFT)
      || (newDir === DIRECTION.DOWN && direction !== DIRECTION.UP)
      || (newDir === DIRECTION.LEFT && direction !== DIRECTION.RIGHT))) {
      this.channel.push('change_direction', { direction: newDir });
    }
  }

  preload(scene) {
    scene.load.image('food', '/images/game/food.png');
  }

  create(scene) {
    this.scene = scene;
    this.foodManager = new FoodManager(scene);
    this.snakes = {};

    this.start();
  }

  update(state, time) {
    Object.values(this.snakes).forEach(snake => {
      if (snake.protected) {
        snake.toggleVisible(time);
      }
    })
  }
};

export const createGame = ({ elId, channel, user, width, height }) => {
  const config = {
    type: Phaser.WEBGL,
    width,
    height,
    backgroundColor: '#dee4ed',
    parent: elId,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
  };

  const engine = new Phaser.Game(config);
  const game = new Game(engine, channel, user);

  function preload() {
    game.preload(this);
  }

  function create() {
    game.create(this);
  }

  function update(time, delta) {
    game.update(this, time);
  }

  return game;
}

