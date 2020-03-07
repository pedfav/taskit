import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class UrgencyService {
  getUrgencyLevels() {
    return axios.get(`${API_BASE_URL}/urgency`)
  }
}

export default new UrgencyService()