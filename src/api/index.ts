import axios from 'axios'

const api = axios.create({
  baseURL: 'http://time2do.works:8888',
})

export default api
