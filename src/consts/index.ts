export const defaultTodo = {
  content: '',
  id: new Date().getTime(),
  completed: false,
  userId: 1,
  private: false,
  createdTime: new Date(),
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
