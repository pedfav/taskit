import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Switch } from 'react-router-dom';
import AuthenticatedRoute from '../AuthenticatedRoute';
import OneComponent from './OneComponent';
import TwoComponent from './TwoComponent';
import AuthenticationService from '../AuthenticationService';

const { Header, Footer, Sider, Content } = Layout;

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
          <Header>Header</Header>
          <Layout>
            <Sider>
              <Menu>
                <Menu.Item key="1">
                  <button className="button-cli btn-block" onClick={this.contentOne}>Content 1</button>
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
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default HomeComponent;
