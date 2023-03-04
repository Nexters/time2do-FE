import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { addCheerUp, getCheerUps, getParticipants, participate } from '../api/countDownTimer'
import { syncTodos } from '../api/report'
import { CountDownHeader } from '../components/CountDownHeader'
import Participants from '../components/Participants'
import { TodoList } from '../components/TodoList'
import { todosAtom, userAtom } from '../recoil/atoms'
import { User } from '../types'
import { getLocalStorageState } from '../utils'

export function CountDownDetails() {
  const user = useRecoilValue(userAtom)
  const nagivation = useNavigate()
  if (!user) {
    nagivation('/login')
  }
  const { invitationCode } = useParams()
  const [showCheerUpAnimation, setShowCheerUpAnimation] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<string | undefined>()

  const { data: countDownTimer } = useQuery({
    queryKey: ['getCountDownTimer', invitationCode],
    queryFn: () => participate({ user, invitationCode }),
  })
  const localTodos = getLocalStorageState('todos', '[]')

  const syncTodosMutation = useMutation({
    mutationFn: () => syncTodos({ userId: user?.id, todos: localTodos }),
  })

  useEffect(() => {
    if (user?.id) {
      syncTodosMutation.mutate()
    }
  }, [user])

  const { data: participants } = useQuery({
    queryKey: ['getParticipants'],
    queryFn: () => getParticipants({ user, invitationCode }),
    // 90초마다 참여자 refetch
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  })
  const todos = useRecoilValue(todosAtom)

  const { data: cheerUps } = useQuery({
    queryKey: ['getCheerUps'],
    queryFn: () => getCheerUps({ user, invitationCode }),
    // 90초마다 참여자 refetch
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
    onSuccess: data => {
      const cheerUps = data ?? []
      const filteredCheerUps = cheerUps.filter((cheerUp: any) => {
        const timeDiff = new Date().getTime() - new Date(cheerUp.createdTime).getTime()
        if (timeDiff < 4800) return true
        return false
      })

      if (filteredCheerUps.length === 0) return
      filteredCheerUps.forEach((cheerUp: any) => {
        setTimeout(() => {
          setShowCheerUpAnimation(true)

          toast.dark(`${cheerUp.userName}님이 응원을 보냈습니다. :)`, {
            onClose: () =>
              setTimeout(() => {
                setShowCheerUpAnimation(false)
              }, 5000),
          })
        }, Math.random() * 1200)
      })
    },
  })

  const addCheerUpMutation = useMutation({
    mutationFn: () => addCheerUp({ user, invitationCode }),
    onSuccess: () => {
      toast.dark('응원을 보냈습니다!', { autoClose: 800 })
    },
    onError: () => {
      toast.error('응원을 보내는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.', { autoClose: 1000 })
    },
  })

  const handleCheerUpClick = () => {
    addCheerUpMutation.mutate()
  }

  const getProperTodos = () => {
    if (!selectedParticipant || user?.userName === selectedParticipant) return todos
    const matchingParticipant = (participants ?? []).find(
      (participant: any) => participant.userName === selectedParticipant,
    )
    if (matchingParticipant) {
      return matchingParticipant?.toDos ?? []
    }
    return []
  }

  const selectedTodos = getProperTodos()
  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <CountDownHeader
          timer={countDownTimer}
          expires={new Date(countDownTimer?.endTime ?? new Date())}
          showCheerUpAnimation={showCheerUpAnimation}
          onCheerUpClick={handleCheerUpClick}
        />
      </header>
      <div className="min-h-[400px]  bg-grey-1000">
        <Participants
          onParticipantClick={name => setSelectedParticipant(name)}
          selectedParticipant={selectedParticipant}
          participants={participants}
        />
        <div className="border-2 border-grey-850 opacity-50"></div>
        <div className=" py-7 px-6">
          <TodoList todos={selectedTodos} />
        </div>
      </div>
    </>
  )
}
