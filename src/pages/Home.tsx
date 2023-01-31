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
      <header className="h-[30rem] w-full bg-gradient-to-b from-lime-300 to-[#F9F9F9]">
        <CountUpHeader />
      </header>
      <div className="bg-[#0F1214] py-7 px-6">
        <TodoList todos={todos} onChange={todos => setTodos(todos)} />
      </div>
    </>
  )
}
