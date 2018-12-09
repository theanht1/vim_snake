import Phaser from 'phaser';

import { DIRECTION } from '../utils/constants';


const Snake = new Phaser.Class({
  initialize: function Snake (scene, snake) {
    this.body = scene.add.group();
    this.alive = true;

    this.userId = snake.user_id;
    this.update(snake);
  },

  update: function({ pos, dir }) {
    this.direction = dir;

    this.body.clear(true);

    pos.forEach(cell => {
      const tail = this.body.create(cell[0] * 16, cell[1] * 16, 'body');
      tail.setOrigin(0);
    });
  },

  destroy: function() {
    this.body.clear(true, true);
  },
});


export default Snake;
