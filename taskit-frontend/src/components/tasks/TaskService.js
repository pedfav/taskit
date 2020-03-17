import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class TaskService {
  createTask(task) {
    return axios.post(`${API_BASE_URL}/task`, task)
  }

  getTasksByUserDepartment(username) {
    return axios.get(`${API_BASE_URL}/task/user-department/${username}`)
  }
  
  getTasksByRequester(username) {
    return axios.get(`${API_BASE_URL}/task/user-requester/${username}`)
  }
  
  getTasksByUserResponsible(username) {
    return axios.get(`${API_BASE_URL}/task/user-responsible/${username}`)
  }

  assignTask(username, taskId) {
    return axios.patch(`${API_BASE_URL}/task/assign-task/${taskId}/user/${username}`)
  }
  
  finishTask(taskId) {
    return axios.patch(`${API_BASE_URL}/task/finish-task/${taskId}`)
  }
}

export default new TaskService()