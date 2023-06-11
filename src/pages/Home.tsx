import { useRecoilValue } from 'recoil'
import { CountUpHeader } from '../components/CountUpHeader'
import { TodoList } from '../components/TodoList'
import { userAtom } from '../recoil/atoms'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodoList } from '@/hooks/useTodoList'

export function Home() {
  const [hideCompletes, setHideCompletes] = useState<boolean>(false)
  const { todoList } = useTodoList({ hideCompletes })
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
      <div className="min-h-[400px] bg-grey-1000 px-6 py-7">
        <TodoList
          showFilter
          todos={todoList}
          completesOnly={hideCompletes}
          onCompletesOnlyChange={newCompletesOnly => {
            setHideCompletes(newCompletesOnly)
          }}
        />
      </div>
    </>
  )
}
