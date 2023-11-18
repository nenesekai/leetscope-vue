import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import axios from "axios";

const API_URL = 'http://localhost:8080'
const api = {
  getHello: () => { return 'hello' },
  register: (data): Promise => {
    return axios.post(API_URL + '/user/register', data)
  }
}

export default api