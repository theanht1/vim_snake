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
        <h1>Snake Game</h1>
        <h2>Instructions</h2>
        <p>Make your snake eat the food to increase your score.</p>
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
