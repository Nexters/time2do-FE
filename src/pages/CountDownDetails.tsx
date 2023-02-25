import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { addCheerUp, getCheerUps, getParticipants, participate } from '../api/countDownTimer'
import { CountDownHeader } from '../components/CountDownHeader'
import Participants from '../components/Participants'
import { TodoList } from '../components/TodoList'
import { todosAtom, userAtom } from '../recoil/atoms'

export function CountDownDetails() {
  const user = useRecoilValue(userAtom)
  const { invitationCode } = useParams()
  console.log(invitationCode)
  const { data: countDownTimer } = useQuery({
    queryKey: ['getCountDownTimer'],
    queryFn: () => participate({ user, invitationCode }),
  })

  const { data: participants } = useQuery({
    queryKey: ['getParticipants'],
    queryFn: () => getParticipants({ user, invitationCode }),
    // 90초마다 참여자 refetch
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  })
  console.log(countDownTimer)
  console.log(participants)
  const todos = useRecoilValue(todosAtom)

  const { data: cheerUps } = useQuery({
    queryKey: ['getCheerUps'],
    queryFn: () => getCheerUps({ user, invitationCode }),
    // 90초마다 참여자 refetch
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  })

  const addCheerUpMutation = useMutation({
    mutationFn: () => addCheerUp({ user, invitationCode }),
    onSuccess: () => {
      console.log('성공')
    },
    onError: () => {
      alert('응원을 보내는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    },
  })

  return (
    <>
      <header className="h-[32rem] w-full bg-grey-1000">
        <CountDownHeader onCheerUpClick={() => addCheerUpMutation.mutate()} />
      </header>
      <div className="min-h-[400px] bg-grey-1000">
        <Participants participants={participants} />
        <div className="border-2 border-grey-850 opacity-50"></div>
        <div className=" py-7 px-6">
          <TodoList todos={todos} />
        </div>
      </div>
    </>
  )
}
