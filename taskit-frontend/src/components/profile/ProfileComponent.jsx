import React, { Component } from 'react';
import DepartmentService from '../department/DepartmentService.js';
import { Icon, Tooltip, Modal, Select, Input, Form as FormAntd, notification, AutoComplete } from 'antd';
import AuthenticationService from '../common/AuthenticationService.js'
import UserService from './UserService.js'
import KnowledgeTagsService from './KnowledgeTagsService.js'
import './profile.css';
import 'antd/es/form/style/css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const FormItem = FormAntd.Item;
const { Option } = Select;

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

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
      oldPassword: {
        value: ''
      },
      newPassword: {
        value: ''
      },
      confirmPassword: {
        value: ''
      },
      department: {
        value: ''
      },
      departmentName: '',
      birthday: {
        value: ''
      },
      visibleDepartment: false,
      visiblePassword: false,
      departments: [],
      options: [{ value: 'Burns Bay Road' },
      { value: 'Downing Street' },
      { value: 'Wall Street' }]
    }
  }

  componentWillMount() {
    AuthenticationService.getUserByUsernameOrEmail(AuthenticationService.getUserLoggedIn())
      .then(response => {
        this.setState({
          id: {
            value: response.data.id
          },
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
      }).then(() => {
        DepartmentService.getActiveDepartments()
          .then(response => {
            this.setState({
              departments: response.data,
              departmentName: response.data.find(dep => dep.id === this.state.department.value).name
            });
          })
      })
  }

  showModalDepartment = () => {
    this.setState({
      visibleDepartment: true,
    });
  };

  showModalPassword = () => {
    this.setState({
      visiblePassword: true,
    });
  };

  handleOk = e => {
    this.setState({
      visibleDepartment: false,
    });

    const user = {
      id: this.state.id.value,
      idDepartment: this.state.department.value
    }

    UserService.updateUserDepartment(user)
      .then(response => {
        notification.success({
          message: 'Taskit',
          description: `Department updated to ${this.state.departmentName}`,
          duration: 2
        });
      })
  };

  handleOkPassword = e => {
    const payload = {
      username: this.state.username.value,
      oldPassword: this.state.oldPassword.value,
      newPassword: this.state.newPassword.value
    }

    UserService.changeUserPassword(payload)
      .then(() => {
        notification.success({
          message: 'Taskit',
          description: `Password changed!`,
          duration: 2
        });
      })
      .catch(() => {
        notification.error({
          message: 'Taskit',
          description: `Cannot change password!`,
          duration: 2
        });
      })

    this.setState({
      visiblePassword: false,
      oldPassword: {
        value: ''
      },
      newPassword: {
        value: ''
      },
      confirmPassword: {
        value: ''
      }
    });
  }

  handleCancel = e => {
    this.setState({
      visibleDepartment: false,
    });
  };

  handleCancelPassword = e => {
    this.setState({
      visiblePassword: false,
      oldPassword: {
        value: ''
      },
      newPassword: {
        value: ''
      },
      confirmPassword: {
        value: ''
      }
    });
  };

  handleChangeCombo = (event) => {
    this.setState({
      department: {
        value: event
      },
      departmentName: this.state.departments.find(dep => dep.id === event).name
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: {
        value: event.target.value
      }
    });
  }

  validateOldPassword = (event) => {
    const password = event.target.value
    AuthenticationService
      .executeAuthenticationService(AuthenticationService.getUserLoggedIn(), password)
      .then((response) => {
        this.setState({
          oldPassword: {
            value: password,
            validateStatus: 'success'
          }
        })
      }).catch(() => {
        this.setState({
          oldPassword: {
            validateStatus: 'error',
            errorMsg: 'Password not correct'
          }
        })
      })
  }

  handleChangePassword = (event, validationFun) => {
    this.setState({
      [event.target.name]: {
        value: event.target.value,
        ...validationFun(event.target.value)
      }
    });
  }

  validateNewPassword = (password) => {
    if (password.length < 6) {
      return {
        validateStatus: 'error',
        errorMsg: 'Password is too short (Minimum 6 characters needed.)'
      }
    } else if (password.length > 20) {
      return {
        validateStatus: 'error',
        errorMsg: 'Password is too long (Maximum 20 characters allowed.)'
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateConfirmPassword = (password) => {
    if (this.state.newPassword.value === password) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: 'error',
        errorMsg: 'Password is not the same'
      }
    }
  }

  isFormValid() {
    return !(this.state.oldPassword.validateStatus === 'success' &&
      this.state.newPassword.validateStatus === 'success' &&
      this.state.confirmPassword.validateStatus === 'success'
    );
  }

  getAutoCompleteTags = (name) => {
    KnowledgeTagsService.getAutocompletetags(name)
      .then(response => {
        console.log(response.data)
      })
  }

  render() {
    return (
      <div className="ProfileComponent">
        <div className="grid-profile">
          <h1 style={{ float: 'left', marginTop: '10px' }} className="page-title">
            <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
            <p style={{ display: 'inline', color: '#696969' }}>Profile</p>
            <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
          </h1>
          <Form style={{ marginTop: '80px' }}>
            <Form.Group as={Row} controlId="1">
              <Form.Label column sm="3">
                <div className="label-fields">Name:</div>
              </Form.Label>
              <Col sm="9">
                <Form.Control className="label-fields no-border" plaintext readOnly defaultValue={this.state.name.value} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="2">
              <Form.Label column sm="3">
                <div className="label-fields">Username:</div>
              </Form.Label>
              <Col sm="9">
                <Form.Control className="label-fields no-border" plaintext readOnly defaultValue={this.state.username.value} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="3">
              <Form.Label column sm="3">
                <div className="label-fields">Email:</div>
              </Form.Label>
              <Col sm="9">
                <Form.Control className="label-fields no-border" plaintext readOnly defaultValue={this.state.email.value} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="4">
              <Form.Label column sm="3">
                <div className="label-fields">Birthday:</div>
              </Form.Label>
              <Col sm="9">
                <Form.Control className="label-fields no-border" plaintext readOnly defaultValue={this.state.birthday.value} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="5">
              <Form.Label column sm="3">
                <div className="label-fields no-border">Department:</div>
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  className="label-fields no-border"
                  plaintext
                  readOnly
                  defaultValue={this.state.departmentName} />
              </Col>
              <Col sm="1">
                <Tooltip placement="top" title="Change department">
                  <Icon
                    style={{ paddingTop: '15px' }}
                    className="icons"
                    type="edit"
                    onClick={() => this.showModalDepartment()} />
                </Tooltip>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="6">
              <Form.Label column sm="3">
                <div className="label-fields no-border">Password:</div>
              </Form.Label>
              <Col sm="5">
                <Form.Control className="label-fields" plaintext readOnly defaultValue="xxxxxxxxxxxx" />
              </Col>
              <Col sm="1">
                <Tooltip placement="top" title="Change Password">
                  <Icon
                    style={{ paddingTop: '15px' }}
                    className="icons"
                    type="edit"
                    onClick={() => this.showModalPassword()} />
                </Tooltip>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="7">
              <Form.Label column sm="3">
                <div className="label-fields no-border">Add tag:</div>
              </Form.Label>
              <Col sm="5">
                <AutoComplete
                  options={options}
                  onChange={(event) => this.getAutoCompleteTags(event)}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Col>
            </Form.Group>
          </Form>
          <Modal
            title={
              <h3>
                <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
                <p style={{ display: 'inline', color: '#696969' }}>Change Department</p>
                <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
              </h3>
            }
            centered={true}
            visible={this.state.visibleDepartment}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>
            <FormAntd>
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
            </FormAntd>
          </Modal>
          <Modal
            title={
              <h3>
                <p style={{ display: 'inline', color: '#7422E6' }}>[ </p>
                <p style={{ display: 'inline', color: '#696969' }}>Change Password</p>
                <p style={{ display: 'inline', color: '#7422E6' }}> ]</p>
              </h3>
            }
            centered={true}
            visible={this.state.visiblePassword}
            okButtonProps={{ disabled: this.isFormValid() }}
            onOk={this.handleOkPassword}
            onCancel={this.handleCancelPassword}>
            <FormAntd>
              <FormItem
                hasFeedback
                className="form-group"
                validateStatus={this.state.oldPassword.validateStatus}
                help={this.state.oldPassword.errorMsg}>
                <Input
                  size="large"
                  name="oldPassword"
                  type="password"
                  autoComplete="off"
                  placeholder="Old password"
                  value={this.state.oldPassword.value}
                  onChange={(event) => this.handleChange(event)}
                  onBlur={(event) => this.validateOldPassword(event)} />
              </FormItem>
              <FormItem
                hasFeedback
                className="form-group"
                validateStatus={this.state.newPassword.validateStatus}
                help={this.state.newPassword.errorMsg}>
                <Input
                  size="large"
                  name="newPassword"
                  type="password"
                  autoComplete="off"
                  placeholder="New password"
                  value={this.state.newPassword.value}
                  onChange={(event) => this.handleChangePassword(event, this.validateNewPassword)} />
              </FormItem>
              <FormItem
                hasFeedback
                className="form-group"
                validateStatus={this.state.confirmPassword.validateStatus}
                help={this.state.confirmPassword.errorMsg}>
                <Input
                  size="large"
                  name="confirmPassword"
                  type="password"
                  autoComplete="off"
                  placeholder="Confirm password"
                  value={this.state.confirmPassword.value}
                  onChange={(event) => this.handleChangePassword(event, this.validateConfirmPassword)} />
              </FormItem>
            </FormAntd>
          </Modal>
        </div>
      </div >
    );
  }
}

export default ProfileComponent;
