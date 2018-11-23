import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'element-react';

import { updateScore } from '../../actions/gameActions';
import Game from '../../game/game';
import ScoreBoard from './ScoreBoard';


const styles = {
  gameContainer: {
    marginTop: '1em',
  },
  scoreBoardContaner: {
    marginLeft: '1em',
  },
};

class Play extends Component {

  componentDidMount() {
    const game = new Game('canvas', { submitScore: this.onSubmitScore });
    game.start();
  }

  onSubmitScore = ({ score }) => {
    const { onUpdateScore, currentUser: { highscore } } = this.props;
    if (score > highscore) {
      return onUpdateScore(score);
    }
    return new Promise((resolve) => resolve());
  }

  render() {
    return (
      <Layout.Row type="flex" justify="center">
        <div style={styles.gameContainer}>
          <canvas id="canvas" width="800" height="500"></canvas><br />
          <p>Score: <span id="score"></span></p>
        </div>
        <div style={styles.scoreBoardContaner}>
          <h3>Your Highscore</h3>
          <ScoreBoard />
        </div>
      </Layout.Row>
    );
  }
}

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = dispatch => ({
  onUpdateScore: score => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
