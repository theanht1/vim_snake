import Phaser from 'phaser';

import { getSnakeColor } from '../utils/gamePlay';
import { DIRECTION, CELL_PX } from '../utils/constants';


const Snake = new Phaser.Class({
  initialize: function Snake (scene, snake) {
    this.body = scene.add.group();
    this.alive = true;

    this.userId = snake.user_id;
    this.color = `0x${getSnakeColor(this.userId)}`;
    this.update(snake);
  },

  update: function(snake) {
    const { dir, pos } = snake;
    this.direction = dir;
    this.protected = snake.protected;

    this.body.clear(true);

    pos.forEach(cell => {
      const tail = new Phaser.GameObjects.Rectangle(
        this.body.scene,
        cell[0] * CELL_PX,
        cell[1] * CELL_PX,
        CELL_PX - 1,
        CELL_PX - 1,
        this.color,
      );
      tail.setOrigin(0);
      this.body.add(tail, true);
    });
  },

  toggleVisible: function(time) {
    if (!this.time) this.time = time;
    if (time - this.time > 400) {
      this.body.toggleVisible();
      this.time = time;
    }
  },

  destroy: function() {
    this.body.clear(true, true);
  },
});


export default Snake;
