import { db } from '@/models/db'
import { useLiveQuery } from 'dexie-react-hooks'

interface Props {
  where?: {
    startTimestamp: number
    endTimestamp: number
  }
  hideCompletes?: boolean
}

export const useTodoList = ({ where, hideCompletes }: Props = {}) => {
  function query() {
    if (where) {
      return db.todoItems
        .where('completedTime')
        .between(where.startTimestamp, where.endTimestamp)
        .sortBy('completedTime')
    }
    if (hideCompletes) {
      return db.todoItems.where('completedTime').equals(0).reverse().toArray()
    }
    return db.todoItems.reverse().toArray()
  }

  const todoList = useLiveQuery(query, [hideCompletes, where], [])

  return {
    todoList: todoList ?? [],
  }
}
