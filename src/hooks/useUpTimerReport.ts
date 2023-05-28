import { db } from '@/models/db'
import { getFormattedStringFromSeconds, getTimeFromSeconds } from '@/utils'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { UpTimerReport } from '@/types'

export const useUpTimerReport = () => {
  const upTimerList = useLiveQuery(() => db.upTimers.toArray())

  const { totalSeconds, totalDurationFormattedString, timersAndAggregationAtDates } = useMemo(() => {
    const { totalSeconds, timersAndAggregationAtDates } = (upTimerList ?? []).reduce<UpTimerReport>(
      (acc, cur) => {
        const totalSeconds = acc.totalSeconds + cur.lastlyRecordedTotalSeconds
        const formattedDate = format(new Date(cur.startedAt), 'yyyy-MM-dd')
        const { timers, aggregation } = acc.timersAndAggregationAtDates[formattedDate] ?? {
          timers: [],
          aggregation: { totalSeconds: 0 },
        }
        const updatedTimersAtTargetDate = [...timers, cur]
        const updatedAggregationAtTargetDate = {
          ...aggregation,
          totalSeconds: aggregation.totalSeconds + cur.lastlyRecordedTotalSeconds,
          ...getTimeFromSeconds(aggregation.totalSeconds + cur.lastlyRecordedTotalSeconds),
        }
        const updatedTimersAtDate = {
          ...acc.timersAndAggregationAtDates,
          [formattedDate]: {
            timers: updatedTimersAtTargetDate,
            aggregation: updatedAggregationAtTargetDate,
          },
        }
        return {
          ...acc,
          totalSeconds,
          timersAndAggregationAtDates: updatedTimersAtDate,
        }
      },
      { totalSeconds: 0, timersAndAggregationAtDates: {} },
    )

    console.log(totalSeconds ?? 0, '계산됨')

    const totalDurationFormattedString = getFormattedStringFromSeconds(totalSeconds ?? 0)

    return {
      totalSeconds,
      totalDurationFormattedString,
      timersAndAggregationAtDates,
    }
  }, [upTimerList?.length])

  return {
    totalSeconds,
    totalDurationFormattedString,
    timersAndAggregationAtDates,
  }
}
