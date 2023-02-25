import { TimerTypes, BooleanNumberTypes } from '../consts'

export type BooleanNumber = (typeof BooleanNumberTypes)[keyof typeof BooleanNumberTypes]

export type DateTime = string // 'yyyy-MM-dd HH:mm:ss'

export type Todo = {
  id: number
  user_id: string
  content: string
  completed: BooleanNumber
  private: BooleanNumber
  created_time: DateTime
  completed_time?: DateTime
  modified_time?: DateTime
  deleted_time?: DateTime
}

export type TimeRecord = {
  id: number
  user_id: string
  timer_id: number
  start_time: DateTime
  end_time: DateTime
}

export type Timer = {
  name: string
  maker_id: string
  type: (typeof TimerTypes)[keyof typeof TimerTypes]
  tag?: string
  startTime?: DateTime
  endTime?: DateTime

  // 서버에서 받아오는 값
  id?: string
  linkUrl?: string

  // 클라이언트에서만 사용하는 값
  isRunning?: boolean
  timeRecords?: TimeRecord[]
}

export type User = {
  user_id: string
  user_name: string
  password: string
}
