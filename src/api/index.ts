import axios from 'axios'

const api = axios.create({
  baseURL: 'http://time2do.me:8888',
})

export default api
