import { useStopwatch } from 'react-timer-hook'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { timerAtom } from '../recoil/atoms'
import Switch from '../assets/svg/Switch'
import Report from '../assets/svg/ReportIcon'

const now = new Date()
now.setSeconds(now.getSeconds() + 100)

export const CountUpHeader = () => {
  const [timer, setTimer] = useRecoilState(timerAtom)
  const { isRunning: isTimerRunning, startTimestamp } = timer

  const stopwatchOffset = new Date()
  const diff = stopwatchOffset.setSeconds(stopwatchOffset.getTime() - startTimestamp) / 1000

  console.log(diff, 'diff')
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
    setTimer({ isRunning: true, startTimestamp: new Date().getTime() })
    start()
  }

  const resetTimer = () => {
    setTimer(prev => ({ ...prev, endTimestamp: new Date().getTime(), isRunning: false }))
    reset(undefined, false)
  }

  return (
    <div className="grid h-full w-full items-end justify-center bg-[url('/img/character.png')] bg-cover bg-center text-white">
      <div className="absolute top-0 left-0 flex w-full items-center justify-between px-5 py-6">
        <button className="btn-primary btn-sm btn h-10 border-0 bg-opacity-50 text-lg font-bold">
          개인모드
          <Switch classNames="ml-2" />
        </button>

        <button className="">
          <Report />
        </button>
      </div>
      <div className="col-span-full row-span-full mb-9 min-w-full text-center">
        <div className="mb-3">
          <div className="mb-3">
            <span className="countdown font-montserrat text-6xl font-bold">
              {/* @ts-ignore */}
              <span style={{ '--value': hours }}></span>:<span style={{ '--value': minutes }}></span>:{/* @ts-ignore */}
              <span style={{ '--value': seconds }}></span>
            </span>
          </div>
        </div>
        <div className="mb-4 text-lg font-semibold">오늘 무조건 다 끝내본다!!</div>
        <TimerButtons
          hasStarted={isTimerRunning}
          isRunning={isRunning}
          onStartClick={startTimer}
          onResetClick={resetTimer}
          onPauseClick={pause}
        />
      </div>
    </div>
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
          시작하기
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
          시작하기
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
