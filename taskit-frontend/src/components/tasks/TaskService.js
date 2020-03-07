import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class TaskService {
  createTask(task) {
    return axios.post(`${API_BASE_URL}/task`, task)
  }
}

export default new TaskService()