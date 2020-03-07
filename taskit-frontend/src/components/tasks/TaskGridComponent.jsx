import React, { Component } from 'react';

import { Table } from 'antd';
import 'antd/es/table/style/css';
import './tasks.css';


class TaskGridComponent extends Component {

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }];

    const data = [];
    return (
      <div className="TaskGridComponent">
        <div className="div-bot">
        <h1 style={{ float: 'left' }} className="page-title">
            <p style={{display: 'inline', color: '#7422E6'}}>[ </p>
            <p style={{display: 'inline', color: '#696969'}}>{this.props.name}</p>
            <p style={{display: 'inline', color: '#7422E6'}}> ]</p>
          </h1>
        </div>
        <Table
          pagination={{ pageSize: 8, position: 'bottom', size: 'small' }}
          className="table-tasks"
          columns={columns}
          dataSource={data} />
      </div>
    );
  }
}

export default TaskGridComponent;
