import React, { Component } from 'react';
import { Layout } from 'element-react';
import Game from '../../game/game';

class Play extends Component {
  componentDidMount() {
    const game = new Game('canvas');
    game.start();
  }

  render() {
    return (
      <Layout.Row>
        <div className="game">
          <canvas id="canvas" width="500" height="500"></canvas><br />
          <p>Score: <span id="score"></span></p>
        </div>
      </Layout.Row>
    );
  }
}

export default Play;
