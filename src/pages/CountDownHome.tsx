import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Switch from '../assets/svg/Switch'
import { useForm } from 'react-hook-form'
import { cls } from '../utils/cls'
import { ErrorMessage } from '@hookform/error-message'
import { toast } from 'react-toastify'
import api from '../api'

const CountDownHome = () => {
  const [codeEntered, setCodeEntered] = useState(false)
  console.log(codeEntered, '2#@$')
  // console.log(countDownTimer)
  const navigate = useNavigate()
  const [isHoveringModeButton, setIsHoveringModeButton] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async data => {
    console.log(data)
    setCodeEntered(true)
    const response = await api.get(`/timers/${data.invitationCode}`)
    if (response?.data?.invitationCode !== data.invitationCode) {
      toast.error('존재하지 않는 그룹 타이머입니다.')
      return
    }

    navigate(`/countdown/${data.invitationCode}`)
  }
  console.log()
  console.log(errors)
  return (
    <div className="bg-grey-900">
      <div className="flex h-[25rem] items-center justify-center p-5">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center text-2xl font-bold">친구에게 받은 코드가 있어요</h1>
            <h3 className="mt-3 text-center font-semibold text-grey-600">그룹 타이머로 바로 입장할 수 있어요</h3>
            <input
              defaultValue=""
              {...register('invitationCode', {
                required: '반드시 입력해야해요!',
                minLength: { value: 6, message: '6자리로 입력해야 합니다.' },
                maxLength: { value: 6, message: '6자리로 입력해야 합니다.' },
              })}
              className={cls(
                'mt-6 h-14 w-full rounded-md border-0 bg-grey-1000 text-center text-xl font-medium text-grey-500 caret-primary outline-none focus:ring-1 focus:ring-primary',
                errors.invitationCode ? 'ring-1 ring-accent' : '',
              )}
              type="text"
              placeholder="123456"
              maxLength={6}
            />
            <ErrorMessage
              errors={errors}
              name="invitationCode"
              render={({ message }) => <div className="m-1 text-accent">{message}</div>}
            />
            <div className="mt-7 text-center">
              <button type="submit" className="btn-primary btn h-14 w-[90%] text-xl">
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="h-2 bg-grey-850" />
      <div className="flex h-80 items-center justify-center p-5">
        <div className="w-[20rem] ">
          <h1 className="text-center text-2xl font-bold">그룹 타이머가 없어요</h1>
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
