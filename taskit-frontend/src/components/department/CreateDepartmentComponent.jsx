import React, { Component } from 'react';
import { Form, Input, Button, Radio, notification } from 'antd';
import DepartmentService from './DepartmentService.js'
import TextArea from 'antd/lib/input/TextArea';

const FormItem = Form.Item;

class CreateDepartmentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: {
        value: ''
      },
      description: {
        value: ''
      },
      active: {
        value: 'true'
      }
    }
  }


  handleSubmit = (event) => {
    event.preventDefault()

    const department = {
      name: this.state.title.value,
      description: this.state.description.value,
      active: this.state.active.value
    };

    DepartmentService.createDepartment(department)
      .then(response => {
        notification.success({
          message: 'Taskit',
          description: "Department #" + response.data.name + " created",
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
        active: {
          value: 'true'
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

  validateTitle = (title) => {
    if (title.length < 30) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: 'error',
        errorMsg: `Title to long, max 30 characters`
      }
    }
  }

  validateDescription = (description) => {
    if (description.length < 100) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: 'error',
        errorMsg: `Description to long, max 100 characters`
      }
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
    return !(this.state.title.validateStatus === 'success' &&
      this.state.description.validateStatus === 'success');
  }


  render() {
    return (
      <div className="CreateDepartmentComponent">
        <div className="create-task-form">
          <h1 style={{ float: 'left', marginTop: '10px' }} className="page-title">
            <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
            <p style={{ display: 'inline', color: '#696969' }}>Create Department</p>
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
            <FormItem>
              <Button
                disabled={this.isFormValid()}
                htmlType="submit"
                className="button-su btn-block"
                size="large">
                Create department</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateDepartmentComponent;
