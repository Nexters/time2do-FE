import { atom, AtomEffect } from 'recoil'
import type { Todo } from '../types'

const syncStorageEffect =
  (targetKey: string): AtomEffect<Todo[]> =>
  ({ setSelf, onSet, trigger }) => {
    if (!chrome?.storage) return
    // Initialize atom value to the remote storage state
    if (trigger === 'get') {
      console.log('TEST')
      console.log(chrome.storage.local.get([targetKey]).then(result => result?.[targetKey]))
      // Avoid expensive initialization
      // setSelf(chrome.storage.local.get([targetKey]).then(result => result?.[targetKey])) // Call synchronously to initialize
    }

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
  }

export const todosAtom = atom<Todo[]>({
  key: 'todosAtom',
  default: [],
  effects: [syncStorageEffect('todos')],
})
