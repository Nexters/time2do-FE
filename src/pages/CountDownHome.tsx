import { CountDownHeader } from '../components/CountDownHeader'
import Participants from '../components/Participants'
import { TodoList } from '../components/TodoList'

export function CountDownHome() {
  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <CountDownHeader />
      </header>
      <div className="min-h-[400px] bg-grey-1000">
        <Participants />
        <div className="border-2 border-grey-850 opacity-50"></div>
        <div className=" py-7 px-6">
          <TodoList />
        </div>
      </div>
    </>
  )
}
