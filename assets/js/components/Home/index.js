import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'element-react';
import { createNewGuestUser } from '../../actions/authActions';
import { showNotification } from '../../utils';


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
      },
      rules: {
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' }
        ],
       },
    };
  }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.refs.form.validate((valid) => {
      if (valid) {
        this.props.onPlay(this.state.form.username);
      } else {
        showNotification('error', {
          title: 'Error',
          message: '"username" cannot be empty',
        });
        return false;
      }
    });
  }

  render() {
    const { loginLoading } = this.props;
    return (
      <div style={styles.container}>
        <h1>Snake Vim Trainer</h1>
        <h2>Instructions</h2>
        <p>Make your Vim snake eat the food to increase your score.</p>
        <p>Source code available on <a href="https://github.com/theanht1/vim_snake">github</a></p>
        <p>Controls:</p>
        <ul>
          <li>Left: <strong>h</strong></li>
          <li>Down: <strong>j</strong></li>
          <li>Up: <strong>k</strong></li>
          <li>Right: <strong>l</strong></li>
        </ul>
        <Form ref="form" className="en-US" inline={true} model={this.state.form} rules={this.state.rules} onSubmit={this.onSubmit.bind(this)}>
          <Form.Item label="Username" prop="username">
            <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')}></Input>
          </Form.Item>
          <Form.Item>
            <Button loading={loginLoading} type="primary" nativeType="submit">Play</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { loginLoading } }) => ({
  loginLoading,
});

const mapDispatchToProps = dispatch => ({
  onPlay: username => dispatch(createNewGuestUser(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
