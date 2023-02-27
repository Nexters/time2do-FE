import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Switch from '../assets/svg/Switch'

const CountDownHome = () => {
  const navigate = useNavigate()
  const [invitationCode, setInvitationCode] = useState('')
  const [isHoveringModeButton, setIsHoveringModeButton] = useState(false)

  return (
    <div className="bg-grey-900">
      <div className="flex h-[23.3rem] items-center justify-center p-5">
        <div className="absolute top-5 left-5">
          <button
            onPointerEnter={() => setIsHoveringModeButton(true)}
            onPointerLeave={() => setIsHoveringModeButton(false)}
            onClick={() => navigate('/')}
            className="btn-primary btn-sm btn h-10 border-0 text-lg font-bold">
            <Switch classNames={isHoveringModeButton ? 'mr-2' : ''} />
            {isHoveringModeButton ? '개인모드' : ''}
          </button>
        </div>
        <div className="w-[20rem]">
          <h1 className="text-center text-2xl font-bold">그룹 타이머를 초대받았어요</h1>
          <h3 className="mt-3 text-center font-semibold text-grey-600">친구에게 받은 코드를 입력해주세요</h3>
          <input
            value={invitationCode}
            onChange={e => {
              setInvitationCode(e.target.value)
            }}
            className="mt-6 h-14 w-full rounded-md border-0 bg-grey-1000 text-center text-xl font-medium text-grey-500 caret-primary outline-none focus:ring-1 focus:ring-primary"
            type="text"
            placeholder="123456"
          />
          <div className="mt-7 text-center">
            <button
              onClick={() => navigate(`/countdown/${invitationCode}`)}
              className="btn-primary btn h-14 w-[90%] text-xl">
              확인
            </button>
          </div>
        </div>
      </div>
      <div className="h-2 bg-grey-850" />
      <div className="flex h-80 items-center justify-center p-5">
        <div className="w-[20rem] ">
          <h1 className="text-center text-2xl font-bold">그룹 타이머를 생성해보세요</h1>
          <h3 className="mt-3 text-center font-semibold text-grey-600">그룹을 만들고 친구들을 초대해보세요</h3>
          <div className="mt-7 text-center">
            <button onClick={() => navigate('/countdown/new')} className="btn-primary btn h-14 w-[90%] text-xl">
              그룹타이머 만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountDownHome
