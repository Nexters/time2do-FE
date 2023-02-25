import { format } from 'date-fns'
import api from '.'
import { GroupTimer, Todo } from '../types'

export interface TimeBlock {
  hour: number
  minute: number
<<<<<<< HEAD
  toDos: ToDo[]
=======
  toDos: Todo[]
>>>>>>> main
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
