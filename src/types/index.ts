export * from './DOMMessages'

export type Todo = {
  id: number | string
  userId: number
  content: string
  completed: boolean
  private: boolean
  createdTime: Date
  completedTime?: Date | undefined
  modifiedTime?: Date | undefined
  deletedTime?: Date | undefined
}

export type Timer = {
  title: string
  isRunning: boolean
  startTimestamp: number
  endTimestamp?: number
}

export type User = {
  userId: string
  userName: string
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
