import { db } from '@/models/db'
import { useLiveQuery } from 'dexie-react-hooks'

interface Props {
  where?: {
    startTimestamp: number
    endTimestamp: number
  }
}

export const useTodoList = ({ where }: Props = {}) => {
  function query() {
    if (where) {
      return db.todoItems.where('completedTime').between(where.startTimestamp, where.endTimestamp).reverse().toArray()
    }
    return db.todoItems.reverse().toArray()
  }

  const todoList = useLiveQuery(query)

  return {
    todoList: todoList ?? [],
  }
}
