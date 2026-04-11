import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // sends cookies automatically
})

export default api