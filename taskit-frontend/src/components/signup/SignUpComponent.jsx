import React, { Component } from 'react';
import { Layout, Form, Input, DatePicker, Button, Select, notification } from 'antd';
import { Link } from 'react-router-dom';
import DepartmentService from '../department/DepartmentService.js';
import AuthenticationService from '../common/AuthenticationService.js';
import './signup.css';
import 'antd/es/date-picker/style/css'
import 'antd/es/form/style/css'
import 'antd/es/select/style/css'
import 'antd/es/notification/style/css'

const { Option } = Select;
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;

class SignUpComponent extends Component {

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
        value: ''
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
    DepartmentService.getAllDepartments()
      .then(response => {
        this.setState({ departments: response.data });
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const signupRequest = {
      name: this.state.name.value,
      email: this.state.email.value,
      username: this.state.username.value,
      password: this.state.password.value,
      birthday: this.state.birthday.value,
      idDepartment: this.state.department.value
    };

    AuthenticationService.signup(signupRequest)
      .then(response => {
        notification.success({
          message: 'Taskit',
          description: "You're successfully registered. Please Login to continue!",
          duration: 2
        });
        this.props.history.push('/login')
      }).catch(error => {
        notification.error({
          message: 'Taskit',
          description: 'Sorry! Something went wrong. Please try again!',
          duration: 2
        });
      });
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

  handleChangeDate = (date, dateString) => {
    this.setState({
      birthday: {
        value: dateString,
        validateStatus: 'success'
      }
    })
  }

  validateName = (name) => {
    if (name.length < 4) {
      return {
        validateStatus: 'error',
        errorMsg: `Name too short, minimum 4 characters!`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  }

  validateUsername = (username) => {
    if (username.length < 3) {
      return {
        validateStatus: 'error',
        errorMsg: `Username is too short (Minimum 3 characters needed.)`
      }
    } else if (username.length > 15) {
      return {
        validationStatus: 'error',
        errorMsg: `Username is too long (Maximum 15 characters allowed.)`
      }
    } else {
      return {
        validateStatus: null,
        errorMsg: null
      }
    }
  }

  isUsernameAvailable = () => {
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if (usernameValidation.validateStatus === 'error') {
      this.setState({
        username: {
          value: usernameValue,
          ...usernameValidation
        }
      });
      return;
    }

    this.setState({
      username: {
        value: usernameValue,
        validateStatus: 'validating',
        errorMsg: null
      }
    });

    AuthenticationService
      .isUsernameAvailable(usernameValue)
      .then(response => {
        if (response.data.availability) {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: 'success',
              errorMsg: null
            }
          });
        } else {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: 'error',
              errorMsg: 'This username is already taken'
            }
          });
        }
      }).catch(error => {
        this.setState({
          username: {
            value: usernameValue,
            validateStatus: 'success',
            errorMsg: null
          }
        });
      });
  }

  validateEmail = (email) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regexEmail.test(email)) {
      return {
        validateStatus: null,
        errorMsg: null
      }
    } else {
      return {
        validateStatus: 'error',
        errorMsg: 'Email not valid'
      }
    }
  }

  isEmailAvailable = () => {
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if (emailValidation.validateStatus === 'error') {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation
        }
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: 'validating',
        errorMsg: null
      }
    });

    AuthenticationService
      .isEmailAvailable(emailValue)
      .then(response => {
        if (response.data.availability) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: 'success',
              errorMsg: null
            }
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: 'error',
              errorMsg: 'This email is already taken'
            }
          });
        }
      }).catch(error => {
        this.setState({
          email: {
            value: emailValue,
            validateStatus: 'success',
            errorMsg: null
          }
        });
      });
  }

  validatePassword = (password) => {
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
      <div className="SignUpComponent">
        <Header className="header-signup">
          <div className="text">Taskit</div>
        </Header>
        <Content>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <h1 style={{color: '#696969' }}>Sign Up</h1>
              <Form onSubmit={this.handleSubmit} className="signup-form">
                <FormItem
                  className="form-group"
                  validateStatus={this.state.name.validateStatus}
                  help={this.state.name.errorMsg}>
                  <Input
                    size="large"
                    name="name"
                    autoComplete="off"
                    placeholder="Full name"
                    value={this.state.name.value}
                    onChange={(event) => this.handleChange(event, this.validateName)} />
                </FormItem>
                <FormItem
                  hasFeedback
                  className="form-group"
                  validateStatus={this.state.username.validateStatus}
                  help={this.state.username.errorMsg}>
                  <Input
                    size="large"
                    name="username"
                    autoComplete="off"
                    placeholder="Username"
                    value={this.state.username.value}
                    onChange={(event) => this.handleChange(event, this.validateUsername)}
                    onBlur={this.isUsernameAvailable} />
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
                    placeholder="Email"
                    value={this.state.email.value}
                    onChange={(event) => this.handleChange(event, this.validateEmail)}
                    onBlur={this.isEmailAvailable} />
                </FormItem>
                <FormItem
                  className="form-group"
                  validateStatus={this.state.password.validateStatus}
                  help={this.state.password.errorMsg}>
                  <Input
                    size="large"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Password"
                    value={this.state.password.value}
                    onChange={(event) => this.handleChange(event, this.validatePassword)} />
                </FormItem>
                <FormItem
                  className="form-group"
                  validateStatus={this.state.department.validateStatus}
                  help={this.state.department.errorMsg}>
                  <Select
                    showSearch
                    placeholder="Department"
                    name="department"
                    onChange={(event) => this.handleChangeCombo(event)}>
                    {this.state.departments.map((department) => (
                      <Option key={department.id} name={department.id} value={department.id}>{department.name}</Option>
                    ))}
                  </Select>
                </FormItem>
                <FormItem
                  className="form-group"
                  validateStatus={this.state.birthday.validateStatus}
                  help={this.state.birthday.errorMsg}>
                  <DatePicker
                    className="dtpk"
                    name="birthday"
                    placeholder="Birthday"
                    onChange={this.handleChangeDate} />
                </FormItem>
                <FormItem>
                  <Button
                    htmlType="submit"
                    className="button-su btn-block"
                    size="large"
                    disabled={this.isFormValid()}>
                    Sign up</Button>
                </FormItem>
              </Form>
              <p >
                Already registed? <Link className="login-link" to="/login">Sign in!</Link>
              </p>
            </div>
          </div>
        </Content>
        <Footer className="footer footer-signup"></Footer>
      </div>
    );
  }
}

export default SignUpComponent;
