import { useEffect, useRef, useState } from 'react'
import XMark from '../../assets/svg/XMark'
import { ReactSortable } from 'react-sortablejs'
import { useRecoilState } from 'recoil'
import { todosAtom } from '../../recoil/atoms'
import { defaultTodo } from '../../consts'
import Plus from '../../assets/svg/Plus'
import cx from 'classnames'

interface Props {
  title?: string
  readonly?: boolean
}

export const TodoList = ({ title = '할 일 목록', readonly }: Props) => {
  const [todos = [], setTodos] = useRecoilState(todosAtom)
  const [newTodoText, setNewTodoText] = useState('')
  const newTodoInputRef = useRef<HTMLInputElement>(null)
  const [showNewTodoInput, setShowNewTodoInput] = useState(false)

  const [test, setTest] = useState()

  console.log(todos, '@')
  console.log()
  useEffect(() => {
    async function getStore() {
      const todo2 = await chrome.storage?.local.get(['todos']).then(result => result?.todos)
      setTest(todo2 ?? [])
    }
    getStore()
  }, [todos])

  console.log('@@', test)

  let hasFocus = document.activeElement
  if (!hasFocus || hasFocus == document.body) hasFocus = null
  else if (document.querySelector) hasFocus = document.querySelector(':focus')

  const addTodo = async (value: string) => {
    if (!value.trim()) return
    setNewTodoText('')
    const newTodo = {
      ...defaultTodo,
      id: new Date().getTime(),
      content: value,
    }
    setTodos(prev => [newTodo, ...prev])

    newTodoInputRef.current?.focus()
  }

  const renderTodos = () => {
    return todos.map((todo, i) => (
      <li
        key={todo.id}
        className={`mb-2 flex items-center justify-between rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 p-3 text-grey-400 ${cx(
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
              setTodos(
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
            className={`ignore-dnd checkbox-primary checkbox mr-2 bg-grey-800 ${cx({ 'cursor-default': readonly })}`}
          />
          {todo.content}
        </div>
        {!readonly && (
          <button
            className="ignore-dnd"
            onClick={e => {
              e.preventDefault()
              setTodos(todos.filter((_, j) => i !== j))
            }}>
            <XMark />
          </button>
        )}
      </li>
    ))
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-start gap-2">
        <h1 className="font-pretendard text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">{title}</h1>
        <div>
          {!readonly && (
            <button
              onClick={() => {
                setShowNewTodoInput(!showNewTodoInput)
                setTimeout(() => {
                  newTodoInputRef.current?.focus()
                }, 0)
              }}
              className="btn-primary btn-xs btn-circle btn text-white">
              <Plus />
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
        <ReactSortable
          tag="ul"
          // ReactSortable 이 chosen 필드가 추가되기를 원해서 강제 추가
          list={todos.map(todo => ({ ...todo, chosen: true }))}
          setList={setTodos}
          filter=".ignore-dnd"
          animation={200}>
          {renderTodos()}
        </ReactSortable>
      </div>
    </>
  )
}
