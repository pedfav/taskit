import axios from 'axios'
import { API_BASE_URL } from '../../constants';

class TagsService {

  getAllTags() {
    return axios.get(`${API_BASE_URL}/knowledge-tags`)
  }

  createNewtag(tag) {
    return axios.post(`${API_BASE_URL}/knowledge-tags`, tag)  
  }

  deleteTag(id) {
    return axios.delete(`${API_BASE_URL}/knowledge-tags/${id}`)
  }
}

export default new TagsService()