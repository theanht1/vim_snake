import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { Loading } from 'element-react';

import { history } from '../store';
import Home from './Home';
import Login from './Login';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          {this.props.loading && <Loading fullscreen={true} />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ app: { loading } }) => ({
  loading,
});

export default connect(mapStateToProps)(App);
