import { LocalStorageKey, UpTimer } from '../../types'
import { getPassedSecondsFromPrevTime } from '../time'

export const getLocalStorageState = <T>(key: LocalStorageKey, defaultValue: any): T => {
  return JSON.parse(localStorage.getItem(key) ?? defaultValue)
}

export const setLocalStorageState = <T>(key: LocalStorageKey, value: T | null) => {
  if (value === null) {
    localStorage.removeItem(key)
    return
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export function getCurrentTotalPassedSeconds(lastlyStartedAt: number, lastlyRecordedTotalSeconds: number) {
  const passedSecondsFromLastStart = getPassedSecondsFromPrevTime(lastlyStartedAt, true)
  const currentTotalSeconds = passedSecondsFromLastStart + lastlyRecordedTotalSeconds
  return currentTotalSeconds
}

export function getUpTimer() {
  return getLocalStorageState<UpTimer | null>('countUpTimer', null)
}

export function setUpTimer(value: UpTimer | null) {
  setLocalStorageState('countUpTimer', value)
}
