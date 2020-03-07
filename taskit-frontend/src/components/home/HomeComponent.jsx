import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AuthenticatedRoute from '../common/AuthenticatedRoute';
import CreateTaskComponent from '../tasks/CreateTaskComponent';
import TaskGridComponent from '../tasks/TaskGridComponent'
import AuthenticationService from '../common/AuthenticationService';
import { Layout, Menu, Icon, Button } from 'antd';
import 'antd/es/menu/style/css'
import './home.css';

const { Header, Content, Footer, Sider } = Layout;

class HomeComponent extends Component {

  renderNewTask = () => {
    this.props.history.push('/home/new-task')
  }

  renderYourTaskGrid = () => {
    this.props.history.push('/home/your-tasks')
  }

  renderDepartmentTaskGrid = () => {
    this.props.history.push('/home/department-tasks')
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
                  onClick={this.renderNewTask}>
                  <span>New task!</span>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={this.renderDepartmentTaskGrid}>
                  <span>Department tasks</span>
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={this.renderYourTaskGrid}>
                  <span>Your Tasks</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
              <Switch>
                <AuthenticatedRoute path="/home/new-task" component={CreateTaskComponent} />
                <AuthenticatedRoute path="/home/department-tasks" component={() => <TaskGridComponent name="Department tasks" />} />
                <AuthenticatedRoute path="/home/your-tasks" component={() => <TaskGridComponent name="Your tasks" />} />
              </Switch>
            </Content>
        </Layout>
            <Footer className="footer-login"></Footer>
          </Layout>
      </div >
        );
      }
    }
    
    export default HomeComponent;
