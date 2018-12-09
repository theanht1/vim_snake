import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'element-react';

import { getSnakeColor } from '../../utils/gamePlay';

const styles = {
};

const columns = [
  { type: 'index' },
  {
    label: 'Player',
    prop: 'username',
    width: '150',
    render: (row) => (
      <strong>{row.username}</strong>
    ),
  },
  {
    label: 'Score',
    prop: 'score',
  },
];

class ScoreBoard extends Component {

  getSortedScore = (players, snakes) => {
    return players.map(player => {
      const snake = snakes.find(s => s.user_id === player.user_id);
      return {
        ...player,
        score: snake ? snake.pos.length : 0,
      };
    }).sort((s1, s2) => s1.score < s2.score ? 1 : -1);
  };

  getRowStyle = (snake) => {
    return {
      color: `#${getSnakeColor(snake.user_id)}`,
    };
  };

  render() {
    const { currentUser, players, snakes } = this.props;
    const users = this.getSortedScore(players, snakes);

    return (
      <div style={styles.container}>
        <Table
          data={users}
          columns={columns}
          rowStyle={this.getRowStyle}
          stripe
          fit
          emptyText="No players"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(ScoreBoard);

