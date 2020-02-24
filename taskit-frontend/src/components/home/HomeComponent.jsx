import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AuthenticatedRoute from '../AuthenticatedRoute';
import OneComponent from './OneComponent';
import TwoComponent from './TwoComponent';
import AuthenticationService from '../AuthenticationService';
import { Layout, Menu, Icon } from 'antd';
import './home.css';

const { Header, Content, Footer, Sider } = Layout;


class HomeComponent extends Component {

  constructor(props) {
    super(props);
  }

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
          <Header className="header-home"></Header>
          <Layout>
            <Sider className="sider">
              <Menu>
                <Menu.Item key="1">
                  <Icon type="rocket" /><button className="button-cli btn-block" onClick={this.contentOne}>Content 1</button>
                </Menu.Item>
                <Menu.Item key="2">
                  <button className="button-cli btn-block" onClick={this.contentTwo}>Content 2</button>
                </Menu.Item>
                <Menu.Item key="3">
                  <button className="button-cli btn-block" onClick={this.logout}>Logout</button>
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
