import { atom, AtomEffect } from 'recoil'
import type { Timer, TimeRecord, Todo, User } from '../types'
import { defaultCountDownTimer, defaultCountUpTimer, TimerTypes } from '../consts'

const localStorageEffect =
  (key: string): AtomEffect<any> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

/** 크롬스토리지 연동하는 atomEffect 인데, 일단은 사용하지 않을 것 같아서 주석처리해놓음 */
// const syncStorageEffect =
//   (targetKey: string): AtomEffect<any> =>
//   ({ setSelf, onSet, trigger }) => {
//     console.log('TEST')
//     if (!window?.chrome?.storage) return
//     const loadStorage = async () => {
//       const savedValue = await chrome?.storage.local.get([targetKey]).then(result => result?.[targetKey])
//       console.log(savedValue, targetKey)
//       if (savedValue != null) {
//         setSelf(savedValue)
//       }
//     }
//     // Initialize atom value to the remote storage state
//     if (trigger === 'get') {
//       loadStorage()
//     }

//     onSet((newValue, _, _isReset) => {
//       console.log(newValue, '***', targetKey)
//       if (!window?.chrome?.storage) return
//       window?.chrome?.storage.local.set({
//         [targetKey]: newValue,
//       })
//     })

// chrome.storage.onChanged.addListener((changes, _namespace) => {
//   for (const [key, { oldValue: _oldTodos, newValue: newTodos }] of Object.entries(changes)) {
//     if (key === targetKey) {
//       setSelf(newTodos)
//     }
//   }
// })

// // Subscribe to local changes and update the server value
// onSet((todos: Todo[]) => {
//   chrome.storage.local.set({
//     todos,
//   })
// })

// Cleanup remote storage subscription
// return () => {
//   myRemoteStorage.onChange(userID, null)
// }
// }

export const todosAtom = atom<Todo[]>({
  key: 'todosAtom',
  default: [],
  effects: [localStorageEffect('todos')],
})

export const countUpTimerRecordsAtom = atom<TimeRecord[]>({
  key: 'countUpTimerRecordsAtom',
  default: [],
  effects: [localStorageEffect('countUpTimerRecords')],
})

export const countUpTimerAtom = atom<Timer>({
  key: 'countUpTimerAtom',
  default: defaultCountUpTimer,
  effects: [localStorageEffect('countUpTimer')],
})

export const countDownTimerAtom = atom<Timer>({
  key: 'countDownTimerAtom',
  default: defaultCountDownTimer,
  effects: [localStorageEffect('countDownTimer')],
})

export const countDownTimerRecordsAtom = atom<TimeRecord[]>({
  key: 'countDownTimerRecordsAtom',
  default: [],
  effects: [localStorageEffect('countDownTimerRecords')],
})

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: null,
  effects: [localStorageEffect('user')],
})
