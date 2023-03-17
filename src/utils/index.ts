type LocalStorageState =
  | 'countUpTimer'
  | 'countUpTimerRecords'
  | 'countDownTimerRecords'
  | 'countDownTimer'
  | 'user'
  | 'todos'

export const getLocalStorageState = (key: LocalStorageState, defaultValue: any) => {
  return typeof defaultValue === 'string' ? JSON.parse(localStorage.getItem(key) ?? defaultValue) : defaultValue
}
