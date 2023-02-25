import api from '.'
import { User } from '../types'

export const postNewGroup = async (timerInfo: FormData) => {
  try {
    const response = await api.post(`/timers`, timerInfo)
    console.log(response)
    return response.data
  } catch (e) {
    console.log(e)
    return null
  }
}

export const participate = async ({
  user,
  invitationCode,
}: {
  user: User | null
  invitationCode: string | undefined
}) => {
  try {
    if (!user || !invitationCode) return null
    const response = await api.post(`/timers/${invitationCode}/users/${user.id}`)
    return response.data
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getParticipants = async ({
  user,
  invitationCode,
}: {
  user: User | null
  invitationCode: string | undefined
}) => {
  try {
    if (!user || !invitationCode) return null
    const response = await api.get(`/timers/${invitationCode}/users`)
    return response.data
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getCheerUps = async ({
  user,
  invitationCode,
}: {
  user: User | null
  invitationCode: string | undefined
}) => {
  try {
    if (!user || !invitationCode) return null
    const response = await api.get(`/timers/${invitationCode}/supporting`)
    return response.data
  } catch (e) {
    console.log(e)
    return null
  }
}

export const addCheerUp = async ({
  user,
  invitationCode,
}: {
  user: User | null
  invitationCode: string | undefined
}) => {
  try {
    const response = await api.post(`/timers/${invitationCode}/users/${user?.id}/supporting`)

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}
