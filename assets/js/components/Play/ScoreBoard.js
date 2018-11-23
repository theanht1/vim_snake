import React, { Component } from 'react';
import { connect } from 'react-redux';


const styles = {
};

class ScoreBoard extends Component {

  render() {
    const { currentUser: { highscore } } = this.props;

    return (
      <div style={styles.container}>
        {highscore}
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
});

export default connect(mapStateToProps)(ScoreBoard);

