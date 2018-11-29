import Phaser from 'phaser';

import FoodFactory from './FoodFactory';
import { DEFAULT_LENGTH, DIRECTION } from '../utils/constants';


export const createGame = (elId, width, height) => {
  const config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#bfcc00',
    parent: elId,
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
  };
  var snake;
  var food;
  var cursors;

  //  Direction consts
  var UP = 0;
  var DOWN = 1;
  var LEFT = 2;
  var RIGHT = 3;
  const game = new Phaser.Game(config);

  function preload () {
    console.log('Preload');
    this.load.image('food', '/images/game/body.png');
    this.load.image('body', '/images/game/body.png');
  }

  function create () {
    var Snake = new Phaser.Class({

        initialize:

        function Snake (scene, x, y)
        {
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.head = this.body.create(x * 16, y * 16, 'body');
            this.head.setOrigin(0);

            this.alive = true;

            this.speed = 100;

            this.moveTime = 0;

            this.tail = new Phaser.Geom.Point(x, y);

            this.heading = RIGHT;
            this.direction = RIGHT;
        },

        update: function (time)
        {
            if (time >= this.moveTime)
            {
                return this.move(time);
            }
        },

        faceLeft: function ()
        {
            if (this.direction === UP || this.direction === DOWN)
            {
                this.heading = LEFT;
            }
        },

        faceRight: function ()
        {
            if (this.direction === UP || this.direction === DOWN)
            {
                this.heading = RIGHT;
            }
        },

        faceUp: function ()
        {
            if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.heading = UP;
            }
        },

        faceDown: function ()
        {
            if (this.direction === LEFT || this.direction === RIGHT)
            {
                this.heading = DOWN;
            }
        },

        move: function (time)
        {
            /**
            * Based on the heading property (which is the direction the pgroup pressed)
            * we update the headPosition value accordingly.
            *
            * The Math.wrap call allow the snake to wrap around the screen, so when
            * it goes off any of the sides it re-appears on the other.
            */
            switch (this.heading)
            {
                case LEFT:
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                    break;

                case RIGHT:
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                    break;

                case UP:
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                    break;

                case DOWN:
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                    break;
            }

            this.direction = this.heading;

            //  Update the body segments and place the last coordinate into this.tail
            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

            //  Check to see if any of the body pieces have the same x/y as the head
            //  If they do, the head ran into the body

            var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

            if (hitBody)
            {
                console.log('dead');

                this.alive = false;

                return false;
            }
            else
            {
                //  Update the timer ready for the next movement
                this.moveTime = time + this.speed;

                return true;
            }
        },

        grow: function ()
        {
            var newPart = this.body.create(this.tail.x, this.tail.y, 'body');

            newPart.setOrigin(0);
        },

        collideWithFood: function (food)
        {
            if (this.head.x === food.x && this.head.y === food.y)
            {
                this.grow();

                food.eat();

                //  For every 5 items of food eaten we'll increase the snake speed a little
                if (this.speed > 20 && food.total % 5 === 0)
                {
                    this.speed -= 5;
                }

                return true;
            }
            else
            {
                return false;
            }
        },

        updateGrid: function (grid)
        {
            //  Remove all body pieces from valid positions list
            this.body.children.each(function (segment) {

                var bx = segment.x / 16;
                var by = segment.y / 16;

                grid[by][bx] = false;

            });

            return grid;
        }

    });

    food = new FoodFactory(this, 3, 4);

    snake = new Snake(this, 8, 8);

    //  Create our keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update (time, delta)
{
    //console.log('Update');
    if (!snake.alive)
    {
        return;
    }

    /**
    * Check which key is pressed, and then change the direction the snake
    * is heading based on that. The checks ensure you don't double-back
    * on yourself, for example if you're moving to the right and you press
    * the LEFT cursor, it ignores it, because the only valid directions you
    * can move in at that time is up and down.
    */

    if (cursors.left.isDown)
    {
        snake.faceLeft();
    }
    else if (cursors.right.isDown)
    {

        snake.faceRight();
    }
    else if (cursors.up.isDown)
    {
        snake.faceUp();
    }
    else if (cursors.down.isDown)
    {
        snake.faceDown();
    }

    if (snake.update(time))
    {
        //  If the snake updated, we need to check for collision against food

        if (snake.collideWithFood(food))
        {
            repositionFood();
        }
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
function repositionFood ()
{
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++)
    {
        testGrid[y] = [];

        for (var x = 0; x < 40; x++)
        {
            testGrid[y][x] = true;
        }
    }

    snake.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++)
    {
        for (var x = 0; x < 40; x++)
        {
            if (testGrid[y][x] === true)
            {
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x, y: y });
            }
        }
    }

    if (validLocations.length > 0)
    {
        //  Use the RNG to pick a random food position
        var pos = Phaser.Math.RND.pick(validLocations);

        //  And place it
        console.log(pos)
        food.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}

};

export default class Game {

  constructor(engine) {
    this.engine = engine;
  }

  preload() {
  }

  create() {
  }

  update() {
  }

  // constructor(canvasId, fn) {
  //   this.fn = fn;
  //   const canvas = document.getElementById(canvasId);
  //   this.ctx = canvas.getContext('2d');
  //   this.width = canvas.width;;
  //   this.height = canvas.height;
  //   this.cw = 10;  //cell width

  //   this.speed = 100;
  //   this.scoreEl = document.getElementById('score');
  // }

  // start() {
  //   this.createSnake();
  //   this.createFood();

  //   if (typeof this.gameLoop != 'undefined') {
  //     clearInterval(this.gameLoop);
  //   }
  //   // call the paint function depending on game speed
  //   this.gameLoop = setInterval(() => this.render(), this.speed);
  //   this.keyControlListener();
  // }

  // keyControlListener() {
  //   // keyboard controls
  //   document.addEventListener('keydown', (e) => {
  //     const { key } = e;
  //     let dir;
  //     if (key === 'h') dir = DIRECTION.LEFT;
  //     else if (key === 'j') dir = DIRECTION.DOWN;
  //     else if (key === 'l') dir = DIRECTION.RIGHT;
  //     else if (key === 'k') dir = DIRECTION.UP;

  //     const directionPrevious = this.snake.direction;
  //     this.snake.updateDirection(dir);

  //     if (directionPrevious !== dir) {
  //       this.fn.updateDirection(dir);
  //     }
  //   })
  // }

  // createSnake() {
  //   this.snake = new Snake(this, 0, { x: DEFAULT_LENGTH - 1, y: 0 });
  // }

  // createFood() {
  //   this.food = {
  //     x: Math.round(Math.random() * (this.width - this.cw) / this.cw),
  //     y: Math.round(Math.random() * (this.height - this.cw) / this.cw),
  //   };
  // }

  // render() {
  //   this.scoreEl.innerHTML = this.snake.score;

  //   // paint the GB on every frame
  //   // paint the canvas
  //   this.ctx.fillStyle = 'black';
  //   this.ctx.fillRect(0, 0, this.width, this.height);
  //   this.ctx.strokeStyle = '#00CC00';
  //   this.ctx.strokeRect(0, 0, this.width, this.height);

  //   if (!this.snake.render()) {
  //     clearInterval(this.gameLoop);
  //     const { score } = this.snake;
  //     this.fn.submitScore({ score })
  //       .then(() => {
  //         this.start();
  //       });
  //   }

  //   paintCell(this.ctx, this.food.x, this.food.y, this.cw, '#f1c40f');
  // }
}
