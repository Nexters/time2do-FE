import { useRecoilValue } from 'recoil'
import { CountDownHeader } from '../components/CountDownHeader'
import Participants from '../components/Participants'
import { TodoList } from '../components/TodoList'
import { todosAtom } from '../recoil/atoms'

export function CountDownHome() {
  const todos = useRecoilValue(todosAtom)

  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <CountDownHeader />
      </header>
      <div className="min-h-[400px] bg-grey-1000">
        <Participants />
        <div className="border-2 border-grey-850 opacity-50"></div>
        <div className=" py-7 px-6">
          <TodoList todos={todos} />
        </div>
      </div>
    </>
  )
}
