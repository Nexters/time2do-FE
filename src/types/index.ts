import { TimerTypes, BooleanNumberTypes } from '../consts'

export type BooleanNumber = (typeof BooleanNumberTypes)[keyof typeof BooleanNumberTypes]

export type DateTime = Date | string // 'yyyy-MM-dd HH:mm:ss'

export type Todo = {
  id: number
  userId: number
  content: string
  completed: boolean
  createdTime: DateTime
  completedTime?: DateTime
}

export type TimeRecord = {
  id: number
  userId: number
  timerId: number
  startTime: DateTime
  endTime?: DateTime
  timerName?: string
}

export type Timer = {
  name: string
  makerId: number
  type: (typeof TimerTypes)[keyof typeof TimerTypes]
  tag?: string
  startTime?: DateTime
  endTime?: DateTime

  // 서버에서 받아오는 값
  id: number
  linkUrl?: string

  // 클라이언트에서만 사용하는 값
  isRunning?: boolean
  timeRecords?: TimeRecord[]
}

// 서버에서 계산해서 내려준 값을 포함한 타이머 타입
export type GroupTimer = Omit<Timer, 'startTime' | 'endTime'> & {
  participantsCount: number
  displayTime: string
  duration: number
  startTime: DateTime
  endTime: DateTime
}

export type User = {
  id: number
  idToken: string
  userName: string
  onboarding: boolean
}

export type RegisterUser = {
  userName: string
  password: string
}
