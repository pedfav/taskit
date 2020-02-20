import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from '../AuthenticatedRoute';
import OneComponent from './OneComponent';
import TwoComponent from './TwoComponent';

const { Header, Footer, Sider, Content } = Layout;

class HomeComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: 'default'
    }
  }

  contentOne = () => {
    this.props.history.push('/content-one')
  }

  contentTwo = () => {
    this.props.history.push('/content-two')
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
              </Menu>
            </Sider>
            <Content>
              <Router>
                <>
                  <Switch>
                    <AuthenticatedRoute path="/content-one" component={OneComponent} />
                    <AuthenticatedRoute path="/content-two" component={TwoComponent} />
                  </Switch>
                </>
              </Router>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default HomeComponent;
