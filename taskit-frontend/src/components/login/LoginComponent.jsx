import React, { Component } from 'react';
import AuthenticationService from '../common/AuthenticationService.js';
import { Link } from 'react-router-dom';
import { Layout, notification } from 'antd';
import './login.css';
import 'antd/es/notification/style/css'
import Logo from './logo.png';


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
      .then(response => { AuthenticationService.setToken(response.data.token) })
      .then(() => AuthenticationService.getUsernameByUsernameOrEmail(this.state.username))
      .then(username => {
        AuthenticationService.registerSuccesfulLogin(username)
        this.props.history.push('/home/working-tasks')
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
            <div className="text">
              <img style={{ zoom: '12%' }} src={Logo} />
            </div>
          </Header>
          <Content>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h1 style={{ color: '#696969' }}>Sign in</h1>
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
