import { TimerTypes, BooleanNumberTypes } from '../consts'

export type BooleanNumber = (typeof BooleanNumberTypes)[keyof typeof BooleanNumberTypes]

export type Todo = {
  id: number
  user_id: string
  content: string
  completed: BooleanNumber
  private: BooleanNumber
  created_time: Date
  completed_time: Date
  modified_time: Date
  deleted_time: Date
}

export type TimeRecord = {
  id: number
  user_id: string
  timer_id: number
  start_time: Date
  end_time: Date
}

export type Timer = {
  name: string
  maker_id: string
  type: (typeof TimerTypes)[keyof typeof TimerTypes]
  tags?: string
  start_time?: Date
  end_time?: Date

  // 서버에서 받아오는 값
  id?: string
  link_url?: string

  // 클라이언트에서만 사용하는 값
  isRunning?: boolean
  timeRecords?: TimeRecord[]
}

export type User = {
  user_id: string
  user_name: string
  password: string
}

export type GroupTimer = {
  name: string
  maker_id: number
  tags: string
  start_time: string
  end_time: string
  type: 1 | 2
}
