import { TimerTypes, BooleanNumberTypes } from '../consts'

export type BooleanNumber = (typeof BooleanNumberTypes)[keyof typeof BooleanNumberTypes]

export type DateTime = Date | string // 'yyyy-MM-dd HH:mm:ss'
export type Timestamp = number

export type Todo = {
  id: number
  userId?: string
  userName?: string
  content: string
  completed: boolean
  createdTime: Timestamp
  completedTime?: Timestamp
  timerId?: string
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

export type UpTimer = {
  name: string
  // 맨처음 타이머를 시작했을 때의 시간
  startedAt: Timestamp
  // 마지막 reset 때 시간
  endedAt?: Timestamp
  // 유저 상호작용 pause 때마다 업데이트
  lastlyPausedAt?: Timestamp
  // 유저 상호작용 start 때마다 업데이트
  lastlyStartedAt: Timestamp
  // 유저 상호작용 pause 때마다 업데이트
  lastlyRecordedTotalSeconds: number
  isRunning: boolean
  makerId?: string
  makerName?: string
  // 서버에서 받아오는 값
  id: string
  linkUrl?: string
  // 이전 배포 버전과의 구분을 위한 값
  version?: string
  toDos?: Todo[]
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
  id?: string
  userName: string
  onboarding: boolean
}

export type RegisterUser = {
  userName: string
  password: string
}

export type LocalStorageKey = 'countUpTimer' | 'countUpTimerRecords' | 'countDownTimer' | 'user' | 'todos'

export interface TimersAggregation {
  totalSeconds: number
  hours: number
  minutes: number
  seconds: number
  toDos: Todo[]
  groupTimers?: GroupTimer[]
  hasGroupTimer?: boolean
}

export type TimersAndAggregation = {
  timers: UpTimer[]
  aggregation: TimersAggregation
}

export type TimersAndAggregationAtDates = Record<string, TimersAndAggregation>

export type UpTimerReport = {
  totalSeconds: number
  timersAndAggregationAtDates: TimersAndAggregationAtDates
}
