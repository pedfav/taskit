import React, { Component } from 'react';
import TaskService from './TaskService.js'
import AuthenticationService from '../common/AuthenticationService.js';

import { Table, Icon, notification } from 'antd';
import 'antd/es/table/style/css';
import 'antd/es/modal/style/css';
import './tasks.css';


class TasksByDepartmentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    TaskService.getTasksByUserDepartment(AuthenticationService.getUserLoggedIn())
      .then(response => {
        this.setState({ tasks: response.data })
      })
  }

  assignTask = (record) => {
    TaskService.assignTask(AuthenticationService.getUserLoggedIn(), record.id)
      .then(() => {

        this.setState({
          tasks: this.state.tasks.filter(task => task.id !== record.id)
        })

        notification.success({
          message: 'Taskit',
          description: `Task #${record.id} assigned to you!`,
          duration: 2
        });
      })
      .catch(() => {
        notification.error({
          message: 'Taskit',
          description: `Task #${record.id} could not be assigned to you, please try again!`,
          duration: 2
        });
      })
  }

  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <div>{'#' + text}</div>,
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: 'Requester',
        dataIndex: 'requesterUsername',
        key: 'requesterUsername'
      },
      {
        title: 'Target Date',
        dataIndex: 'targetDate',
        key: 'targetDate'
      },
      {
        title: 'Urgency',
        dataIndex: 'urgency',
        key: 'urgency'
      },
      {
        title: 'Assign',
        key: 'Assign',
        align: 'center',
        render: (record) => (
          <Icon
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            type="import"
            onClick={() => this.assignTask(record)} />
        ),
      }];

    return (
      <div className="TasksByDepartmentComponent">
        <div className="div-bot">
          <h1 style={{ float: 'left' }}>
            <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
            <p style={{ display: 'inline', color: '#696969' }}>Department tasks</p>
            <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
          </h1>
        </div>
        <Table
          scroll={{ y: 460 }}
          expandedRowRender={record => <p>{record.description}</p>}
          size="middle"
          pagination={{ pageSize: 10, position: 'bottom', size: 'small' }}
          className="table-tasks"
          columns={columns}
          rowKey="id"
          dataSource={this.state.tasks} />
      </div>
    );
  }
}

export default TasksByDepartmentComponent;
