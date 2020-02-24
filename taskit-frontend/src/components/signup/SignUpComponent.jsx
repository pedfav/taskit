import React, { Component } from 'react';
import { Layout } from 'antd';
import './signup.css';

const { Header, Footer, Content } = Layout;


class SignUpComponent extends Component {
  render() {
    return (
      <div className="SignUpComponent">
        <Header className="header-login">
          <div className="text">Taskit</div>
        </Header>
        <Content>Sign up!</Content>
        <Footer className="footer footer-login"></Footer>
      </div>
    );
  }
}

export default SignUpComponent;
