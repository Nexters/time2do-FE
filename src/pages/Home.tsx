import { useRecoilValue } from 'recoil'
import { CountUpHeader } from '../components/CountUpHeader'
import { TodoList } from '../components/TodoList'
import { todosAtom } from '../recoil/atoms'

export function Home() {
  const todos = useRecoilValue(todosAtom)

  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <CountUpHeader />
      </header>
      <div className="min-h-[400px] bg-grey-1000 py-7 px-6">
        <TodoList todos={todos} />
      </div>
    </>
  )
}
