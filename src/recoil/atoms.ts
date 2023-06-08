import { atom, AtomEffect } from 'recoil'
import type { Timer, TimeRecord, Todo, User } from '../types'
import { v4 as uuid } from 'uuid'
import { defaultCountUpTimer, TimerTypes } from '../consts'

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
  default: {
    name: '오늘 무조건 다 끝내본다!!',
    type: TimerTypes['COUNT_DOWN'],

    // 클라이언트에서만 사용하거나 서버에 동기화할 때 비뀔 수 있는 필드들
    id: new Date().getTime(),
    isRunning: false,
    makerId: 0,
  },
  effects: [localStorageEffect('countDownTimer')],
})

export const userAtom = atom<User>({
  key: 'userAtom',
  default: {
    userName: '이름을 지어주세요',
    id: '',
    onboarding: false,
  },
  effects: [localStorageEffect('user')],
})
