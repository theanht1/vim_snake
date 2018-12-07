import Phaser from 'phaser';


const Food = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Food (scene, x, y) {
    Phaser.GameObjects.Image.call(this, scene);

    this.setTexture('food');
    this.setPosition(x * 16, y * 16);
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
      const food = this.foods.create(foodPos[0] * 16, foodPos[1] * 16, 'food');
      food.setOrigin(0);
    });
  }
}
export default FoodManager;
