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

export type CountDownTimer = {
  name: string
  maker_id: string
  type: (typeof TimerTypes)[keyof typeof TimerTypes]
  tags: string
  start_time: Date
  end_time: Date

  // 서버에서 받아오는 값
  id?: string
  link_url?: string
}

export type User = {
  userId: string
  userName: string
  password: string
}
