import React, { Component } from 'react';
import Game from '../../game/game';

class Home extends Component {
  componentDidMount() {
    const game = new Game('canvas');
    game.start();
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <h1>Snake Vim Trainer</h1>
          <h2>Hone your vim navigation skillz</h2>
          <div className="game">
            <canvas id="canvas" width="500" height="500"></canvas><br />
            <p>Score: <span id="score"></span></p>
          </div>
        </div>

        <div className="col">
          <h2>Instructions</h2>
          <p>Make your Vim snake eat the food to increase your score.</p>
          <p>You can only eat food while INSERT mode is on.</p>
          <p>You cannot change direction while INSERT mode is on</p>
          <p>Controls:</p>
          <ul>
            <li>Left: h</li>
            <li>Down: j</li>
            <li>Up: k</li>
            <li>Right: l</li>
            <li>Insert mode: i</li>
            <li>Normal mode: esc</li>
          </ul>

        </div>
      </div>
    );
  }
}

export default Home;
