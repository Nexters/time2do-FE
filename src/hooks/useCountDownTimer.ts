import { useState } from 'react'
import { useInterval } from 'react-use'
import { getTimeFromSeconds } from '../utils'
import { getSecondsFromExpiry } from './utils'

const DEFAULT_DELAY = 1000
function getDelayFromExpiryTimestamp(expiryTimestamp: number) {
  if (new Date(expiryTimestamp).getTime() <= 0) {
    return null
  }

  const seconds = getSecondsFromExpiry(expiryTimestamp, true)
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000)
  return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY
}

interface Props {
  expiryTimestamp: number
  onExpire: () => void
  autoStart?: boolean
}

export function useTimer({ expiryTimestamp: expiry, onExpire, autoStart = false }: Props) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry)
  const [seconds, setSeconds] = useState(getSecondsFromExpiry(expiryTimestamp, true))
  const [isRunning, setIsRunning] = useState(autoStart)
  const [didStart, setDidStart] = useState(autoStart)
  const [delay, setDelay] = useState(getDelayFromExpiryTimestamp(expiryTimestamp))

  function handleExpire() {
    onExpire()
    setIsRunning(false)
    setDelay(null)
  }

  function pause() {
    setIsRunning(false)
  }

  function restart(newExpiryTimestamp: number, newAutoStart = true) {
    setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp))
    setDidStart(newAutoStart)
    setIsRunning(newAutoStart)
    setExpiryTimestamp(newExpiryTimestamp)
    setSeconds(getSecondsFromExpiry(newExpiryTimestamp, true))
  }

  function resume() {
    const time = new Date()
    time.setMilliseconds(time.getMilliseconds() + seconds * 1000)
    restart(time.getTime())
  }

  function start() {
    if (didStart) {
      setSeconds(getSecondsFromExpiry(expiryTimestamp, true))
      setIsRunning(true)
    } else {
      resume()
    }
  }

  useInterval(
    () => {
      if (delay !== DEFAULT_DELAY) {
        setDelay(DEFAULT_DELAY)
      }
      const secondsValue = getSecondsFromExpiry(expiryTimestamp, true)
      setSeconds(secondsValue)
      if (secondsValue <= 0) {
        handleExpire()
      }
    },
    isRunning ? delay : null,
  )

  return {
    ...getTimeFromSeconds(seconds),
    start,
    pause,
    resume,
    restart,
    isRunning,
  }
}
