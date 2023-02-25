import { format } from 'date-fns'
import { Todo } from '../types'

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

export const BooleanNumberTypes = {
  FALSE: 0,
  TRUE: 1,
} as const
