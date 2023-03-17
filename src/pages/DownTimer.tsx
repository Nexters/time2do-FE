import { useRecoilValue } from 'recoil'
import { DownHeader } from '../components/DownHeader'
import { TodoList } from '../components/TodoList'
import { todosAtom } from '../recoil/atoms'

export function DownTimer() {
  const todos = useRecoilValue(todosAtom)

  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <DownHeader />
      </header>
      <div className="min-h-[400px]  bg-grey-1000">
        <div className=" py-7 px-6">
          <TodoList todos={todos} />
        </div>
      </div>
    </>
  )
}
