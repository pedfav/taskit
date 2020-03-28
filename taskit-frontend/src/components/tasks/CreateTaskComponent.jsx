import React, { Component } from 'react';
import AuthenticationService from '../common/AuthenticationService.js';
import DepartmentService from '../department/DepartmentService.js';
import TaskService from './TaskService.js'
import { Form, Input, Button, DatePicker, Select, Radio, notification } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

import 'antd/es/form/style/css'
import 'antd/es/select/style/css'
import './tasks.css';

const { Option } = Select;
const FormItem = Form.Item;


class CreateTaskComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: {
        value: ''
      },
      description: {
        value: ''
      },
      targetDate: {
        value: ''
      },
      department: {
        value: []
      },
      urgency: {
        value: 'LOW'
      },
      departments: []
    }
  }

  disablePastDates = (current) => {
    return current && current < moment().endOf('day');
  }

  componentDidMount() {
    DepartmentService.getActiveDepartments()
      .then(response => {
        this.setState({ departments: response.data });
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const task = {
      title: this.state.title.value,
      description: this.state.description.value,
      targetDate: this.state.targetDate.value,
      departmentId: this.state.department.value,
      requesterUsername: AuthenticationService.getUserLoggedIn(),
      urgency: this.state.urgency.value
    };

    TaskService.createTask(task)
      .then(response => {
        notification.success({
          message: 'Taskit',
          description: "Task #" + response.data.id + " created",
          duration: 2
        });
        this.resetState()
      }).catch(() => {
        notification.error({
          message: 'Taskit',
          description: 'Sorry! Something went wrong. Please try again later!',
          duration: 2
        });
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
        targetDate: {
          value: ''
        },
        department: {
          value: []
        },
        urgency: {
          value: 'LOW'
        }
      })
  }

  handleChange = (event, validationFun) => {
    this.setState({
      [event.target.name]: {
        value: event.target.value,
        ...validationFun(event.target.value)
      }
    });
  }

  handleChangeCombo = (event) => {
    this.setState({
      department: {
        value: event,
        validateStatus: 'success'
      }
    })
  }

  validateTitle = (title) => {
    if (title.length < 50) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: 'error',
        errorMsg: `Title to long, max 50 characters`
      }
    }
  }

  validateDescription = (description) => {
    if (description.length < 400) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: 'error',
        errorMsg: `Description to long, max 400 characters`
      }
    }
  }

  handleChangeDate = (date, dateString) => {
    this.setState({
      targetDate: {
        value: dateString,
        validateStatus: 'success'
      }
    })
  }

  handleUrgencyChange = (urgency) => {
    this.setState({
      urgency: {
        value: urgency.target.value
      }
    })
  }

  isFormValid() {
    return !(this.state.title.validateStatus === 'success' &&
      this.state.description.validateStatus === 'success' &&
      this.state.department.validateStatus === 'success' &&
      this.state.targetDate.validateStatus === 'success'
    );
  }

  render() {
    return (
      <div className="CreateTaskComponent">
        <div className="create-task-form">
          <h1 style={{ float: 'left', marginTop: '10px' }} className="page-title">
            <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
            <p style={{ display: 'inline', color: '#696969' }}>Create Task</p>
            <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
          </h1>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: '80px' }}>
            <FormItem
              validateStatus={this.state.title.validateStatus}
              help={this.state.title.errorMsg}>
              <Input
                size="large"
                name="title"
                autoComplete="off"
                placeholder="Title"
                value={this.state.title.value}
                onChange={(event) => this.handleChange(event, this.validateTitle)} />
            </FormItem>
            <FormItem
              validateStatus={this.state.description.validateStatus}
              help={this.state.description.errorMsg}>
              <TextArea
                style={{ height: '150px' }}
                size="large"
                name="description"
                autoComplete="off"
                placeholder="Description"
                value={this.state.description.value}
                onChange={(event) => this.handleChange(event, this.validateDescription)} />
            </FormItem>
            <FormItem
              className="form-group"
              validateStatus={this.state.targetDate.validateStatus}
              help={this.state.targetDate.errorMsg}>
              <DatePicker
                className="dtpk"
                disabledDate={this.disablePastDates}
                value={this.state.targetDate.value === "" ? null : moment(this.state.targetDate.value)}
                name="targetDate"
                placeholder="Target Date"
                onChange={this.handleChangeDate} />
            </FormItem>
            <FormItem
              className="form-group"
              validateStatus={this.state.department.validateStatus}
              help={this.state.department.errorMsg}>
              <Select
                placeholder="Department"
                name="department"
                value={this.state.department.value}
                onChange={(event) => this.handleChangeCombo(event)}>
                {this.state.departments.map((department) => (
                  <Option key={department.id} name={department.id} value={department.id}>{department.name}</Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              className="form-group"
              validateStatus={this.state.urgency.validateStatus}
              help={this.state.urgency.errorMsg}>
              <div className="radio">
                <h6 style={{ color: '#696969', paddingTop: '7px' }}>Urgency: </h6>
                <Radio.Group
                  style={{ paddingLeft: '15px' }}
                  defaultValue="LOW"
                  onChange={this.handleUrgencyChange}
                  name="urgency"
                  value={this.state.urgency.value}>
                  <Radio.Button value="LOW">Low</Radio.Button>
                  <Radio.Button value="MEDIUM">Medium</Radio.Button>
                  <Radio.Button value="HIGH">High</Radio.Button>
                  <Radio.Button value="CRITICAL">Critical</Radio.Button>
                </Radio.Group>
              </div>
            </FormItem>
            <FormItem>
              <Button
                disabled={this.isFormValid()}
                htmlType="submit"
                className="button-su btn-block"
                size="large">
                Create task</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateTaskComponent;
