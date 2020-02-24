import axios from 'axios'
import { API_BASE_URL } from '../constants';

export const USERNAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {
  executeAuthenticationService(username, password) {
    return axios.post(`${API_BASE_URL}/authenticate`, {
        username,
        password
    })
  }
  
  createJWTToken(token) {
    return 'Bearer ' + token
  }

  registerSuccesfulLogin(username, token) {
    sessionStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username)
    this.setupAxiosInterceptors(this.createJWTToken(token))
  }

  logout() {
    sessionStorage.removeItem(USERNAME_SESSION_ATTRIBUTE_NAME)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME)
    if(user===null) return false;
    return true;
  }

  getUserLoggedIn() {
    let user = sessionStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME)
    if(user===null) return '';
    return user;
  }

  setupAxiosInterceptors(token) {
    axios.interceptors.request.use(
        (config) => {
            if (this.isUserLoggedIn()) {
                config.headers.authorization = token
            }
            return config
        }
    )
  }
}

export default new AuthenticationService()