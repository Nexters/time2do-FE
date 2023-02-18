import { useEffect, useMemo, useRef, useState } from 'react'
import Plus from '../../assets/svg/Plus'
import XMark from '../../assets/svg/XMark'
import { ReactSortable } from 'react-sortablejs'

interface Props {
  todos: any[]
  onChange: (todos: any[]) => void
}

export const TodoList = ({ todos = [], onChange }: Props) => {
  const [newTodoText, setNewTodoText] = useState('')
  const newTodoInputRef = useRef<HTMLInputElement>(null)
  const [showNewTodoInput, setShowNewTodoInput] = useState(false)

  let hasFocus = document.activeElement
  if (!hasFocus || hasFocus == document.body) hasFocus = null
  else if (document.querySelector) hasFocus = document.querySelector(':focus')

  const addTodo = (value: string) => {
    if (!value.trim()) return
    setNewTodoText('')
    onChange([{ text: value, id: Date.now(), completed: false }, ...todos])
    newTodoInputRef.current?.focus()
  }

  const renderTodos = () => {
    return todos.map((todo, i) => (
      <li
        key={todo.id}
        className="mb-2 flex cursor-grab items-center justify-between rounded-md border border-grey-800 bg-grey-900 p-3 text-grey-300">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={e => {
              onChange(
                todos.map((todo, j) => {
                  if (i === j) {
                    return {
                      ...todo,
                      completed: e.target.checked,
                    }
                  }
                  return todo
                }),
              )
            }}
            className="ignore-dnd checkbox-primary checkbox mr-2 focus:border-lime-300 focus:outline-none focus:ring-lime-300"
          />
          {todo.text}
        </div>
        <button
          className="ignore-dnd"
          onClick={e => {
            e.preventDefault()
            onChange(todos.filter((_, j) => i !== j))
          }}>
          <XMark />
        </button>
      </li>
    ))
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-start gap-2">
        <h1 className="font-pretendard text-lg">할 일 목록 </h1>
        <button className="btn-primary btn-xs btn-circle btn" onClick={() => setShowNewTodoInput(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      <div>
        {showNewTodoInput && (
          <div className="flex">
            <input
              ref={newTodoInputRef}
              type="text"
              className="focus:border-primary-300 input mb-2 w-full rounded-r-none border-grey-900 bg-grey-1000 p-3 focus:outline-none focus:ring-primary"
              placeholder="할 일을 입력해주세요."
              value={newTodoText}
              onChange={e => setNewTodoText(e.target.value)}
              onKeyPress={e => {
                e.key === 'Enter' && addTodo(newTodoText)
              }}
            />
            <button
              onClick={() => {
                addTodo(newTodoText)
              }}
              className="btn-primary btn rounded-l-none">
              추가
            </button>
          </div>
        )}
        <ReactSortable list={todos} setList={onChange} filter=".ignore-dnd" animation={200}>
          {renderTodos()}
        </ReactSortable>
      </div>
    </>
  )
}
