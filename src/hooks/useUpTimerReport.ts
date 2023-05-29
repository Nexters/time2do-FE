import { db } from '@/models/db'
import { getFormattedStringFromSeconds, getTimeFromSeconds } from '@/utils'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import { endOfDay, format } from 'date-fns'
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

        // endedAt 이 없으면 비정상적인 타이머이므로 스킵
        if (!cur.endedAt) return acc

        const endTimestampOfCurTimerDay = endOfDay(new Date(cur.startedAt)).getTime()
        const hasPassedDay = cur.endedAt > endTimestampOfCurTimerDay
        const totalSecondsToAddAtCurDay = hasPassedDay
          ? Math.round((endTimestampOfCurTimerDay - cur.startedAt) / 1000)
          : cur.lastlyRecordedTotalSeconds
        const residualSecondsForNextDay = hasPassedDay ? cur.lastlyRecordedTotalSeconds - totalSecondsToAddAtCurDay : 0
        const updatedTimersAtTargetDate = [...timers, cur]
        const updatedAggregationAtTargetDate = {
          ...aggregation,
          totalSeconds: aggregation.totalSeconds + totalSecondsToAddAtCurDay,
          ...getTimeFromSeconds(aggregation.totalSeconds + totalSecondsToAddAtCurDay),
        }

        const updatedTimersAtDate = {
          ...acc.timersAndAggregationAtDates,
          [formattedDate]: {
            timers: updatedTimersAtTargetDate,
            aggregation: updatedAggregationAtTargetDate,
          },
        }

        if (residualSecondsForNextDay) {
          const nextDayFormattedDate = format(new Date(cur.endedAt), 'yyyy-MM-dd')
          const { timers, aggregation } = acc.timersAndAggregationAtDates[nextDayFormattedDate] ?? {
            timers: [],
            aggregation: { totalSeconds: 0 },
          }
          const updatedTimersAtNextDay = [...timers, cur]
          const updatedAggregationAtNextDay = {
            ...aggregation,
            totalSeconds: aggregation.totalSeconds + residualSecondsForNextDay,
            ...getTimeFromSeconds(aggregation.totalSeconds + residualSecondsForNextDay),
          }
          const updatedTimersAtDateIncludingNextDay = {
            ...updatedTimersAtDate,
            [nextDayFormattedDate]: {
              timers: updatedTimersAtNextDay,
              aggregation: updatedAggregationAtNextDay,
            },
          }

          return {
            ...acc,
            totalSeconds,
            timersAndAggregationAtDates: updatedTimersAtDateIncludingNextDay,
          }
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
