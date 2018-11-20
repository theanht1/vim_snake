import { paintCell } from '../utils/draw';
import { DEFAULT_LENGTH, DIRECTION } from '../utils/constants';


export default class Snake {

  constructor(game, id, initalHead, direction = DIRECTION.RIGHT, initialLength = DEFAULT_LENGTH) {
    this.id = id;
    this.direction = direction;
    this.game = game;
    this.score = 0;

    this.head = initalHead;
    this.initSnakePosition(initalHead, initialLength);
  }

  initSnakePosition(head, length) {
    //this.positions = Array.from(Array(initalLength)).map((_, i) => ({ x: i, y: 0 }));
    this.positions = []

    for(var i = length - 1; i >= 0; i--){
      this.positions.push({ x: i, y: 0 });
    }
  }

  updateDirection(dir) {
    if (dir === DIRECTION.LEFT && this.direction !== DIRECTION.RIGHT)
      this.direction = DIRECTION.LEFT;
    else if (dir === DIRECTION.DOWN && this.direction !== DIRECTION.UP)
      this.direction = DIRECTION.DOWN;
    else if (dir === DIRECTION.RIGHT && this.direction !== DIRECTION.LEFT)
      this.direction = DIRECTION.RIGHT;
    else if (dir === DIRECTION.UP && this.direction !== DIRECTION.DOWN)
      this.direction = DIRECTION.UP;
  }

  updateHead() {
    // increment to get new head position and find direction
    if (this.direction === DIRECTION.RIGHT) this.head.x++;
    else if (this.direction === DIRECTION.LEFT) this.head.x--;
    else if (this.direction === DIRECTION.UP) this.head.y--;
    else if (this.direction === DIRECTION.DOWN) this.head.y++;

  }

  checkCollision() {
    // wall collision detection
    if (this.head.x <= -1 || this.head.x >= this.game.width / this.game.cw
      || this.head.y <= -1 || this.head.y >= this.game.height / this.game.cw) {
      return true;
    }
    // check body collision
    if (this.positions.some(pos => this.head.x === pos.x && this.head.y === pos.y)) {
      return true;
    }
    return false;
  }

  updatePosition() {
    // Logic to make snake eat food
    // if head position is same as food create new head instead of moving tail
    if (this.head.x === this.game.food.x && this.head.y === this.game.food.y) {
      this.score++;
      //speed -= 10;
      this.game.createFood();
    } else {
      // move the tail cell in front of the head
      this.positions.pop();  //take last cell
    }
    this.positions.unshift({ ...this.head }); //add tail as first cell
  }


  render() {
    this.updateHead();

    if (this.checkCollision()) {
      // Submit result
      return false;
    }

    this.updatePosition();
    this.positions.forEach(pos => paintCell(this.game.ctx, pos.x, pos.y, this.game.cw, '#00CC00'));

    return true;
  };

}
