import { format } from 'date-fns'
import { Todo } from '../types'

export const defaultTodo: Todo = {
  content: '',
  id: new Date().getTime(),
  completed: 0,
  user_id: 'LOCAL',
  private: 0,
  created_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
}

export const defaultTimer = {}

export const TimerTypes = {
  COUNT_UP: 1,
  COUNT_DOWN: 2,
} as const

export const BooleanNumberTypes = {
  FALSE: 0,
  TRUE: 1,
} as const
