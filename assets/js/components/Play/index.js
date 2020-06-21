import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Button } from 'element-react';

import { initSocket, joinChannel } from '../../socket';
import { updateScore } from '../../actions/gameActions';
import Game, { createGame } from '../../game/game';
import ScoreBoard from './ScoreBoard';
import { JWT_TOKEN_KEY } from '../../actions/authActions';
import { BOARD_SIZE } from '../../utils/constants';


const styles = {
  layout: {
    flexWrap: 'wrap',
  },
  gameContainer: {
    marginTop: '1em',
    minWidth: BOARD_SIZE.width,
  },
  scoreBoardContaner: {
    marginLeft: '1em',
  },
  mask: {
    position: 'absolute',
    width: BOARD_SIZE.width + 10,
    height: BOARD_SIZE.height + 13,
    background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
  },
};

class Play extends Component {
  state = {
    showPlayMask: true,
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

    if (this.game) {
      this.game.destroy();
    }
  }

  initGame = () => {
    const { currentUser } = this.props;
    const token = localStorage.getItem(JWT_TOKEN_KEY);
    this.socket = initSocket(token, currentUser);
    this.channel = joinChannel(this.socket, 'game:default');

    this.game = createGame({
      elId: 'game',
      channel: this.channel,
      user: currentUser,
      width: BOARD_SIZE.width,
      height: BOARD_SIZE.height,
    });

    this.channel.on('update_players', ({ players }) => {
      this.setState({ players: players || [] });
      const { showPlayMask } = this.state;
      if (!players.find(p => p.user_id === currentUser.id) && !showPlayMask) {
        this.setState({ showPlayMask: true });
      }
    });

    this.channel.on('update_snakes', ({ snakes }) => {
      this.setState({ snakes: snakes || [] });
    });

    this.channel.on('update_highscore', ({ highscore }) => {
      this.setState({ highscore: highscore || {} });
    });
  };

  onStartGame = () => {
    this.setState({ showPlayMask: false });
    this.channel.push('new_player', {abc: 123});
  };

  render() {
    const { showPlayMask, players, snakes, highscore } = this.state;

    return (
      <Layout.Row type="flex" justify="center" style={styles.layout}>
        <div style={styles.gameContainer}>
          <div>
            {showPlayMask && (
              <div style={styles.mask}>
                <Layout.Row className="full-h" type="flex" justify="center" align="middle">
                  <Button onClick={this.onStartGame}>
                    Play
                  </Button>
                </Layout.Row>
              </div>
            )}
            <div id="game"></div>
          </div>
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
