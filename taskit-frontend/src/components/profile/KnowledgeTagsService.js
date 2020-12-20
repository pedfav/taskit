import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class KnowledgeTagsService {

  getAutocompletetags(name) {
    return axios.get(`${API_BASE_URL}/knowledge-tags/auto-complete/${name}`)
  }
}

export default new KnowledgeTagsService()