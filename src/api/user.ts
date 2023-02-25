import api from '.'
import { RegisterUser } from '../types'

export const postUser = async (userInfo: RegisterUser) => {
  try {
    const response = await api.post(`/users`, userInfo)
    return response
  } catch (e: any) {
    const status = e.response.status
    return status
  }
}