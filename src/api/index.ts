import { ElMessage } from "element-plus";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { useUserStore } from "@/stores/user";

axios.interceptors.request.use(
  config => {
    const store = useUserStore()
    if (store.isLogin) {
      config.headers.Authorization = 'Bearer ' + store.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse<Result<any>>) => {
    const store = useUserStore()
    if (response.data.code == 'EXPIRED_TOKEN') {
      ElMessage.error('User token expired, please login again.')
      store.logout()
    }
    return response
  }
)

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
  },
  listSubmissionsByAssignmentId: (assignmentId: string): Promise<any> => {
    return axios.get(API_URL+ '/submission/list', {
      params: {
        assignmentId: assignmentId
      }
    })
  },
  updateAssignment: (assignment: Assignment): Promise<any> => {
    return axios.post(API_URL + '/assignment/update', assignment);
  },
  deleteAssignment: (id: string): Promise<any> => {
    return axios.delete(API_URL + '/assignment/delete', {
      params: {
        id: id
      }
    })
  },
  getUserById: (id: number): Promise<any> => {
    return axios.get(API_URL + '/user/get', {
      params: {
        id: id
      }
    })
  },
  getCurrentUser: (): Promise<any> => {
    return axios.get(API_URL + '/user/getCurrent')
  },
  createNewAssignment: (assignment: Object): Promise<any> => {
    return axios.post(API_URL + '/assignment/create', assignment)
  }
}

export default api
