import { SECONDS_PER_DAY, SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from '../../consts/time'

export function getPassedSecondsFromPrevTime(prevTime: number, shouldRound: boolean) {
  const now = new Date().getTime()
  const milliSecondsDistance = now - prevTime
  if (milliSecondsDistance > 0) {
    const secondsDistance = milliSecondsDistance / 1000
    return shouldRound ? Math.round(secondsDistance) : secondsDistance
  }
  return 0
}

export function getTimeFromSeconds(secondsRemained: number) {
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
