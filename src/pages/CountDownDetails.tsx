import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { addCheerUp, getCheerUps, getParticipants, participate } from '../api/countDownTimer'
import { CountDownHeader } from '../components/CountDownHeader'
import Participants from '../components/Participants'
import { TodoList } from '../components/TodoList'
import { todosAtom, userAtom } from '../recoil/atoms'

export function CountDownDetails() {
  const user = useRecoilValue(userAtom)
  const [usersParticipating, setUsersParticipating] = useState([])
  const { invitationCode } = useParams()
  const [showCheerUpAnimation, setShowCheerUpAnimation] = useState(false)
  const { data: countDownTimer } = useQuery({
    queryKey: ['getCountDownTimer'],
    queryFn: () => participate({ user, invitationCode }),
    onSuccess: data => {
      const users = data?.users ?? []
      setUsersParticipating(users.map((user: any) => ({ userName: user.username, toDos: [] })))
    },
  })

  const { data: participants } = useQuery({
    queryKey: ['getParticipants'],
    queryFn: () => getParticipants({ user, invitationCode }),
    // 90초마다 참여자 refetch
    refetchInterval: 10000,
    refetchIntervalInBackground: false,
    onSuccess: data => {
      setUsersParticipating(data ?? [])
    },
  })
  console.log(countDownTimer)
  console.log(participants)
  const todos = useRecoilValue(todosAtom)

  const { data: cheerUps } = useQuery({
    queryKey: ['getCheerUps'],
    queryFn: () => getCheerUps({ user, invitationCode }),
    // 90초마다 참여자 refetch
    refetchInterval: 10000,
    refetchIntervalInBackground: false,
    onSuccess: data => {
      const cheerUps = data ?? []
      const filteredCheerUps = cheerUps.filter((cheerUp: any) => {
        const timeDiff = new Date().getTime() - new Date(cheerUp.createdTime).getTime()
        if (timeDiff < 5000) return true
        return false
      })
      if (filteredCheerUps.length === 0) return
      setShowCheerUpAnimation(true)
      filteredCheerUps.forEach((cheerUp: any) => {
        toast(`${cheerUp.userName}님이 응원을 보냈습니다. :)`, {
          delay: Math.floor(Math.random() * 1000),
          onClose: () => setShowCheerUpAnimation(false),
        })
      })
    },
  })

  const addCheerUpMutation = useMutation({
    mutationFn: () => addCheerUp({ user, invitationCode }),
    onSuccess: () => {
      toast.success('응원을 보냈습니다!')
    },
    onError: () => {
      toast.error('응원을 보내는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    },
  })

  const handleCheerUpClick = () => {
    console.log('test')
    addCheerUpMutation.mutate()
  }

  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <CountDownHeader showCheerUpAnimation={showCheerUpAnimation} onCheerUpClick={handleCheerUpClick} />
      </header>
      <div className="min-h-[400px] bg-grey-1000">
        <Participants participants={usersParticipating} />
        <div className="border-2 border-grey-850 opacity-50"></div>
        <div className=" py-7 px-6">
          <TodoList todos={todos} />
        </div>
      </div>
    </>
  )
}
