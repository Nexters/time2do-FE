import { format } from 'date-fns'
import api from '.'

interface ToDo {
  id: number
  userId: number
  content: string
  completed: boolean
  createdTime: string
  completedTime: string
  modifiedTime: string
  deletedTime: string
}

interface GroupTimer {
  name: string
  displayTime: string
  duration: number
  participantsCount: number
  tag: string
}

export interface TimeBlock {
  hour: number
  minute: number
  toDos: ToDo[]
  inGroupTimer: boolean
}

interface ReportDataResponse {
  userName: string
  timeBlocks: Record<string, TimeBlock>
  groupTimers: GroupTimer[]
  totalDuration: string
}

export type ReportData = ReportDataResponse

export const getReportData = async ({ userId, date }: { userId: number; date: Date }) => {
  const yearMonth = format(date, 'yyyy-MM')
  const response = await api.get<ReportDataResponse>(`/users/${userId}/reports?yearMonth=${yearMonth}`)

  return response.data
}
