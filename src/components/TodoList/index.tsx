import { useRef, useState } from 'react'
import Plus from '../../assets/svg/Plus'
import XMark from '../../assets/svg/XMark'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ReactSortable } from 'react-sortablejs'

interface Props {
  todos: any[]
  onChange: (todos: any[]) => void
}

export const TodoList = ({ todos = [], onChange }: Props) => {
  const [newTodoText, setNewTodoText] = useState('')
  const newTodoInputRef = useRef<HTMLInputElement>(null)
  const [showNewTodoInput, setShowNewTodoInput] = useState(false)

  const [parent] = useAutoAnimate()

  const addTodo = (value: string) => {
    if (!value.trim()) return
    setNewTodoText('')
    onChange([{ text: value, id: Date.now(), completed: false }, ...todos])
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold">1월 25일의 할 일 목록</h1>
        <div>
          <button
            onClick={() => {
              setShowNewTodoInput(!showNewTodoInput)
              setTimeout(() => {
                newTodoInputRef.current?.focus()
              }, 0)
            }}
            className="btn btn-sm text-white">
            <Plus />할 일 추가
          </button>
        </div>
      </div>
      <div>
        {showNewTodoInput && (
          <div className="flex">
            <input
              ref={newTodoInputRef}
              type="text"
              className="input w-full mb-2 focus:outline-none focus:ring-lime-300 focus:border-lime-300 rounded-r-none"
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
              className="btn rounded-l-none">
              추가
            </button>
          </div>
        )}
        <ul ref={parent}>
          <ReactSortable list={todos} setList={onChange} animation={200} swap>
            {todos.map((todo, i) => (
              <li key={todo.id} className="bg-white flex justify-between items-center p-3 mb-2 rounded-md cursor-grab">
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
                    className="checkbox checkbox-accent mr-2 focus:outline-none focus:ring-lime-300 focus:border-lime-300"
                  />
                  {todo.text}
                </div>
                <button
                  onClick={e => {
                    e.preventDefault()
                    onChange(todos.filter((_, j) => i !== j))
                  }}>
                  <XMark />
                </button>
              </li>
            ))}
          </ReactSortable>
        </ul>
      </div>
    </>
  )
}
