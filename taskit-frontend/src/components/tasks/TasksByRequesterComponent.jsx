import React, { Component } from 'react';
import TaskService from './TaskService.js'
import AuthenticationService from '../common/AuthenticationService.js';
import moment from 'moment';
import { Table, Button, notification, Tag } from 'antd';

import 'antd/es/table/style/css';
import 'antd/es/modal/style/css';
import './tasks.css';

class TasksByRequesterComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    TaskService.getTasksByRequester(AuthenticationService.getUserLoggedIn())

      .then(response => {
        this.setState({ tasks: response.data.sort(function (a, b) { return a.done - b.done }) })
      })
  }

  finishTask = (record) => {
    TaskService.finishTask(record.id)
      .then((response) => {
        TaskService.getTasksByRequester(AuthenticationService.getUserLoggedIn())
          .then(response => {
            this.setState({ tasks: response.data.sort(function (a, b) { return a.done - b.done }) })
          })

        notification.success({
          message: 'Taskit',
          description: `Task #${record.id} finished!`,
          duration: 2
        });
      })
      .catch(() => {
        notification.error({
          message: 'Taskit',
          description: `Task #${record.id} could not be finished to you, please try again!`,
          duration: 2
        });
      })
  }

  calculateDates = (text, record) => {

    if (moment().isBefore(moment(text))) {
      if ((moment().diff(text, 'days') * - 1) <= 1 ) {
        return !record.done && <div style={{ color: "green" }}>{moment().diff(text, 'days') * - 1 + ' day left'}</div>
      } else {
        return !record.done && <div style={{ color: "green" }}>{moment().diff(text, 'days') * - 1 + ' days left'}</div>
      }
    } else {
      if ((moment().diff(text, 'days') * - 1) <= 1 ) {
        return !record.done && <div style={{ color: "red" }}>{moment().diff(text, 'days') + ' days late'}</div>
      } else {
        return !record.done && <div style={{ color: "red" }}>{moment().diff(text, 'days') + ' day late'}</div>
      }
    }
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
        title: 'Responsible',
        dataIndex: 'responsibleUsername',
        key: 'responsibleUsername'
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
        title: 'Done',
        dataIndex: 'done',
        key: 'done',
        render: (record) => (
          record ? <Tag color='green'>Done</Tag> : <Tag color='red'>Not done</Tag>
        ),
      },
      {
        title: 'Time left',
        dataIndex: 'targetDate',
        key: 'timeLeft',
        render: (text, record) => this.calculateDates(text, record)
      },
      {
        title: 'Finish',
        key: 'finish',
        align: 'center',
        render: (record) => (
          <Button
            className="button-cli"
            style={{fontWeight: '600'}}
            onClick={() => this.finishTask(record)}
            disabled={record.done}>Finish</Button>
        ),
      }];

    return (
      <div className="TasksByRequesterComponent">
        <div className="div-bot">
          <h1 style={{ float: 'left' }}>
            <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
            <p style={{ display: 'inline', color: '#696969' }}>Your tasks</p>
            <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
          </h1>
        </div>
        <Table
          scroll={{ y: 460 }}
          expandedRowRender={record => <p>{record.description}</p>}
          size="small"
          pagination={{ pageSize: 10, position: 'bottom', size: 'small' }}
          className="table-tasks"
          columns={columns}
          rowKey="id"
          dataSource={this.state.tasks} />
      </div>
    );
  }
}

export default TasksByRequesterComponent;
