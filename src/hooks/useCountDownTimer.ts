import { useRef, useState } from 'react'
import { useInterval } from 'react-use'

const DEFAULT_INITIALLY_SET_SECONDS = 300
const DEFAULT_DELAY_IN_MILLISECONDS = 1000

const HOURS_PER_DAY = 24
const MINUTES_PER_HOUR = 60
const SECONDS_PER_MINUTE = 60
const SECONDS_PER_DAY = SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR
const MILLISECONDS_PER_SECOND = 1000

function getTimeFromSeconds(secondsRemained: number) {
  const totalSeconds = Math.ceil(secondsRemained)
  const days = Math.floor(totalSeconds / SECONDS_PER_DAY)
  const hours = Math.floor((totalSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR)
  const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
  const seconds = Math.floor(totalSeconds % SECONDS_PER_MINUTE)

  return {
    seconds,
    minutes,
    hours,
    days,
  }
}

function getSecondsRemained(expirationTimestamp: number, shouldRound: boolean) {
  const now = new Date().getTime()
  const milliSecondsDistance = expirationTimestamp - now
  if (milliSecondsDistance > 0) {
    const val = milliSecondsDistance / 1000
    return shouldRound ? Math.round(val) : val
  }
  return 0
}

function getDelayForNextInterval(expirationTimestamp: number) {
  const secondsRemained = getSecondsRemained(expirationTimestamp)
  const milliSecondsRemaind = Math.floor((secondsRemained - Math.floor(secondsRemained)) * MILLISECONDS_PER_SECOND)
  return milliSecondsRemaind > 0 ? milliSecondsRemaind : DEFAULT_DELAY_IN_MILLISECONDS
}

interface Props {
  initiallySetSeconds: number
  onExpire: Function
  autoStart?: boolean
}

export function useTimer({ onExpire, initiallySetSeconds = DEFAULT_INITIALLY_SET_SECONDS, autoStart = false }: Props) {
  const expirationTimestampRef = useRef(new Date().getTime() + initiallySetSeconds * MILLISECONDS_PER_SECOND)
  const [displayingSeconds, setDisplayingSeconds] = useState<number>(getSecondsRemained(expirationTimestampRef.current))
  const [delay, setDelay] = useState<number | null>(autoStart ? getDelayForNextInterval(initiallySetSeconds) : null)

  function handleExpiration() {
    setDelay(null)
    onExpire?.()
  }

  function start(initiallySetSeconds: number) {
    const expirationTimestamp = new Date().getTime() + initiallySetSeconds * MILLISECONDS_PER_SECOND
    expirationTimestampRef.current = expirationTimestamp
    setDelay(getDelayForNextInterval(expirationTimestamp))
    setDisplayingSeconds(getSecondsRemained(expirationTimestamp))
  }

  function stop() {
    setDelay(null)
  }

  useInterval(() => {
    if (delay !== DEFAULT_DELAY_IN_MILLISECONDS) setDelay(DEFAULT_DELAY_IN_MILLISECONDS)
    const secondsRemained = getSecondsRemained(expirationTimestampRef.current)
    setDisplayingSeconds(secondsRemained)
    if (secondsRemained <= 0) handleExpiration()
  }, delay)

  return {
    ...getTimeFromSeconds(displayingSeconds),
    start,
    stop,
  }
}
