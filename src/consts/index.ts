import { format } from 'date-fns'
import { Timer, Todo } from '../types'

export const defaultTodo: Todo = {
  content: '',
  id: new Date().getTime(),
  completed: 0,
  userId: 'LOCAL',
  private: 0,
  createdTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
}

export const TimerTypes = {
  COUNT_UP: 1,
  COUNT_DOWN: 2,
} as const

export const defaultCountUpTimer: Timer = {
  name: '오늘 무조건 다 끝내본다!!',
  type: TimerTypes['COUNT_UP'],

  // 클라이언트에서만 사용하거나 서버에 동기화할 때 비뀔 수 있는 필드들
  isRunning: false,
  id: 0,
  makerId: 'LOCAL',
}

export const BooleanNumberTypes = {
  FALSE: 0,
  TRUE: 1,
} as const
