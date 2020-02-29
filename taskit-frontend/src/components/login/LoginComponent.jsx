import React, { Component } from 'react';
import AuthenticationService from '../common/AuthenticationService.js';
import { Link } from 'react-router-dom';
import { Layout, notification } from 'antd';
import './login.css';
import 'antd/es/notification/style/css'


const { Header, Footer, Content } = Layout;

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      hasLoginFailed: false,
      showSuccessMessage: false
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  loginClicked = () => {
    AuthenticationService
      .executeAuthenticationService(this.state.username, this.state.password)
      .then(response => {
        AuthenticationService.registerSuccesfulLogin(this.state.username, response.data.token)
        this.props.history.push('/home/content-one')
      }).catch(() => {
        notification.error({
          message: 'Taskit',
          description: 'Sorry! Something went wrong. Please try again!'
        });
      })
  }

  render() {
    return (
      <div className="LoginComponent">
        <Layout>
          <Header className="header-login">
            <div className="text">Taskit</div>
          </Header>
          <Content>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h1>Sign in</h1>
                <div className="form-group">
                  <input type="text" name="username" placeholder="Username or Email" className="form-control" value={this.state.username} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <input type="password" name="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.handleChange} />
                </div>
                <button className="button-cli btn-block" onClick={this.loginClicked}>Login</button>
                <br></br>
                <p >
                  Not registered yet? <Link className="signup-link" to="/signup">Sign up!</Link>
                </p>
              </div>
            </div>
          </Content>
          <Footer className="footer footer-login"></Footer>
        </Layout>
      </div>
    );
  }
}

export default LoginComponent;
