import { useState } from 'react'
import { useInterval } from 'react-use'
import { TimeRecord } from '../types'
import { getLocalStorageState } from '../utils'
import { getSecondsFromExpiry, getSecondsFromPrevTime, getTimeFromSeconds } from './utils'

const getTotalSecondsUpToLastRecordFromTimeRecords = (timeRecords: TimeRecord[], timerId: number) => {
  if (!timerId) return 0
  const filteredTimeRecords = timeRecords.filter(record => record.timerId === timerId)
  const totalSeconds = filteredTimeRecords.reduce((acc, cur) => {
    if (!cur?.endTime) return acc
    const startTime = new Date(cur.startTime).getTime()
    const endTime = new Date(cur.endTime).getTime()
    return acc + (endTime - startTime) / 1000
  }, 0)
  return Math.round(totalSeconds)
}

interface Props {
  autoStart: boolean
  offsetTimestamp?: number
  onStart?: () => void
  onPause?: () => void
  onReset?: () => void
}

export function useCountUpTimer({ autoStart = false, offsetTimestamp = 0, onPause, onReset, onStart }: Props) {
  // passedSeconds 는 offset 을 기록하는데, 시작점이 0 초가 아닌 offset 초로 시작하고 싶을 때 사용하거나
  // pause 되었을 때까지의 시간을 기록하기 위해 사용한다.
  // 이건 '현재의 시간' 과는 관계없이 그저 축적된 기록이다.
  const [passedSeconds, setPassedSeconds] = useState(getSecondsFromExpiry(offsetTimestamp, true) || 0)
  // prevTime 은 타이머의 시작점을 기록. 이 시작점과 현재 시간의 차이를 초로 계산하여 타이머를 업데이트.
  // 현재 시간과의 차이 계산은 getSecondsFromPrevTime 에서 한다.
  // passedSeconds 와 달리 prevTime 은 '현재의 시간' 과 관계가 있다.
  const [prevTime, setPrevTime] = useState<number>(new Date().getTime())
  const [seconds, setSeconds] = useState(passedSeconds + getSecondsFromPrevTime(prevTime || 0, true))
  const [isRunning, setIsRunning] = useState<boolean>(autoStart)
  console.log(passedSeconds, prevTime, seconds, isRunning)
  useInterval(() => {
    const countUpTimer = getLocalStorageState('countUpTimer', '{}')
    const countUpTimerRecords = getLocalStorageState('countUpTimerRecords', '[]')
    const passedSecondsFromStorage = getTotalSecondsUpToLastRecordFromTimeRecords(countUpTimerRecords, countUpTimer.id)
    setPassedSeconds(passedSecondsFromStorage)
    const { isRunning: isRunningFromStorage, id: idFromStorage } = countUpTimer
    if (!isRunningFromStorage) {
      if (!isRunning) {
        if (!idFromStorage && passedSeconds > 0) {
          reset()
        }
      } else if (isRunning) {
        if (idFromStorage) {
          pause()
        } else {
          reset()
        }
      }
      setSeconds(passedSecondsFromStorage)
    } else if (isRunningFromStorage) {
      if (!isRunning) {
        start()
      }
      setSeconds(passedSecondsFromStorage + getSecondsFromPrevTime(prevTime, true))
    }
  }, 1000)

  function start() {
    const newPrevTime = new Date().getTime()
    setPrevTime(newPrevTime)
    setIsRunning(true)
    setSeconds(passedSeconds)
    onStart?.()
  }

  function pause() {
    setPassedSeconds(seconds)
    setIsRunning(false)
    onPause?.()
  }

  function reset(offset = 0, newAutoStart = false) {
    // 리셋하면 0 초 혹은 offset 초로 시작
    const newPassedSeconds = getSecondsFromExpiry(offset, true) || 0
    setPassedSeconds(newPassedSeconds)
    const newPrevTime = new Date().getTime()
    setPrevTime(newPrevTime)
    setIsRunning(newAutoStart)
    setSeconds(newPassedSeconds)
    onReset?.()
  }

  return {
    ...getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  }
}
