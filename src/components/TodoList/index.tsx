import { useRef, useState } from 'react'
import Plus from '../../assets/svg/Plus'
import XMark from '../../assets/svg/XMark'
import { ReactSortable } from 'react-sortablejs'
import cx from 'classnames'

interface Props {
  title?: string
  readonly?: boolean
  todos: any[]
  onChange?: (todos: any[]) => void
}

export const TodoList = ({ title, readonly = false, todos = [], onChange }: Props) => {
  const [newTodoText, setNewTodoText] = useState('')
  const newTodoInputRef = useRef<HTMLInputElement>(null)
  const [showNewTodoInput, setShowNewTodoInput] = useState(false)

  let hasFocus = document.activeElement
  if (!hasFocus || hasFocus == document.body) hasFocus = null
  else if (document.querySelector) hasFocus = document.querySelector(':focus')

  const addTodo = (value: string) => {
    if (!value.trim()) return
    setNewTodoText('')
    onChange?.([{ text: value, id: Date.now(), completed: false }, ...todos])
    newTodoInputRef.current?.focus()
  }

  const renderTodos = () => {
    return todos.map((todo, i) => (
      <li
        key={todo.id}
        className={`mb-2 flex items-center justify-between rounded-md border border-solid border-grey-800 bg-grey-900 p-3 text-grey-400 ${cx(
          {
            'ignore-dnd': readonly,
            'cursor-grab': !readonly,
          },
        )}`}>
        <div className="flex items-center text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-300">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={e => {
              if (readonly) return

              onChange?.(
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
            className={`ignore-dnd checkbox-primary checkbox mr-2 focus:border-lime-300 focus:outline-none focus:ring-lime-300 ${cx(
              { 'cursor-default': readonly },
            )}`}
          />
          {todo.text}
        </div>
        {!readonly && (
          <button
            className="ignore-dnd"
            onClick={e => {
              e.preventDefault()
              onChange?.(todos.filter((_, j) => i !== j))
            }}>
            <XMark />
          </button>
        )}
      </li>
    ))
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-pretendard text-[1.1875rem] font-medium leading-[1.4375rem]">{title}</h1>
        <div>
          {!readonly && (
            <button
              onClick={() => {
                setShowNewTodoInput(!showNewTodoInput)
                setTimeout(() => {
                  newTodoInputRef.current?.focus()
                }, 0)
              }}
              className="btn-primary btn-sm btn text-white">
              <Plus />할 일 추가
            </button>
          )}
        </div>
      </div>
      <div>
        {showNewTodoInput && (
          <div className="flex">
            <input
              ref={newTodoInputRef}
              type="text"
              className="focus:border-primary-300 focus:ring-primary-300 input mb-2 w-full rounded-r-none border-grey-900 bg-grey-1000 py-[1.125rem] pl-[0.9375rem] pr-[0.75rem] focus:outline-none"
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
