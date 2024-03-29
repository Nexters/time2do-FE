import { forwardRef, useEffect, useRef, useState } from 'react'
import XMark from '../../assets/svg/XMark'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../recoil/atoms'
import Plus from '../../assets/svg/Plus'
import { Todo } from '../../types'
import { cls } from '../../utils/cls'
import { usePrevious } from 'react-use'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { db } from '@/models/db'
import { cn } from '@/lib/utils'

interface Props {
  name?: string
  readonly?: boolean
  todos: Todo[]
  showFilter?: boolean
  completesOnly?: boolean
  onCompletesOnlyChange?: (completesOnly: boolean) => void
}

export const TodoList = ({
  name = '할 일 목록',
  readonly,
  todos = [],
  showFilter = false,
  completesOnly = false,
  onCompletesOnlyChange,
}: Props) => {
  const user = useRecoilValue(userAtom)
  const newTodoInputRef = useRef<HTMLInputElement>(null)
  const [parent] = useAutoAnimate()

  const addTodo = (value: string) => {
    const newTodo = {
      content: value,
      userId: user?.id ?? '',
      userName: user?.userName ?? '',
      createdTime: new Date().getTime(),
      completedTime: 0,
      completed: false,
    } as Todo
    db.todoItems.add(newTodo)
  }

  const prevLength = usePrevious(todos.length)
  useEffect(() => {
    if (todos.length > (prevLength ?? 0)) {
      newTodoInputRef.current?.focus()
    }
  }, [todos.length])

  const updateTodo = (todo: Todo) => {
    db.todoItems.put({ ...todo })
  }

  const removeTodo = (deletedTodo: Todo) => {
    db.todoItems.delete(deletedTodo.id)
  }

  function completeTodo(todo: Todo) {
    updateTodo({
      ...todo,
      completed: true,
      completedTime: new Date().getTime(),
    })
  }

  function unCompleteTodo(todo: Todo) {
    updateTodo({
      ...todo,
      completed: false,
      completedTime: 0,
    })
  }

  return (
    <div className="relative w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="font-pretendard text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">{name}</h1>
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
        {showFilter && (
          <div className="flex items-center">
            <button
              onClick={() => onCompletesOnlyChange?.(!completesOnly)}
              className={cn(
                'rounded-md bg-opacity-30 px-2 py-1 text-grey-400 transition-colors duration-300 hover:bg-primary hover:bg-opacity-30 hover:text-opacity-75',
                {
                  'bg-primary': completesOnly,
                },
              )}>
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
              </svg>
              완료
            </button>
          </div>
        )}
      </div>
      <ul ref={parent} className="block">
        {todos.map((todo, index) => (
          <TodoItem
            ref={index === 0 ? newTodoInputRef : null}
            key={todo.id}
            todo={todo}
            readonly={Boolean(readonly)}
            onRemoveTodo={removeTodo}
            onUpdateTodo={updateTodo}
            onAddTodo={() => addTodo('')}
            onCompleteTodo={completeTodo}
            onUnCompleteTodo={unCompleteTodo}
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
  onCompleteTodo: (todo: Todo) => void
  onUnCompleteTodo: (todo: Todo) => void
}

const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(
  ({ todo, readonly, onRemoveTodo, onUpdateTodo, onAddTodo, onCompleteTodo, onUnCompleteTodo }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [tempState, setTempState] = useState(todo.content)
    const handleFocus = () => {
      if (readonly) return

      setIsFocused(true)
    }

    const handleBlur = () => {
      if (readonly) return
      if (!todo.content && !tempState) {
        onRemoveTodo(todo)
        setIsFocused(false)
        return
      }
      onUpdateTodo({ ...todo, content: tempState })
      setIsFocused(false)
    }

    const handleUpateTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (readonly) return
      const content = e.target.value
      setTempState(content)
    }

    return (
      <li
        key={todo.id}
        className={cls(
          'mb-[0.625rem] flex w-full items-center justify-between gap-3 rounded-[0.625rem] border border-solid border-grey-850 bg-grey-900 px-4 py-[1.125rem] text-grey-400',
          isFocused ? 'bg-primary bg-opacity-10 ring-2 ring-primary' : '',
        )}>
        <input
          type="checkbox"
          checked={Boolean(todo.completed)}
          disabled={readonly}
          onChange={e => {
            if (readonly) return
            const isComplete = e.target.checked
            if (isComplete) {
              onCompleteTodo(todo)
              return
            } else {
              onUnCompleteTodo(todo)
            }
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="checkbox-primary checkbox rounded-sm border-0 bg-grey-800"
        />
        <input
          type="text"
          enterKeyHint="done"
          className="w-full border-0 bg-grey-900 p-0 text-lg font-medium text-grey-300 caret-primary focus:outline-none focus:ring-0"
          value={tempState}
          spellCheck={false}
          onChange={handleUpateTodo}
          placeholder="오늘의 할 일을 작성해주세요"
          disabled={readonly}
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
