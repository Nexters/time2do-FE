// Dexie Todo 예시 참고 (https://stackblitz.com/edit/dexie-todo-list?file=models%2Fdb.ts)
// Timer 가 TodoList 이고, Todo 가 TodoItem 인 것처럼 작성
import Dexie, { Table } from 'dexie'
import type { Todo } from './TodoItem'
import type { UpTimer } from './UpTimer'
// import { populate } from './populate'

export class UpTimerDB extends Dexie {
  upTimers!: Table<UpTimer, number>
  todoItems!: Table<Todo, number>
  constructor() {
    super('UpTimerDB')
    this.version(1).stores({
      upTimers: 'id, startedAt, endedAt',
      todoItems: '++id, upTimerId',
    })
  }

  deleteUpTimer(upTimerId: number) {
    return this.transaction('rw', this.todoItems, this.upTimers, () => {
      this.todoItems.where({ upTimerId }).delete()
      this.upTimers.delete(upTimerId)
    })
  }
}

export const db = new UpTimerDB()

// db.on('populate', populate)

export function resetDatabase() {
  return db.transaction('rw', db.upTimers, db.todoItems, async () => {
    await Promise.all(db.tables.map(table => table.clear()))
    // await populate()
  })
}