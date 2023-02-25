import { useStopwatch } from 'react-timer-hook'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { countUpTimerAtom } from '../recoil/atoms'
import Switch from '../assets/svg/Switch'
import Report from '../assets/svg/ReportIcon'
import EditIcon from '../assets/svg/EditIcon'
import ModalPortal from './ModalPortal'
import { useNavigate } from 'react-router-dom'
import WhiteHeart from '../assets/svg/WhiteHeart'

const now = new Date()
now.setSeconds(now.getSeconds() + 100)

export const CountDownHeader = () => {
  const navigate = useNavigate()
  const [timer, setTimer] = useRecoilState(countUpTimerAtom)
  const { isRunning: isTimerRunning, start_time } = timer

  const stopwatchOffset = new Date()

  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
    offsetTimestamp: stopwatchOffset,
  })

  useEffect(() => {
    if (!isRunning && isTimerRunning) {
      start()
    }
  }, [isTimerRunning])

  const startTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: true, startTimestamp: new Date().getTime() }))
    start()
  }

  const resetTimer = () => {
    setTimer(prev => ({ ...prev, endTimestamp: new Date().getTime(), isRunning: false }))
    reset(undefined, false)
  }

  return (
    <>
      <div className="relative h-full w-full bg-[url('/img/countdowntimer.png')] bg-cover bg-center text-white">
        <div className="absolute top-0 left-0 flex w-full items-center justify-between px-5 py-6">
          <button onClick={() => navigate('/')} className="btn-primary btn-sm btn h-10 border-0 text-lg font-bold">
            그룹모드
            <Switch classNames="ml-2" />
          </button>

          <button className="">
            <Report />
          </button>
        </div>
        <div className="absolute bottom-0 mb-9 min-w-full text-center text-white">
          <div className="mb-3">
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
              {timer.name}
            </h1>
            <button onClick={openModal}>
              <EditIcon />
            </button>
          </div>
          <button className="btn-primary btn h-14 gap-2 rounded-full px-5 text-xl">
            <WhiteHeart />
            <span className="">응원하기</span>
          </button>
        </div>
      </div>

      {modalVisible && (
        <ModalPortal closePortal={() => setModalVisible(false)} isOpened={modalVisible}>
          <TimerTitleChangeModal
            title={timer.name}
            onClose={closeModal}
            onSubmit={newTitle => setTimer(prev => ({ ...prev, title: newTitle }))}
          />
        </ModalPortal>
      )}
    </>
  )
}

interface TimerTitleChangeModalProps {
  title: string
  onClose: () => void
  onSubmit: (title: string) => void
}

export const TimerTitleChangeModal = ({ title, onClose, onSubmit }: TimerTitleChangeModalProps) => {
  const [timerTitle, setTimerTitle] = useState(title)
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
