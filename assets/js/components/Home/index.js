import React, { Component } from 'react';


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
        <h2>Hone your vim navigation skillz</h2>
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
    );
  }
}

export default Home
