import { format } from 'date-fns'
import api from '.'
import { GroupTimer, TimeRecord, Todo } from '../types'

export interface TimeBlock {
  hour: number
  minute: number
  toDos: Todo[]
  groupTimers: GroupTimer[]
  inGroupTimer: boolean
}

interface ReportDataResponse {
  userName: string
  timeBlocks: Record<string, TimeBlock>
  totalDuration: string
}

export type ReportData = ReportDataResponse

export const getReportData = async ({ userId, date }: { userId: number; date: Date }) => {
  const yearMonth = format(date, 'yyyy-MM')
  const response = await api.get<ReportDataResponse>(`/users/${userId}/reports?yearMonth=${yearMonth}`)

  return response.data
}

export const putUserNickname = async ({ userId, nickname }: { userId: number; nickname: string }) => {
  const response = await api.put(`/users/${userId}`, { userName: nickname })

  return response.data
}

export const syncTodos = async ({ userId, todos }: { userId: number; todos: Todo[] }) => {
  const response = await api.post(`/users/${userId}/tasks`, todos)

  return response.data
}

export const syncTimeRecords = async ({ userId, timeRecords }: { userId: number; timeRecords: TimeRecord[] }) => {
  const response = await api.post(`/users/${userId}/timeRecords`, timeRecords)

  return response.data
}

export const syncTodosAndTimeRecords = async ({
  userId,
  timeRecords,
  todos,
}: {
  userId: number
  timeRecords: TimeRecord[]
  todos: Todo[]
}) => {
  const timeRecordsResponse = await api.post(`/users/${userId}/timeRecords`, timeRecords)
  const todosResponse = await api.post(`/users/${userId}/tasks`, todos)

  return {
    timeRecords: timeRecordsResponse.data,
    todos: todosResponse.data,
  }
}
