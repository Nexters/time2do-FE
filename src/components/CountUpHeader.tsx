import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStopwatch } from 'react-timer-hook'
import { useRecoilState, useRecoilValue } from 'recoil'
import EditIcon from '../assets/svg/EditIcon'
import Report from '../assets/svg/ReportIcon'
import Switch from '../assets/svg/Switch'
import { countUpTimerAtom, userAtom } from '../recoil/atoms'
import ModalPortal from './ModalPortal'

const now = new Date()
now.setSeconds(now.getSeconds() + 100)

export const CountUpHeader = () => {
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)

  const [timer, setTimer] = useRecoilState(countUpTimerAtom)
  const { isRunning: isTimerRunning, startTime } = timer

  const stopwatchOffset = new Date()

  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const [reportLoginModalVisible, setReportLoginModalVisible] = useState(false)

  const openReportLoginModal = () => {
    setReportLoginModalVisible(true)
  }

  const closeReportLoginModal = () => {
    setReportLoginModalVisible(false)
  }

  const modeButtonClickHandler = () => {
    if (user) {
      navigate('/countdown')

      return
    }

    openReportLoginModal()
  }

  const reportButtonClickHandler = () => {
    if (user) {
      navigate('/report')

      return
    }

    openReportLoginModal()
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
      <div className="relative h-full w-full bg-[url('/img/countuptimer.png')] bg-cover bg-center text-white">
        <div className="absolute top-0 left-0 flex w-full items-center justify-between px-5 py-6">
          {/* <button onClick={modeButtonClickHandler} className="btn-primary btn-sm btn h-10 border-0 text-lg font-bold">
            개인모드
            <Switch classNames="ml-2" />
          </button>

          <button onClick={reportButtonClickHandler}>
            <Report />
          </button> */}
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
          <TimerButtons
            hasStarted={Boolean(isTimerRunning)}
            isRunning={isRunning}
            onStartClick={startTimer}
            onResetClick={resetTimer}
            onPauseClick={pause}
          />
        </div>
      </div>

      {modalVisible && (
        <ModalPortal closePortal={() => setModalVisible(false)} isOpened={modalVisible}>
          <TimerTitleChangeModal
            name={timer.name}
            onClose={closeModal}
            onSubmit={newTitle => setTimer(prev => ({ ...prev, name: newTitle }))}
          />
        </ModalPortal>
      )}

      {reportLoginModalVisible && (
        <ModalPortal closePortal={closeReportLoginModal} isOpened={reportLoginModalVisible}>
          <div className="fixed right-1/2 bottom-1/2 w-[24.25rem] translate-x-1/2 translate-y-1/2 rounded-2xl bg-grey-850 px-[1.375rem] pb-[1.125rem] pt-[1.5625rem]">
            <div className="flex flex-col">
              <p className="mb-4 text-[1.375rem] font-bold leading-[140%] text-grey-200">로그인이 필요해요</p>
              <p className="mb-[1.375rem] text-[1rem] font-semibold leading-[1.4375rem]">
                기능을 이용하려면 내 정보가 필요해요
              </p>
              <div className="flex gap-[0.625rem]">
                <button
                  className="width-full flex-1 rounded-[0.625rem] bg-grey-800 py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white"
                  onClick={closeReportLoginModal}>
                  끝내기
                </button>
                <button
                  className="width-full flex-1 rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white"
                  onClick={() => navigate('/login')}>
                  로그인
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  )
}

interface TimerButtonsProps {
  hasStarted: boolean
  isRunning: boolean
  onStartClick: () => void
  onResetClick: () => void
  onPauseClick: () => void
}

export const TimerButtons = ({
  hasStarted,
  isRunning,
  onStartClick,
  onResetClick,
  onPauseClick,
}: TimerButtonsProps) => {
  if (!hasStarted)
    return (
      <div>
        <button onClick={onStartClick} className="btn-primary btn h-14 gap-2 rounded-full px-5 text-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
          타이머 시작하기
        </button>
      </div>
    )

  return (
    <div className="flex items-center justify-center gap-3">
      {isRunning ? (
        <button onClick={onPauseClick} className="btn-primary btn h-14 rounded-full px-5 text-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
              clipRule="evenodd"
            />
          </svg>
          멈추기
        </button>
      ) : (
        <button onClick={onStartClick} className="btn-primary btn h-14 gap-2 rounded-full px-5 text-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
          재시작
        </button>
      )}

      <button
        onClick={onResetClick}
        className="btn-circle btn h-14 w-14 rounded-full border border-grey-850 bg-grey-900">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-8 w-8">
          <path
            fillRule="evenodd"
            d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
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
