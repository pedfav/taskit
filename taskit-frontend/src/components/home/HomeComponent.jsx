import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AuthenticatedRoute from '../common/AuthenticatedRoute';
import CreateDepartmentComponent from '../department/CreateDepartmentComponent';
import CreateKnowledgeTagComponent from '../tag/CreateKnowledgeTagComponent';
import CreateTaskComponent from '../tasks/CreateTaskComponent';
import TasksByDepartmentComponent from '../tasks/TasksByDepartmentComponent'
import TasksAssignedComponent from '../tasks/TasksAssignedComponent'
import TasksByRequesterComponent from '../tasks/TasksByRequesterComponent'
import AuthenticationService from '../common/AuthenticationService';
import ProfileComponent from '../profile/ProfileComponent';
import { FaTasks, FaSearch, FaTags } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { IoIosLogOut, IoMdPerson } from "react-icons/io";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import Logo from '../login/logo.png';

import { Layout, Menu, Icon, Button, Dropdown } from 'antd';
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
  
  renderNewKnowledgeTag = () => {
    this.props.history.push('/home/new-knowledge-tag')
  }

  renderWorkingTaskGrid = () => {
    this.props.history.push('/home/working-tasks')
  }

  renderDepartmentTaskGrid = () => {
    this.props.history.push('/home/department-tasks')
  }

  renderListDepartment = () => {
    this.props.history.push('/home/list-departments')
  }

  renderYourTasks = () => {
    this.props.history.push('/home/your-tasks')
  }

  renderProfile = () => {
    this.props.history.push('/home/profile')
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
            <img style={{
              zoom: '12%',
              float: 'center',
              paddingLeft: '200px',
              paddingTop: '150px',
            }}
              src={Logo} />
            <Dropdown overlay={
              <Menu style={{ alignContent: 'right' }}>
                <Menu.ItemGroup style={{ width: '150px' }}
                  key="0">
                  <div>
                    <span style={{ paddingLeft: '8px', verticalAlign: 'middle' }}>
                      {`Hello, ${AuthenticationService.getUserLoggedIn()}`}
                    </span>
                  </div>
                </Menu.ItemGroup>
                <Menu.Divider />
                <Menu.Item style={{ width: '150px' }}
                  key="1"
                  onClick={this.renderProfile}>
                  <div>
                    <GiPlagueDoctorProfile style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                    <span style={{ paddingLeft: '8px', verticalAlign: 'middle' }}>Profile</span>
                  </div>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={this.logout}>
                  <div>
                    <IoIosLogOut style={{ verticalAlign: 'middle', fontSize: '20px' }} />
                    <span style={{ paddingLeft: '8px', verticalAlign: 'middle' }}>Logout</span>
                  </div>
                </Menu.Item>
              </Menu>
            } trigger={['click']}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Icon style={{ fontSize: '30px' }} className="icon-lo" type="down" />
              </a>
            </Dropdown>
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
                    onClick={this.renderWorkingTaskGrid}>
                    <span>Working tasks</span>
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    onClick={this.renderYourTasks}>
                    <span>Opened by you</span>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title={
                  <div>
                    <GoOrganization style={{ verticalAlign: 'middle' }} />
                    <span style={{ paddingLeft: '8px', verticalAlign: 'middle' }}>Department</span>
                  </div>
                }>
                  <Menu.Item
                    key="5"
                    onClick={this.renderNewDepartment}>
                    <span>New department</span>
                  </Menu.Item>
                  <Menu.Item
                    key="6"
                    onClick={this.renderListDepartment}>
                    <span>List departments</span>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g3" title={
                  <div>
                    <FaTags style={{ verticalAlign: 'middle' }} />
                    <span style={{ paddingLeft: '8px', verticalAlign: 'middle' }}>Knowledge tags</span>
                  </div>
                }>
                  <Menu.Item
                    key="7"
                    onClick={this.renderNewKnowledgeTag}>
                    <span>Manage knowledge tag</span>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g4" title={
                  <div>
                    <FaSearch style={{ verticalAlign: 'middle' }} />
                    <span style={{ paddingLeft: '8px', verticalAlign: 'middle' }}>Find</span>
                  </div>
                }>
                  <Menu.Item
                    key="8"
                    onClick={this.renderNewDepartment}>
                    <span>Find user by knowledge</span>
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu>
            </Sider>
            <Content>
              <Switch>
                <AuthenticatedRoute path="/home/new-task" component={CreateTaskComponent} />
                <AuthenticatedRoute path="/home/department-tasks" component={TasksByDepartmentComponent} />
                <AuthenticatedRoute path="/home/working-tasks" component={TasksAssignedComponent} />
                <AuthenticatedRoute path="/home/new-department" component={CreateDepartmentComponent} />
                <AuthenticatedRoute path="/home/new-knowledge-tag" component={CreateKnowledgeTagComponent} />
                <AuthenticatedRoute path="/home/list-departments" component={ListDepartmentComponent} />
                <AuthenticatedRoute path="/home/your-tasks" component={TasksByRequesterComponent} />
                <AuthenticatedRoute path="/home/profile" component={ProfileComponent} />
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
