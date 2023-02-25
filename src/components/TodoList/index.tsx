import { forwardRef, useEffect, useRef, useState } from 'react'
import XMark from '../../assets/svg/XMark'
import { useSetRecoilState } from 'recoil'
import { todosAtom } from '../../recoil/atoms'
import { defaultTodo } from '../../consts'
import Plus from '../../assets/svg/Plus'
import { Todo } from '../../types'
import { v4 as uuid } from 'uuid'
import { cls } from '../../utils/cls'
import { usePrevious } from 'react-use'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  title?: string
  readonly?: boolean
  todos: Todo[]
}

export const TodoList = ({ title = '할 일 목록', readonly, todos = [] }: Props) => {
  const setTodos = useSetRecoilState(todosAtom)
  const newTodoInputRef = useRef<HTMLInputElement>(null)
  const [parent] = useAutoAnimate()

  const addTodo = (value: string) => {
    const id = uuid()
    const newTodo = {
      ...defaultTodo,
      id,
      content: value,
    }
    setTodos(prev => [newTodo, ...prev])
  }
  console.log(todos)
  const prevLength = usePrevious(todos.length)
  useEffect(() => {
    if (typeof prevLength === 'undefined') return
    if (todos.length > (prevLength ?? 0)) {
      newTodoInputRef.current?.focus()
    }
  }, [todos.length])

  const updateTodo = (newTodo: Todo) => {
    setTodos(prev => prev.map(todo => (todo.id === newTodo.id ? newTodo : todo)))
  }

  return (
    <div className="relative w-full">
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
      <ul ref={parent} className="block">
        {todos.map((todo, index) => (
          <TodoItem
            ref={index === 0 ? newTodoInputRef : null}
            key={todo.id}
            todo={todo}
            readonly={Boolean(readonly)}
            onRemoveTodo={deletedTodo => setTodos(todos.filter(todo => todo.id !== deletedTodo.id))}
            onUpdateTodo={updateTodo}
            onAddTodo={() => addTodo('')}
          />
        ))}
      </ul>
    </div>
  )
}

interface TodoItemProps {
  todo: Todo
  readonly: boolean
  onAddTodo: () => void
  onRemoveTodo: (deletedTodo: Todo) => void
  onUpdateTodo: (newTodo: Todo) => void
}

const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(
  ({ todo, readonly, onRemoveTodo, onUpdateTodo, onAddTodo }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = () => {
      if (!todo.content) onRemoveTodo(todo)
      setIsFocused(false)
    }

    return (
      <li
        key={todo.id}
        className={cls(
          'mb-[0.625rem] flex w-full items-center justify-between gap-3 rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 px-4 py-[1.125rem] text-grey-400',
          isFocused ? 'bg-primary bg-opacity-10 ring-2 ring-primary' : '',
        )}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={e => {
            if (readonly) return
            onUpdateTodo({
              ...todo,
              completed: e.target.checked,
            })
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="checkbox-primary checkbox rounded-sm border-0 bg-grey-800"
        />
        <input
          type="text"
          enterKeyHint="done"
          className="w-full border-0 bg-grey-900 p-0 text-lg font-medium text-grey-300 caret-primary focus:outline-none focus:ring-0"
          value={todo.content}
          spellCheck={false}
          onChange={e => onUpdateTodo({ ...todo, content: e.target.value })}
          placeholder="오늘의 할 일을 작성해주세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onAddTodo()
            }
          }}
        />
        {!readonly && (
          <button
            className="ignore-dnd"
            onClick={e => {
              e.preventDefault()
              onRemoveTodo(todo)
            }}>
            <XMark />
          </button>
        )}
      </li>
    )
  },
)

TodoItem.displayName = 'TodoItem'
