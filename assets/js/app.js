// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from '../css/app.css'

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in 'webpack.config.js'.
//
// Import dependencies
//
import 'phoenix_html'

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from './socket'

$(document).ready(function(){

  // Canvas setup
  const canvas = $('#canvas')[0];
  const ctx = canvas.getContext('2d');
  const w = $('#canvas').width();;
  const h = $('#canvas').height()


  const cw = 10;  //cell width
  const initalLength = 5;
  let d;  //direction
  let food;
  let score = 0;
  let snake_array;
  let insert_mode;
  let speed;  // in miliseconds
  let game_loop;

  const init = () => {
    d = 'right';  //default direction
    score = 0;
    speed = 100;
    create_snake();
    create_food();
    insert_mode = false;

    if (typeof game_loop != 'undefined') {
      clearInterval(game_loop);
    }
    // call the paint function depending on game speed
    game_loop = setInterval(paint, speed);
  }


  const create_snake = () => {
    //snake_array = Array.from(Array(initalLength)).map((_, i) => ({ x: i, y: 0 }));
    length = 5;
    snake_array = []

    for(var i=length-1;i>=0; i--){
      snake_array.push({x: i, y: 0});
    }
    console.log(snake_array);
  };

  const create_food = () => {
    food = {
      x: Math.round(Math.random()*(w-cw)/cw),
      y: Math.round(Math.random()*(h-cw)/cw),
    };
  };

  // paint the snake
  const paint = () => {
    $('#score').html(score);
    //$('#speed').html(speed)

    // paint the GB on every frame
    // paint the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = '#00CC00';
    ctx.strokeRect(0,0,w,h);

    // this is the head of snake
    let nx = snake_array[0].x;
    let ny = snake_array[0].y;

    // increment to get new head position and find direction
    if (d === 'right') nx++;
    else if (d === 'left') nx--;
    else if (d === 'up') ny--;
    else if (d === 'down') ny++;

    if (check_collision(nx,ny,snake_array)) {
      // Submit result
      init(); //resart game
      return;
    }

    // Logic to make snake eat food
    // if head position is same as food create new head instead of moving tail
    let tail;
    if (nx === food.x && ny === food.y && insert_mode) {
      tail = { x: nx, y: ny };
      score++;
      speed -= 10;
      create_food();
    } else {
      // move the tail cell in front of the head
      snake_array.pop();  //take last cell
      tail = { x: nx, y: ny };  //give cell new position
    }
    snake_array.unshift(tail); //add tail as first cell

    for (var i=0; i<snake_array.length; i++){
      var c = snake_array[i];
      // paint snake cells
      paint_cell(c.x,c.y,'#00CC00');
    }

    paint_cell(food.x, food.y, '#f1c40f');

    if (insert_mode) {
      ctx.font = '12pt monospace';
      ctx.fillStyle = '#00CC00';
      ctx.fillText('--INSERT--', 5, h-5);
    }
  };

  // paint cells
  const paint_cell = (x, y, color) => {
    color = color || '#e74c3c';
    // paint food cells
    ctx.fillStyle = color;
    ctx.fillRect(x * cw, y * cw, cw, cw);
    ctx.strokeStyle = color;
    ctx.strokeRect(x * cw, y * cw, cw , cw);
  };

  const check_collision = (x, y, array) => {
    // wall collision detection
    if (x <= -1 || x >= w / cw || y <= -1 || y >= h / cw) {
      return true;
    }
    // check body collision
    for (var i = 0; i < array.length; i++) {
      if(x == array[i].x && y == array[i].y) {
        return true;
      }
    }
    return false;
  };

  // keyboard controls
  $(document).keydown((e) => {
    const key = e.which;
    console.log(key);

    // arrow keys
    // if(key == '37' && d != 'right') d = 'left'
    // else if (key == '38' && d != 'up') d = 'down'
    // else if (key == '39' && d != 'left') d = 'right'
    // else if (key == '40' && d != 'down') d = 'up'

    // vim controls
    if (insert_mode){
      if ( key == '27' || (e.ctrlKey && key == '219'  ) ) insert_mode = false;
    } else {
      if(key == '72' && d != 'right') d = 'left';
      else if (key == '74' && d != 'up') d = 'down';
      else if (key == '76' && d != 'left') d = 'right';
      else if (key == '75' && d != 'down') d = 'up';
      else if (key == '73') insert_mode = true;
      else if (key == '27') insert_mode = false;
    }
  })

  init();
})

