import { Todo } from '../types'

interface Props {
  participants: { userName: string; toDos: Todo[] }[]
}

const Participants = ({ participants = [] }: Props) => {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex gap-[0.625rem]">
        {participants.map(participant => (
          <div key={participant.userName} className="flex-col items-center justify-center">
            <button className="h-14 w-14 bg-[url('/img/groupCharacter1.png')] bg-cover bg-center" />
            <div className="mt-1 text-center">{participant.userName}</div>
          </div>
        ))}
      </div>
      <div>
        <button className="btn-circle btn h-14 w-14 bg-[#282651]">
          <div className="h-8 w-8 bg-[url('/img/link.png')] bg-cover bg-center" />
        </button>
        <div className="mt-1 text-center">코드 공유</div>
      </div>
    </div>
  )
}

export default Participants
