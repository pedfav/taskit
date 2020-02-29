import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class DepartmentService {
  getAllDepartments() {
    return axios.get(`${API_BASE_URL}/departments`)
  }
}

export default new DepartmentService()