import { useState } from 'react'
import { CountUpHeader } from '../components/CountUpHeader'
import { TodoList } from '../components/TodoList'

interface Props {}

export function Home({}: Props) {
  const [todos, setTodos] = useState([
    { id: 1, text: '운동하기1', completed: true },
    { id: 2, text: '운동하기2', completed: true },
    { id: 3, text: '운동하기3', completed: true },
    { id: 4, text: '운동하기4', completed: true },
    { id: 5, text: '운동하기5', completed: true },
  ])

  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <CountUpHeader />
      </header>
      <div className="bg-grey-1000 py-7 px-6">
        <TodoList todos={todos} onChange={todos => setTodos(todos)} />
      </div>
    </>
  )
}
