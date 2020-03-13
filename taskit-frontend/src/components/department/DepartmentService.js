import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class DepartmentService {
  getAllDepartments() {
    return axios.get(`${API_BASE_URL}/departments`)
  }
  
  getActiveDepartments() {
    return axios.get(`${API_BASE_URL}/active-departments`)
  }

  createDepartment(department) {
    return axios.post(`${API_BASE_URL}/departments`, department)
  }
}

export default new DepartmentService()