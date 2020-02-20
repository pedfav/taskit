import React, { Component } from 'react';
import AuthenticationService from '../AuthenticationService';
import { Layout } from 'antd';
import './login.css';

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
    console.log("entrou")
    AuthenticationService
      .executeAuthenticationService(this.state.username, this.state.password)
      .then(response => {
        AuthenticationService.registerSuccesfulLogin(this.state.username, response.data.token)
        this.props.history.push('/home')
      }).catch(() => {
        this.setState({ showSuccessMessage: false })
        this.setState({ hasLoginFailed: true })
      })
  }

  dismissAlert = () => {
    this.setState({ hasLoginFailed: false })
  }

  render() {
    return (
      <div className="LoginComponent">
        <Layout>
          <Header className="header-login">
            <div className="text">Taskit</div>
          </Header>
          <Content>
            {this.state.hasLoginFailed && <div class="alert alert-warning alert-dismissible fade show" role="alert">
              Invalid Credentials
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.dismissAlert}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>}
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h3>Sign in</h3>
                <div className="form-group">
                  <label>User name</label>
                  <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
                </div>
                <button className="button-cli btn-block" onClick={this.loginClicked}>Login</button>
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
