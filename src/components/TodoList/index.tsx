import { useEffect, useRef, useState } from 'react'
import XMark from '../../assets/svg/XMark'
import { useRecoilState } from 'recoil'
import { todosAtom } from '../../recoil/atoms'
import { defaultTodo } from '../../consts'
import Plus from '../../assets/svg/Plus'
import { Todo } from '../../types'

interface Props {
  title?: string
  readonly?: boolean
}

export const TodoList = ({ title = '할 일 목록', readonly }: Props) => {
  const [todos = [], setTodos] = useRecoilState(todosAtom)
  const newTodoInputRef = useRef<HTMLInputElement>(null)

  const [test, setTest] = useState()
  console.log(todos)

  useEffect(() => {
    async function getStore() {
      const todo2 = await chrome.storage?.local.get(['todos']).then(result => result?.todos)
      setTest(todo2 ?? [])
    }
    getStore()
  }, [todos])

  let hasFocus = document.activeElement
  if (!hasFocus || hasFocus == document.body) hasFocus = null
  else if (document.querySelector) hasFocus = document.querySelector(':focus')

  const addTodo = (value: string) => {
    const tempId = new Date().getTime()
    const newTodo = {
      ...defaultTodo,
      id: tempId,
      content: value,
    }
    setTodos(prev => [newTodo, ...prev])

    newTodoInputRef.current?.focus()
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-start gap-2">
        <h1 className="font-pretendard text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">{title}</h1>
        <div>
          {!readonly && (
            <button
              onClick={() => {
                addTodo('')
              }}
              className="btn-primary btn-xs btn-circle btn text-white">
              <Plus />
            </button>
          )}
        </div>
      </div>
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            readonly={Boolean(readonly)}
            onContentChange={value => {
              setTodos(
                todos.map(oldTodo => {
                  if (oldTodo.id === todo.id) {
                    return {
                      ...todo,
                      content: value,
                    }
                  }
                  return todo
                }),
              )
            }}
            onRemoveItem={id => setTodos(todos.filter(todo => todo.id !== id))}
            onToggleComplete={(id, isChecked) =>
              setTodos(
                todos.map(todo => {
                  if (id === todo.id) {
                    return {
                      ...todo,
                      completed: isChecked,
                    }
                  }
                  return todo
                }),
              )
            }
          />
        ))}
      </div>
    </>
  )
}

interface TodoItemProps {
  todo: Todo
  readonly: boolean
  onToggleComplete: (id: number, isChecked: boolean) => void
  onRemoveItem: (id: number) => void
  onContentChange: (value: string) => void
}

const TodoItem = ({ todo, readonly, onToggleComplete, onRemoveItem, onContentChange }: TodoItemProps) => {
  return (
    <li
      key={todo.id}
      className="mb-[0.625rem] flex items-center justify-between gap-3 rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 px-4 py-[1.125rem] text-grey-400">
      {/* <div className="flex items-center text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-300">
      </div> */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={e => {
          if (readonly) return
          onToggleComplete(todo.id, e.target.checked)
        }}
        className="checkbox-primary checkbox rounded-sm border-0 bg-grey-800"
      />
      <input
        type="text"
        className="flex-1 border-0 bg-grey-900 p-0 text-lg font-medium text-grey-300 caret-primary focus:outline-none focus:ring-0"
        value={todo.content}
        spellCheck={false}
        onChange={e => onContentChange(e.target.value)}
      />
      {!readonly && (
        <button
          className="ignore-dnd"
          onClick={e => {
            e.preventDefault()
            onRemoveItem(todo.id)
          }}>
          <XMark />
        </button>
      )}
    </li>
  )
}
