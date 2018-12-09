import Phaser from 'phaser';

import { CELL_PX } from '../utils/constants';

const Food = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Food (scene, x, y) {
    Phaser.GameObjects.Image.call(this, scene);

    this.setTexture('food');
    this.setPosition(x * CELL_PX, y * CELL_PX);
    this.setOrigin(0);

    scene.children.add(this);
  },
});

class FoodManager {
  constructor(scene) {
    this.scene = scene;
    this.foods = scene.add.group();
  }

  update(foods) {
    this.foods.clear(true);

    foods.forEach(foodPos => {
      const food = this.foods.create(foodPos[0] * CELL_PX, foodPos[1] * CELL_PX, 'food');
      food.setOrigin(0);
    });
  }
}
export default FoodManager;
