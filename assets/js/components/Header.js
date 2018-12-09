import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu } from 'element-react';

import { history } from '../store';
import { logout } from '../actions/authActions';

const styles = {
  header: {
    backgroundColor: '#324157',
  },
  title: {
    margin: 0,
    marginLeft: '1em',
    color: '#fff',
  },
};

class Header extends Component {

  onSelectMenu = (index, a) => {
    switch (index) {
      case "1": return this.onClickPlay();
      case "2": return this.onClickLogin();
      case "3": return this.onClickLogout();
    }
  };

  onClickPlay = () => {
    history.push('/play');
  };

  onClickLogin = () => {
    history.push('/login');
  };

  onClickLogout = () => {
    this.props.onLogout();
  };

  render() {
    const { isAuthen, currentUser } = this.props;

    return (
      <Layout.Row type="flex" justify="space-between" align="middle" style={styles.header}>
        <h1 style={styles.title}>Vim Snake</h1>
        <div>
          <Menu theme="dark" mode="horizontal" onSelect={this.onSelectMenu}>
            {isAuthen && <Menu.Item index="0">Hi {currentUser.username},</Menu.Item>}
            {isAuthen && <Menu.Item index="1">Play</Menu.Item>}
            {!isAuthen && <Menu.Item index="2">Login</Menu.Item>}
            {isAuthen && <Menu.Item index="3">Logout</Menu.Item>}
          </Menu>
        </div>
      </Layout.Row>
    );
  }
}

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
  isAuthen: !!currentUser.id,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

