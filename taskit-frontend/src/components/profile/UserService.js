import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class UserService {

  updateUserDepartment(user) {
    return axios.put(`${API_BASE_URL}/users/${user.id}`, user)
  }
  
  changeUserPassword(payload) {
    return axios.patch(`${API_BASE_URL}/users/change-password`, payload)
  }
}

export default new UserService()