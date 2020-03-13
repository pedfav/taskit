import React, { Component } from 'react';
import { Table, Tag, Icon } from 'antd';
import DepartmentService from './DepartmentService.js'

class ListDepartmentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      departments: []
    }
  }

  componentDidMount() {
    DepartmentService.getAllDepartments()
      .then(response => {
        this.setState({ tasks: response.data })
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
        dataIndex: 'name',
        key: 'title'
      },
      {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render: (record) => (
          record ? <Tag color='green'>Active</Tag> : <Tag color='red'>Inactive</Tag>
        )
      },
      {
        title: 'Edit',
        key: 'Assign',
        align: 'center',
        render: (record) => (
          <Icon
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            type="edit" />
        )
      }
    ];
    return (
      <div className="ListDepartmentComponent">
        <div className="div-bot">
          <h1 style={{ float: 'left' }}>
            <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
            <p style={{ display: 'inline', color: '#696969' }}>Departments</p>
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

export default ListDepartmentComponent;
