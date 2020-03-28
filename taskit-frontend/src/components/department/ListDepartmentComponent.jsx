import React, { Component } from 'react';
import { Table, Tag, Icon, Modal, Form, Input, Radio, notification } from 'antd';
import DepartmentService from './DepartmentService.js'
import TextArea from 'antd/lib/input/TextArea';


const FormItem = Form.Item;

class ListDepartmentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      departments: [],
      department: '',
      visible: false,
      title: {
        value: ''
      },
      description: {
        value: ''
      },
      active: {
        value: ''
      }
    }
  }

  componentDidMount() {
    DepartmentService.getAllDepartments()
      .then(response => {
        this.setState({ departments: response.data.sort(function (a, b) { return b.active - a.active }) })
      })
  }

  showModal = (record) => {
    this.setState({
      department: record,
      title: {
        value: record.name
      },
      description: {
        value: record.description
      },
      active: {
        value: record.active.toString()
      },
      visible: true
    });
  };

  handleOk = e => {
    let titleValidated = this.validateTitle(this.state.title.value)
    let descValidated = this.validateDescription(this.state.description.value)

    if ((this.state.active.value !== '')
      && (titleValidated.validateStatus === 'success')
      && (descValidated.validateStatus === 'success')) {

      const department = {
        name: this.state.title.value,
        description: this.state.description.value,
        active: this.state.active.value
      };

      DepartmentService.updateDepartment(department, this.state.department.id)
        .then(() => {
          this.updateDepartments();
          this.setState({
            visible: false,
          });
          this.resetState();
        }).catch(() => {
          notification.error({
            message: 'Taskit',
            description: 'Sorry! Something went wrong. Please try again later!',
            duration: 2
          });
        })
    }
  };

  updateDepartments = () => {
    DepartmentService.getAllDepartments()
      .then(response => {
        this.setState({ departments: response.data.sort(function (a, b) { return b.active - a.active }) })
      })
  }

  resetState = () => {
    this.setState(
      {
        title: {
          value: ''
        },
        description: {
          value: ''
        },
        active: {
          value: ''
        },
        department: ''
      })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleChange = (event, validationFun) => {
    this.setState({
      [event.target.name]: {
        value: event.target.value,
        ...validationFun(event.target.value)
      }
    });
  }

  validateTitle = (title) => {
    if (title.length <= 0) {
      return {
        validateStatus: 'error',
        errorMsg: `Title to short, min 1 character`
      }
    } else if (title.length > 30) {
      return {
        validateStatus: 'error',
        errorMsg: `Title to long, max 30 characters`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateDescription = (description) => {
    if (description.length <= 0) {
      return {
        validateStatus: 'error',
        errorMsg: `Description to short, min 1 character`
      }
    } else if (description.length > 100) {
      return {
        validateStatus: 'error',
        errorMsg: `Description to long, max 100 characters`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
      };
    }
  }

  handleRadioChange = (active) => {
    this.setState({
      active: {
        value: active.target.value
      }
    })
  }

  isFormValid() {
    return (this.state.title.validateStatus === 'success' &&
      this.state.description.validateStatus === 'success');
  }

  deleteDepartment = (record) => {
    DepartmentService.deleteDepartment(record.id)
        .then(() => {
          this.updateDepartments();
        }).catch(() => {
          notification.error({
            message: 'Taskit',
            description: 'Sorry! Something went wrong. Please try again later!',
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
        key: 'Edit',
        align: 'center',
        render: (record) => (
          <Icon
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            type="edit"
            onClick={() => this.showModal(record)} />
        )
      },
      {
        title: 'Delete',
        key: 'Delete',
        align: 'center',
        render: (record) => (
          <Icon
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            type="delete"
            onClick={() => this.deleteDepartment(record)} />
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
          dataSource={this.state.departments} />
        <Modal
          title={
            <h3>
              <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
              <p style={{ display: 'inline', color: '#696969' }}>Edit department</p>
              <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
            </h3>
          }
          centered={true}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem
              validateStatus={this.state.title.validateStatus}
              help={this.state.title.errorMsg}>
              <Input
                size="large"
                name="title"
                autoComplete="off"
                placeholder="Department title"
                value={this.state.title.value}
                onChange={(event) => this.handleChange(event, this.validateTitle)} />
            </FormItem>
            <FormItem
              validateStatus={this.state.description.validateStatus}
              help={this.state.description.errorMsg}>
              <TextArea
                style={{ height: '80px' }}
                size="large"
                name="description"
                autoComplete="off"
                placeholder="Description"
                value={this.state.description.value}
                onChange={(event) => this.handleChange(event, this.validateDescription)} />
            </FormItem>
            <FormItem
              className="form-group"
              validateStatus={this.state.active.validateStatus}
              help={this.state.active.errorMsg}>
              <div className="radio">
                <h6 style={{ color: '#696969', paddingTop: '7px' }}>Urgency: </h6>
                <Radio.Group
                  style={{ paddingLeft: '15px' }}
                  defaultValue="LOW"
                  onChange={this.handleRadioChange}
                  name="urgency"
                  value={this.state.active.value}>
                  <Radio.Button value="true">Active</Radio.Button>
                  <Radio.Button value="false">Inactive</Radio.Button>
                </Radio.Group>
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ListDepartmentComponent;
