const DEFAULT_INITIALLY_SET_SECONDS = 300
const DEFAULT_DELAY_IN_MILLISECONDS = 1000

const HOURS_PER_DAY = 24
const MINUTES_PER_HOUR = 60
const SECONDS_PER_MINUTE = 60
const SECONDS_PER_DAY = SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR
const MILLISECONDS_PER_SECOND = 1000

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

export function getSecondsFromExpiry(expirationTimestamp: number, shouldRound: boolean) {
  const now = new Date().getTime()
  const milliSecondsDistance = expirationTimestamp - now
  if (milliSecondsDistance > 0) {
    const val = milliSecondsDistance / 1000
    return shouldRound ? Math.round(val) : val
  }
  return 0
}

export function getSecondsFromPrevTime(prevTime: number, shouldRound: boolean) {
  const now = new Date().getTime()
  const milliSecondsDistance = now - prevTime
  if (milliSecondsDistance > 0) {
    const val = milliSecondsDistance / 1000
    return shouldRound ? Math.round(val) : val
  }
  return 0
}

export function getSecondsFromTimeNow() {
  const now = new Date()
  const currentTimestamp = now.getTime()
  const offset = now.getTimezoneOffset() * 60
  return currentTimestamp / 1000 - offset
}

export function getFormattedTimeFromSeconds(totalSeconds: number, format: '12-hour' | '24-hour' = '24-hour') {
  const { seconds: secondsValue, minutes, hours } = getTimeFromSeconds(totalSeconds)
  let ampm = ''
  let hoursValue = hours

  if (format === '12-hour') {
    ampm = hours >= 12 ? 'pm' : 'am'
    hoursValue = hours % 12
  }

  return {
    seconds: secondsValue,
    minutes,
    hours: hoursValue,
    ampm,
  }
}
