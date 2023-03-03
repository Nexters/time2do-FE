type LocalStorageState = 'countUpTimer' | 'countUpTimerRecords' | 'countDownTimer' | 'user' | 'todos'

export const getLocalStorageState = (key: LocalStorageState, defaultValue: any) => {
  return JSON.parse(localStorage.getItem(key) ?? defaultValue)
}
