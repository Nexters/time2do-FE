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
