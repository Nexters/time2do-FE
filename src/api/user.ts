import api from '.'
import { RegisterUser } from '../types'

export const postUser = async (userInfo: RegisterUser) => {
  try {
    const response = await api.post(`/users`, userInfo)
    return response.status
  } catch (e) {
    const status = e.response.status
    return status
  }
}
