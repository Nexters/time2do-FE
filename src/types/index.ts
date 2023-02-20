export * from './DOMMessages'

export type Todo = {
  id: number
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
