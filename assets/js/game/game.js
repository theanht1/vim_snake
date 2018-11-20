import Snake from './snake';
import { paintCell } from '../utils/draw';
import { DEFAULT_LENGTH, DIRECTION } from '../utils/constants';


export default class Game {

  constructor(canvasId) {
    const canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;;
    this.height = canvas.height;
    this.cw = 10;  //cell width

    this.speed = 100;
    this.scoreEl = document.getElementById('score');
  }

  start() {
    this.createSnake();
    this.createFood();

    if (typeof this.gameLoop != 'undefined') {
      clearInterval(this.gameLoop);
    }
    // call the paint function depending on game speed
    this.gameLoop = setInterval(() => this.render(), this.speed);
    this.keyControlListener();
  }

  keyControlListener() {
    // keyboard controls
    document.addEventListener('keydown', (e) => {
      const { key } = e;
      let dir;
      if (key === 'h') dir = DIRECTION.LEFT;
      else if (key === 'j') dir = DIRECTION.DOWN;
      else if (key === 'l') dir = DIRECTION.RIGHT;
      else if (key === 'k') dir = DIRECTION.UP;

      this.snake.updateDirection(dir);
    })
  }

  createSnake() {
    this.snake = new Snake(this, 0, { x: DEFAULT_LENGTH - 1, y: 0 });
  }

  createFood() {
    this.food = {
      x: Math.round(Math.random() * (this.width - this.cw) / this.cw),
      y: Math.round(Math.random() * (this.height - this.cw) / this.cw),
    };
  }

  render() {
    this.scoreEl.innerHTML = this.snake.score;

    // paint the GB on every frame
    // paint the canvas
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = '#00CC00';
    this.ctx.strokeRect(0, 0, this.width, this.height);

    if (!this.snake.render()) {
      this.start();
    }

    paintCell(this.ctx, this.food.x, this.food.y, this.cw, '#f1c40f');
  }
}
