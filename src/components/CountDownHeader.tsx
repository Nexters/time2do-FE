import { useStopwatch, useTimer } from 'react-timer-hook'
import { useEffect, useState } from 'react'
import Switch from '../assets/svg/Switch'
import Report from '../assets/svg/ReportIcon'
import EditIcon from '../assets/svg/EditIcon'
import ModalPortal from './ModalPortal'
import { useNavigate } from 'react-router-dom'
import WhiteHeart from '../assets/svg/WhiteHeart'
import Lottie from 'react-lottie'
import cheerupLottie from '../assets/lotties/time2do-cheerup.json'
import { GroupTimer } from '../types'

const now = new Date()
now.setSeconds(now.getSeconds() + 100)

interface Props {
  timer: GroupTimer
  expires: Date
  onCheerUpClick: () => void
  showCheerUpAnimation: boolean
}

export const CountDownHeader = ({ timer, expires, onCheerUpClick, showCheerUpAnimation }: Props) => {
  const navigate = useNavigate()
  const { isRunning: isTimerRunning, startTime, endTime } = timer ?? {}

  const stopwatchOffset = new Date()

  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const { seconds, minutes, hours, isRunning, start } = useTimer({
    expiryTimestamp: new Date(endTime),
    autoStart: true,
  })

  useEffect(() => {
    if (!isRunning && isTimerRunning) {
      start()
    }
  }, [isTimerRunning])

  const [isHoveringModeButton, setIsHoveringModeButton] = useState(false)

  const options = {
    loop: true,
    autoplay: true,
    animationData: cheerupLottie,
  }

  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-[url('/img/countdowntimer.png')] bg-cover bg-center text-white">
        <div className="absolute top-0 left-0 flex w-full items-center justify-between px-5 py-6">
          <button
            onPointerEnter={() => setIsHoveringModeButton(true)}
            onPointerLeave={() => setIsHoveringModeButton(false)}
            onClick={() => navigate('/')}
            className="btn-primary btn-sm btn h-10 border-0 text-lg font-bold">
            <Switch classNames={isHoveringModeButton ? 'mr-2' : ''} />
            {isHoveringModeButton ? '개인모드' : ''}
          </button>

          <button className="">
            <Report />
          </button>
        </div>
        <div className="absolute bottom-0 mb-9 min-w-full text-center text-white">
          <div className="mb-3">
            {new Date(timer?.startTime).getTime() > new Date().getTime() && (
              <div className="text-xl font-semibold">
                <span className="text-primary">
                  {new Date(timer?.startTime).getHours()}:{new Date(timer?.startTime).getMinutes()}
                </span>{' '}
                시작 예정
              </div>
            )}

            <div className="mb-3">
              <span className="countdown font-montserrat text-[4rem] font-bold">
                {/* @ts-ignore */}
                <span style={{ '--value': hours }}></span>:<span style={{ '--value': minutes }}></span>:
                {/* @ts-ignore */}
                <span style={{ '--value': seconds }}></span>
              </span>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-center text-xl font-semibold">
            <h1 onClick={openModal} className="mr-1">
              <span className="mr-2 rounded-lg bg-white bg-opacity-50 py-1 px-2 text-xl text-primary">
                {timer?.tag ? `#${timer.tag}` : ''}
              </span>
              {timer?.name ?? ''}
            </h1>
            {/* <button onClick={openModal}>
              <EditIcon />
            </button> */}
          </div>
          <button onClick={onCheerUpClick} className="btn-primary btn h-14 gap-2 rounded-full px-5 text-xl">
            <WhiteHeart />
            <span className="">응원하기</span>
          </button>
        </div>
        {showCheerUpAnimation && (
          <div>
            <Lottie options={options} />
          </div>
        )}
      </div>
      {modalVisible && (
        <ModalPortal closePortal={() => setModalVisible(false)} isOpened={modalVisible}>
          <TimerTitleChangeModal name={timer.name} onClose={closeModal} onSubmit={() => {}} />
        </ModalPortal>
      )}
    </>
  )
}

interface TimerTitleChangeModalProps {
  name: string
  onClose: () => void
  onSubmit: (name: string) => void
}

export const TimerTitleChangeModal = ({ name, onClose, onSubmit }: TimerTitleChangeModalProps) => {
  const [timerTitle, setTimerTitle] = useState(name)
  return (
    <div className="w-[24.25rem] rounded-2xl bg-grey-850 px-5 pb-[1.125rem] pt-6">
      <form
        className="flex flex-col"
        onSubmit={e => {
          e.preventDefault()
          onSubmit(timerTitle)
          onClose()
        }}>
        <label htmlFor="nickname" className="mb-[0.625rem] text-[0.875rem] font-bold leading-[0.875rem] text-grey-300">
          타이머 이름
        </label>
        <input
          value={timerTitle}
          onChange={e => setTimerTitle(e.target.value)}
          type="text"
          id="nickname"
          className="mb-6 rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 px-[0.8125rem] pt-[1.1875rem] pb-[1.25rem] text-[1.125rem] font-medium leading-[1.3125rem] text-grey-300 focus:border-primary"
          autoFocus
        />
        <div className="flex w-full justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="width-full flex-1 rounded-[0.625rem] bg-grey-800  py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
            닫기
          </button>
          <button
            type="submit"
            className="width-full flex-1 rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
            수정완료
          </button>
        </div>
      </form>
    </div>
  )
}
