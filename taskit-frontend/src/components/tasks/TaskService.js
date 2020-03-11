import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class TaskService {
  createTask(task) {
    return axios.post(`${API_BASE_URL}/task`, task)
  }

  getTasksByUserDepartment(username) {
    return axios.get(`${API_BASE_URL}/task/users-department/${username}`)
  }
  
  getTasksByUserResposnible(username) {
    return axios.get(`${API_BASE_URL}/task/user-responsible/${username}`)
  }

  assignTask(username, taskId) {
    return axios.patch(`${API_BASE_URL}/task/assign-task/${taskId}/user/${username}`)
  }
}

export default new TaskService()