import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'element-react';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

class Home extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1>Snake Vim Trainer</h1>
        <h2>Instructions</h2>
        <p>Make your Vim snake eat the food to increase your score.</p>
        <p>Controls:</p>
        <ul>
          <li>Left: <strong>h</strong></li>
          <li>Down: <strong>j</strong></li>
          <li>Up: <strong>k</strong></li>
          <li>Right: <strong>l</strong></li>
        </ul>
        <Link to="/play">
          <Button type="primary">
            Play Now
          </Button>
        </Link>
      </div>
    );
  }
}

export default Home;
