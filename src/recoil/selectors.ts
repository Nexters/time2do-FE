import { selectorFamily } from 'recoil'
import { countUpTimerRecordsAtom } from './atoms'

// recoil selector that sums up the total time of all timeRecords
export const totalCountUpTimerSecondsSelector = selectorFamily({
  key: 'totalCountUpTimerSecondsSelector',
  get:
    timerId =>
    ({ get }) => {
      const timeRecords = get(countUpTimerRecordsAtom) ?? []
      const filteredTimeRecords = timeRecords.filter(record => record.timerId === timerId)
      const totalSeconds = filteredTimeRecords.reduce((acc, cur) => {
        const startTime = new Date(cur.startTime).getTime()
        const endTime = cur.endTime ? new Date(cur.endTime).getTime() : new Date().getTime()
        return acc + (endTime - startTime) / 1000
      }, 0)
      return totalSeconds
    },
})
