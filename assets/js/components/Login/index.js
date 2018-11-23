import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Card, Button } from 'element-react';

import { login } from '../../actions/userActions.js';


class Login extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Layout.Row className="v-container" type="flex" justify="center" align="middle">
          <Card style={{ maxWidth: 450 }}>
            <Button
              type="primary"
              onClick={this.props.onLogin}
            >Login with Google</Button>
          </Card>
      </Layout.Row>
    );
  }
}

const mapStateToProps = ({ user: { loginLoading } }) => ({
  loginLoading,
});

const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
