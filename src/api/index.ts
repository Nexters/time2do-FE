import axios from 'axios'

const api = axios.create({
  baseURL: 'http://time2do.netlify.com:8888',
})

export default api
