import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AuthenticatedRoute from '../common/AuthenticatedRoute';
import CreateDepartmentComponent from '../department/CreateDepartmentComponent';
import CreateTaskComponent from '../tasks/CreateTaskComponent';
import TasksByDepartmentComponent from '../tasks/TasksByDepartmentComponent'
import TasksAssignedComponent from '../tasks/TasksAssignedComponent'
import AuthenticationService from '../common/AuthenticationService';
import { FaTasks } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";

import { Layout, Menu, Icon, Button } from 'antd';
import 'antd/es/menu/style/css'
import './home.css';
import ListDepartmentComponent from '../department/ListDepartmentComponent';

const { Header, Content, Footer, Sider } = Layout;

class HomeComponent extends Component {

  renderNewTask = () => {
    this.props.history.push('/home/new-task')
  }

  renderNewDepartment = () => {
    this.props.history.push('/home/new-department')
  }

  renderYourTaskGrid = () => {
    this.props.history.push('/home/your-tasks')
  }

  renderDepartmentTaskGrid = () => {
    this.props.history.push('/home/department-tasks')
  }

  renderListDepartment = () => {
    this.props.history.push('/home/list-departments')
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
                <Menu.ItemGroup key="g1" title={
                  <div>
                    <FaTasks style={{ verticalAlign: 'middle' }} />
                    <span style={{ paddingLeft: '8px', verticalAlign: 'middle' }}>Task</span>
                  </div>
                }>
                  <Menu.Item
                    key="1"
                    onClick={this.renderNewTask}>
                    <span>New task</span>
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
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title={
                  <div>
                    <GoOrganization style={{ verticalAlign: 'middle' }} />
                    <span style={{ paddingLeft: '8px', verticalAlign: 'middle' }}>Department</span>
                  </div>
                }>
                  <Menu.Item
                    key="4"
                    onClick={this.renderNewDepartment}>
                    <span>New department</span>
                  </Menu.Item>
                  <Menu.Item
                    key="5"
                    onClick={this.renderListDepartment}>
                    <span>List departments</span>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu>
            </Sider>
            <Content>
              <Switch>
                <AuthenticatedRoute path="/home/new-task" component={CreateTaskComponent} />
                <AuthenticatedRoute path="/home/department-tasks" component={TasksByDepartmentComponent} />
                <AuthenticatedRoute path="/home/your-tasks" component={TasksAssignedComponent} />
                <AuthenticatedRoute path="/home/new-department" component={CreateDepartmentComponent} />
                <AuthenticatedRoute path="/home/list-departments" component={ListDepartmentComponent} />
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
