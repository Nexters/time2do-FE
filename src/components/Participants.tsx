import { useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../recoil/atoms'
import { Todo } from '../types'

interface Props {
  participants: { userName: string; toDos: Todo[] }[]
  onParticipantClick: (name: string) => void
}

const Participants = ({ participants = [], onParticipantClick }: Props) => {
  const user = useRecoilValue(userAtom)
  const { invitationCode } = useParams()
  const [copyState, copyToClipboard] = useCopyToClipboard()
  console.log(participants)
  useEffect(() => {
    if (copyState.error) {
      toast.error('복사에 실패했습니다. 다시 시도해주세요.')
    } else if (copyState.value) {
      toast.dark('코드가 복사되었습니다.')
    }
  }, [copyState])

  const filteredUsers = (participants ?? []).find(participant => participant.userName === user?.userName)
    ? participants
    : [{ userName: user?.userName, toDo: [] }, ...(participants ?? [])]
  console.log(filteredUsers)
  return (
    <div className="relative">
      <div className="relative w-full max-w-md items-center justify-between overflow-auto p-4">
        <div className="flex gap-[0.625rem]">
          {filteredUsers.map(participant => (
            <div key={participant.userName} className="flex-col items-center justify-center">
              <button
                style={{ backgroundImage: `url('/img/profile/Profile${Math.floor(Math.random() * 12) + 1}.png')` }}
                className="h-14 w-14 bg-cover bg-center"
                onClick={() => onParticipantClick(participant.userName ?? '')}
              />
              <div className="mt-1 text-center">{participant.userName}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute right-3 top-3 bottom-3 flex items-center justify-center ">
        <button
          onClick={() => copyToClipboard(invitationCode ?? '')}
          className="btn h-full bg-grey-850 px-2 py-4 shadow-lg">
          <div className="flex-col text-center">
            <img src="/img/link.png" width="32" height="32" className="mx-auto" alt="" />
            {/* <div className="h-8 w-8 bg-[url('/img/link.png')] bg-cover bg-center" /> */}
            <div className="mt-2 text-center">코드 공유</div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Participants
