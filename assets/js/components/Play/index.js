import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'element-react';

import { initSocket, joinChannel } from '../../socket';
import { updateScore } from '../../actions/gameActions';
import Game, { createGame } from '../../game/game';
import ScoreBoard from './ScoreBoard';
import { JWT_TOKEN_KEY } from '../../actions/authActions';


const styles = {
  gameContainer: {
    marginTop: '1em',
  },
  scoreBoardContaner: {
    marginLeft: '1em',
  },
};

class Play extends Component {
  state = {
    players: [],
    snakes: [],
    highscore: {},
  };

  componentDidMount() {
    if (this.props.currentUser.id && !this.socket) {
      this.initGame();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser.id && !this.socket) {
      this.initGame();
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  initGame = () => {
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    this.socket = initSocket(token);
    this.channel = joinChannel(this.socket, 'game:default');
    createGame({
      elId: 'game',
      channel: this.channel,
      user: this.props.currentUser,
      width: 640,
      height: 480,
    });

    this.channel.on('update_players', ({ players }) => {
      this.setState({ players: players || [] });
    });

    this.channel.on('update_snakes', ({ snakes }) => {
      this.setState({ snakes: snakes || [] });
    });

    this.channel.on('update_highscore', ({ highscore }) => {
      this.setState({ highscore: highscore || {} });
    });
  };

  onSubmitScore = ({ score }) => {
    const { onUpdateScore, currentUser: { highscore } } = this.props;
    if (score > highscore) {
      return onUpdateScore(score);
    }
    return new Promise((resolve) => resolve());
  };

  render() {
    const { players, snakes, highscore } = this.state;

    return (
      <Layout.Row type="flex" justify="center">
        <div style={styles.gameContainer}>
          <div id="game"></div>
        </div>
        <div style={styles.scoreBoardContaner}>
          <h3>Ranking</h3>
          <ScoreBoard players={players} snakes={snakes} highscore={highscore} />
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
