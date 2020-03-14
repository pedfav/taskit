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

  updateDepartment(department, id) {
    return axios.put(`${API_BASE_URL}/departments/${id}`, department)
  }

  deleteDepartment(id) {
    return axios.delete(`${API_BASE_URL}/departments/${id}`)
  }
}

export default new DepartmentService()