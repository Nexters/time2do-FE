import { DownHeader } from '../components/DownHeader'
import { TodoList } from '../components/TodoList'
import { getLocalStorageState } from '../utils'

interface Props {}

export function DownTimer({}: Props) {
  const localTodos = getLocalStorageState('todos', '[]')

  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <DownHeader />
      </header>
      <div className="min-h-[400px]  bg-grey-1000">
        <div className=" py-7 px-6">
          <TodoList todos={localTodos} />
        </div>
      </div>
    </>
  )
}
