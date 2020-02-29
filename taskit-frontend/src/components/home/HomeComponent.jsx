import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AuthenticatedRoute from '../common/AuthenticatedRoute';
import OneComponent from './OneComponent';
import TwoComponent from './TwoComponent';
import AuthenticationService from '../common/AuthenticationService';
import { Layout, Menu, Icon, Button } from 'antd';
import 'antd/es/menu/style/css'
import './home.css';

const { Header, Content, Footer, Sider } = Layout;

class HomeComponent extends Component {

  contentOne = () => {
    this.props.history.push('/home/content-one')
  }

  contentTwo = () => {
    this.props.history.push('/home/content-two')
  }

  logout = () => {
    AuthenticationService.logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="HomeComponent">
        <Layout>
          <Header className="header-home">
            <Button className="button-logout" onClick={this.logout}>Logout<Icon className="icon-lo" type="logout" /></Button>
          </Header>
          <Layout>
            <Sider className="sider">
              <Menu>
                <Menu.Item 
                key="1"
                onClick={this.contentOne}>
                  <span>Option 1</span>
                </Menu.Item>
                <Menu.Item 
                key="2"
                onClick={this.contentTwo}>
                  <span>Option 2</span>
                </Menu.Item>
                <Menu.Item 
                key="3"
                onClick={this.contentTwo}>
                  <span>Option 3</span>
                </Menu.Item>
                <Menu.Item 
                key="4"
                onClick={this.contentTwo}>
                  <span>Option 4</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
              <Switch>
                <AuthenticatedRoute path="/home/content-one" component={OneComponent} />
                <AuthenticatedRoute path="/home/content-two" component={TwoComponent} />
              </Switch>
            </Content>
          </Layout>
          <Footer className="footer-login"></Footer>
        </Layout>
      </div>
    );
  }
}

export default HomeComponent;
