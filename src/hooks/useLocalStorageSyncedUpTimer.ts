import { useState } from 'react'
import { useInterval } from 'react-use'
import { getCurrentTotalPassedSeconds, getTimeFromSeconds, getUpTimer, setUpTimer } from '../utils'
import { UpTimer } from '../types'
import { v4 as uuidv4 } from 'uuid'

/**
 * 로컬에서 timer state 를 관리하기 보다 앱의 모든 곳에서 useLocalStorage 로 직접 접근하는 걸 강제한다.
 */

// 이전 배포 버전과 localStorage 에 저장되는 timer 의 버전이 다르면 리셋하도록 한다.
const VERSION = '1'

interface Props {
  timerName: string
  makerId?: string
  makerName?: string
  onStart?: (timer?: UpTimer) => void
  onRestart?: (timer?: UpTimer) => void
  onPause?: (timer?: UpTimer) => void
  onReset?: (timer: UpTimer) => void
}

export function useLocalStorageSyncedCountUpTimer({
  timerName,
  makerId,
  makerName,
  onPause,
  onReset,
  onStart,
  onRestart,
}: Props) {
  // passedSeconds 나 isRunning 이나 이 훅을 사용중인 컴포넌트에 값을 내려주기 위해 가지고 있는 state 들.
  // 즉, 대신해서 localStorage 에 접근해서 값을 가져오는 역할을 하려고 존재할 뿐이다.
  const [passedSeconds, setPassedSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [timer, setTimer] = useState<UpTimer | null>(null)

  useInterval(() => {
    const countUpTimer = getUpTimer()
    // 아예 존재안하면 뭘 하기도 이상하니 로컬에서도 초기화하고 끝낸다.
    // 다만 에러상황이라면 경고를 띄우거나 하는 게 좋을 것 같다. onError?
    if (!countUpTimer || !countUpTimer?.version || countUpTimer.version !== VERSION) {
      reset()
      return
    }
    const { lastlyStartedAt, lastlyRecordedTotalSeconds, isRunning: isRunningInStorage } = countUpTimer
    setIsRunning(isRunningInStorage)
    if (!isRunningInStorage) {
      setPassedSeconds(lastlyRecordedTotalSeconds)
      setTimer(countUpTimer)
      return
    }
    const currentTotalSeconds = getCurrentTotalPassedSeconds(lastlyStartedAt, lastlyRecordedTotalSeconds)
    setPassedSeconds(currentTotalSeconds)
    setTimer(countUpTimer)
  }, 1000)

  // 어차피 다음 interval 에 동기화되면서 passedSeconds 와 isRunning 이 셑되겠지만
  // 유저경험을 위해 필요하다면 아래 함수들에서도 해준다.

  function start(skipCallback = false) {
    const timestampNow = new Date().getTime()
    const newTimer = {
      name: timerName,
      id: uuidv4(),
      isRunning: true,
      startedAt: timestampNow,
      lastlyStartedAt: timestampNow,
      lastlyRecordedTotalSeconds: 0,
      version: VERSION,
      ...(makerId && { makerId }),
      ...(makerName && { makerName }),
    }
    setUpTimer(newTimer)
    setIsRunning(true)
    setPassedSeconds(0)
    if (!skipCallback) onStart?.(newTimer)
  }

  function restart(skipCallback = false) {
    const countUpTimer = getUpTimer()
    if (!countUpTimer) return
    const timestampNow = new Date().getTime()
    const updatedTimer = {
      ...countUpTimer,
      isRunning: true,
      lastlyStartedAt: timestampNow,
    }
    setUpTimer(updatedTimer)
    setIsRunning(true)
    setPassedSeconds(updatedTimer.lastlyRecordedTotalSeconds)
    if (!skipCallback) onRestart?.(updatedTimer)
  }

  function pause(skipCallback = false) {
    const countUpTimer = getUpTimer()
    if (!countUpTimer) return
    const { lastlyStartedAt, lastlyRecordedTotalSeconds } = countUpTimer
    const currentTotalSeconds = getCurrentTotalPassedSeconds(lastlyStartedAt, lastlyRecordedTotalSeconds)
    const updatedTimer = {
      ...countUpTimer,
      isRunning: false,
      lastlyRecordedTotalSeconds: currentTotalSeconds,
      lastlyPausedAt: new Date().getTime(),
    }
    setUpTimer(updatedTimer)
    setIsRunning(false)
    setPassedSeconds(currentTotalSeconds)
    if (!skipCallback) onPause?.(updatedTimer)
  }

  function resetTimer(skipCallback = false, lastlyUpdatedTimer: UpTimer | null = null) {
    setUpTimer(null)
    setPassedSeconds(0)
    setIsRunning(false)
    if (!skipCallback && lastlyUpdatedTimer) {
      onReset?.(lastlyUpdatedTimer)
      setTimer(null)
    } else {
      setTimer(null)
    }
  }

  function reset(skipCallback = false) {
    const countUpTimer = getUpTimer()
    if (!countUpTimer) {
      resetTimer()
      return
    }
    const { lastlyStartedAt, lastlyRecordedTotalSeconds } = countUpTimer
    const currentTotalSeconds = getCurrentTotalPassedSeconds(lastlyStartedAt, lastlyRecordedTotalSeconds)
    const updatedTimer = {
      ...countUpTimer,
      isRunning: false,
      lastlyRecordedTotalSeconds: currentTotalSeconds,
      endedAt: new Date().getTime(),
    }
    resetTimer(skipCallback, updatedTimer)
  }

  return {
    ...getTimeFromSeconds(passedSeconds),
    timer,
    start,
    pause,
    reset,
    restart,
    isRunning,
  }
}
