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
          reset(true)
        }
      } else if (isRunning) {
        if (idFromStorage) {
          pause(true)
        } else {
          reset(true)
        }
      }
      setSeconds(passedSecondsFromStorage)
    } else if (isRunningFromStorage) {
      if (!isRunning) {
        // 이 start 나 위의 pause 같은 게 호출될 때 onPaused, onStarted 같은 걸 호출하면
        // 불필요한 레코드가 추가로 생성될 수 있기 때문에 그걸 막을 수 있는 인자를 추가해야 할듯.
        start(true)
      }
      setSeconds(passedSecondsFromStorage + getSecondsFromPrevTime(prevTime, true))
    }
  }, 1000)

  function start(skipCallback = false) {
    console.log('test', skipCallback)
    const newPrevTime = new Date().getTime()
    setPrevTime(newPrevTime)
    setIsRunning(true)
    setSeconds(passedSeconds)
    if (!skipCallback) onStart?.()
  }

  function pause(skipCallback = false) {
    setPassedSeconds(seconds)
    setIsRunning(false)
    if (!skipCallback) onPause?.()
  }

  function reset(skipCallback = false, offset = 0, newAutoStart = false) {
    // 리셋하면 0 초 혹은 offset 초로 시작
    const newPassedSeconds = getSecondsFromExpiry(offset, true) || 0
    setPassedSeconds(newPassedSeconds)
    const newPrevTime = new Date().getTime()
    setPrevTime(newPrevTime)
    setIsRunning(newAutoStart)
    setSeconds(newPassedSeconds)
    if (!skipCallback) onReset?.()
  }

  return {
    ...getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning,
  }
}
