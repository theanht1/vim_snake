import Phaser from 'phaser';

import { DIRECTION } from '../utils/constants';


const Snake = new Phaser.Class({
  initialize: function Snake (scene) {
    this.body = scene.add.group();
    this.alive = true;
    this.heading = DIRECTION.RIGHT;
    this.direction = DIRECTION.RIGHT;

  },

  update: function({ user_id, pos, dir }) {
    this.direction = dir;

    this.body.clear(true);

    pos.forEach(cell => {
      const tail = this.body.create(cell[0] * 16, cell[1] * 16, 'body');
      tail.setOrigin(0);
    });
  },
});


export default Snake;
