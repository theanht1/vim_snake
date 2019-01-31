import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Card, Button } from 'element-react';

import { login } from '../../actions/authActions';


const styles = {
  card: {
    marginTop: 100,
    maxWidth: 450,
    height: 80,
  },
};

class Login extends Component {

  render() {
    return (
      <Layout.Row className="v-container" type="flex" justify="center">
          <Card style={styles.card}>
            <Button
              type="primary"
              onClick={this.props.onLogin}
            >Login with Facebook</Button>
          </Card>
      </Layout.Row>
    );
  }
}

const mapStateToProps = ({ auth: { loginLoading } }) => ({
  loginLoading,
});

const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
