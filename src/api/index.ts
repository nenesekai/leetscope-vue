import { ElMessage } from "element-plus";
import axios from "axios";

const API_URL = 'http://localhost:8080'
const api = {
  getHello: () => { return 'hello' },
  login: (data: object): Promise<any> => {
    return axios.post(API_URL + '/user/login', data)
  },
  register: (data: object ): Promise<any> => {
    return axios.post(API_URL + '/user/register', data)
  },
  listAllAssignments: (): Promise<any> => {
    return axios.get(API_URL + '/assignment/listAll')
  },
  getAssignmentById: (id: number): Promise<any> => {
    return axios.get(API_URL + '/assignment/get', {
      params: {
        id: id
      }
    })
  }
}

export default api