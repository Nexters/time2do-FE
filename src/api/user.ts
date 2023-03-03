import api from '.'
import { RegisterUser } from '../types'

export const postUser = async (userInfo: RegisterUser) => {
  try {
    const response = await api.post(`/users`, userInfo)
    return response
  } catch (e: any) {
    const response = e.response
    return response
  }
}

export const login = async (userInfo: RegisterUser) => {
  try {
    const response = await api.post(`/login`, userInfo)
    return response
  } catch (e: any) {
    const response = e.response
    return response
  }
}

export const putUser = async ({ userId, data }: { userId: number; data: any }) => {
  try {
    const response = await api.put(`/users/${userId}`, data)
    return response
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getUserById = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`)
    return response
  } catch (e) {
    console.log(e)
    return null
  }
}
