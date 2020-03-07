import axios from 'axios'
import { API_BASE_URL } from '../../constants';

export const USERNAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {
  executeAuthenticationService(username, password) {
    return axios.post(`${API_BASE_URL}/authenticate`, {
      username,
      password
    })
  }

  signup(signupPayload) {
    return axios.post(`${API_BASE_URL}/signup`, signupPayload)
  }

  createJWTToken(token) {
    return 'Bearer ' + token
  }

  registerSuccesfulLogin(username) {
    sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username)
  }

  setToken(token) {
    localStorage.setItem('token', this.createJWTToken(token));
    this.setupAxiosInterceptors(this.createJWTToken(token))
  }

  getUserByUsernameOrEmail(usernameOrEmail) {
    return axios.get(`${API_BASE_URL}/users/username-or-email/` + usernameOrEmail)
      .then(response => {
        return response.data.username
      })
  }

  logout() {
    sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE_NAME)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false;
    return true;
  }

  getUserLoggedIn() {
    let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return '';
    return user;
  }

  isUsernameAvailable(username) {
    return axios.get(`${API_BASE_URL}/users/username-availability/` + username)
  }

  isEmailAvailable(email) {
    return axios.get(`${API_BASE_URL}/users/email-availability/` + email)
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use(
      (config) => {
        if (token != null) {
          config.headers.authorization = token
        }
        return config
      }
    )
  }
}

axios.interceptors.request.use(
  (config) => {
      config.headers.authorization = localStorage.getItem('token')
    return config
  }
)

export default new AuthenticationService()