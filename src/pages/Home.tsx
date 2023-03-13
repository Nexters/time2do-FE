import { useRecoilValue } from 'recoil'
import { CountUpHeader } from '../components/CountUpHeader'
import { TodoList } from '../components/TodoList'
import { todosAtom, userAtom } from '../recoil/atoms'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const todos = useRecoilValue(todosAtom)
  const user = useRecoilValue(userAtom)
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !user?.onboarding) {
      navigate('onboarding')
    }
  }, [])

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
