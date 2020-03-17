import React, { Component } from 'react';
import DepartmentService from '../department/DepartmentService.js';
import { Form, Input, Button, DatePicker, Select, Radio, notification } from 'antd';
import AuthenticationService from '../common/AuthenticationService.js'
import 'antd/es/form/style/css'

const { Option } = Select;
const FormItem = Form.Item;

class ProfileComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: {
        value: ''
      },
      username: {
        value: ''
      },
      email: {
        value: ''
      },
      password: {
        value: 'xxxxxxxxxx'
      },
      department: {
        value: ''
      },
      birthday: {
        value: ''
      },
      departments: []
    }
  }

  componentDidMount() {
    DepartmentService.getActiveDepartments()
      .then(response => {
        this.setState({ departments: response.data });
      })

    AuthenticationService.getUserByUsernameOrEmail(AuthenticationService.getUserLoggedIn())
      .then(response => {
        console.log(response)
        this.setState({
          name: {
            value: response.data.name
          },
          username: {
            value: response.data.username
          },
          email: {
            value: response.data.email
          },
          department: {
            value: response.data.idDepartment
          },
          birthday: {
            value: response.data.birthday
          }
        })
      })
  }

  isFormValid() {
    return !(this.state.name.validateStatus === 'success' &&
      this.state.username.validateStatus === 'success' &&
      this.state.email.validateStatus === 'success' &&
      this.state.password.validateStatus === 'success' &&
      this.state.department.validateStatus === 'success' &&
      this.state.birthday.validateStatus === 'success'
    );
  }

  render() {
    return (
      <div className="ProfileComponent">
        <div className="create-task-form">
          <h1 style={{ float: 'left', marginTop: '10px' }} className="page-title">
            <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
            <p style={{ display: 'inline', color: '#696969' }}>Edit Profile</p>
            <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
          </h1>
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <FormItem
              label="Name:"
              className="form-group"
              validateStatus={this.state.name.validateStatus}
              help={this.state.name.errorMsg}>
              <Input
                size="large"
                name="name"
                disabled={true}
                autoComplete="off"
                placeholder="Full name"
                value={this.state.name.value} />
            </FormItem>
            <FormItem
              label="Username:"
              hasFeedback
              className="form-group"
              validateStatus={this.state.username.validateStatus}
              help={this.state.username.errorMsg}>
              <Input
                size="large"
                name="username"
                autoComplete="off"
                disabled={true}
                placeholder="Username"
                value={this.state.username.value} />
            </FormItem>
            <FormItem
              hasFeedback
              className="form-group"
              validateStatus={this.state.email.validateStatus}
              help={this.state.email.errorMsg}>
              <Input
                size="large"
                name="email"
                autoComplete="off"
                disabled={true}
                placeholder="Email"
                value={this.state.email.value} />
            </FormItem>
            <FormItem
              className="form-group"
              validateStatus={this.state.password.validateStatus}
              help={this.state.password.errorMsg}>
              <Input
                size="large"
                name="password"
                type="password"
                disabled={true}
                value={this.state.password.value}
                placeholder="Password" />
            </FormItem>
            <FormItem
              className="form-group"
              validateStatus={this.state.department.validateStatus}
              help={this.state.department.errorMsg}>
              <Select
                showSearch
                placeholder="Department"
                name="department"
                value={this.state.department.value}
                disabled={true}
                onChange={(event) => this.handleChangeCombo(event)}>
                {this.state.departments.map((department) => (
                  <Option key={department.id} name={department.id} value={department.id}>{department.name}</Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              hasFeedback
              className="form-group"
              validateStatus={this.state.birthday.validateStatus}
              help={this.state.birthday.errorMsg}>
              <Input
                size="large"
                name="birthday"
                autoComplete="off"
                placeholder="Birthday"
                disabled={true}
                value={this.state.birthday.value} />
            </FormItem>
            <FormItem>
              <Button
                htmlType="submit"
                className="button-su btn-block"
                size="large"
                disabled={this.isFormValid()}>
                Edit profile</Button>
            </FormItem>
          </Form>
        </div >
      </div >
    );
  }
}

export default ProfileComponent;
