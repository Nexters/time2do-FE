import { db } from '@/models/db'
import { useLiveQuery } from 'dexie-react-hooks'

interface Props {
  where?: {
    startTimestamp: number
    endTimestamp: number
  } | null
  hideCompletes?: boolean
}

export const useTodoList = ({ where, hideCompletes }: Props = {}) => {
  async function query() {
    if (where) {
      return db.todoItems
        .where('completedTime')
        .between(where.startTimestamp, where.endTimestamp)
        .reverse()
        .sortBy('completedTime')
    }
    if (hideCompletes) {
      return db.todoItems.where('completedTime').equals(0).reverse().toArray()
    }
    const notCompleted = await db.todoItems.where('completedTime').equals(0).reverse().toArray()
    const completed = await db.todoItems.where('completedTime').above(0).reverse().toArray()
    return [...notCompleted, ...completed]
  }

  const todoList = useLiveQuery(query, [where])

  return {
    todoList: todoList ?? [],
  }
}
