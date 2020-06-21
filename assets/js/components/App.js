import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Loading } from 'element-react';

import Home from './Home';
import Play from './Play';
import Login from './Login';
import Header from './Header';

class App extends Component {

  renderAuthorized = (tag) => {
    const { loading, isLogin } = this.props;
    return loading || isLogin ? tag : <Redirect to="/" />;
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/play' render={() => this.renderAuthorized(<Play />)} />
          {/*<Route exact path='/login' component={Login} />*/}
          {this.props.loading && <Loading fullscreen={true} />}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ app: { loading }, auth: { currentUser } }) => ({
  loading,
  isLogin: !!currentUser.id,
});

export default connect(mapStateToProps)(App);
