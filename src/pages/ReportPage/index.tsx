import { format } from 'date-fns'
import { useState } from 'react'
import Header from '@/components/Header'
import ReportCalendar from '@/components/ReportCalendar'
import { TimersAndAggregation } from '@/types'
import { NicknameEdit } from './NicknameEdit'
import { useUpTimerReport } from '@/hooks/useUpTimerReport'
import { getFormattedStringFromSeconds } from '@/utils'
import { TodoList } from '@/components/TodoList'
import bombCharacterImageUrl from '@/assets/images/bombCharacterSingle.png'
import { useTodoList } from '@/hooks/useTodoList'
import { endOfDay, startOfDay } from 'date-fns'

const today = new Date(new Date().toDateString())

export function ReportPage() {
  const { totalDurationFormattedString, timersAndAggregationAtDates } = useUpTimerReport()

  const [selectedDate, setSelectedDate] = useState<Date | null>(today)
  const { todoList } = useTodoList(
    selectedDate
      ? { where: { startTimestamp: selectedDate.getTime(), endTimestamp: endOfDay(selectedDate).getTime() } }
      : undefined,
  )

  const selectedDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''
  const {
    aggregation = {
      totalSeconds: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  }: TimersAndAggregation = timersAndAggregationAtDates[selectedDateString] ?? ({} as TimersAndAggregation)

  const dateClickHandler = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <div className="bg-grey-1000">
        <Header name="레포트" />
        <div className="flex items-center justify-between px-[1.25rem] pb-4">
          <NicknameEdit />
        </div>

        <div className="h-2 bg-grey-900" />

        <div className="py-[1.625rem]">
          <ReportCalendar
            timersAndAggregationAtDates={timersAndAggregationAtDates}
            totalDuration={totalDurationFormattedString ?? '00:00:00'}
            selectedDate={selectedDate}
            onClickDate={dateClickHandler}
          />
        </div>

        {selectedDate && (
          <div className="mb-0 mt-10 px-6">
            <h1 className="text-2xl font-bold">{format(selectedDate, 'yyyy년 M월 d일')}</h1>
            <p className="py-3 text-lg text-grey-200">
              🔥 {getFormattedStringFromSeconds(aggregation.totalSeconds, true)}
            </p>
          </div>
        )}

        {todoList && (
          <div className="my-5 px-6">
            <TodoList name="완료한 할 일 목록" todos={todoList} readonly />
            {todoList.length === 0 && (
              <div className="px-6 py-7 text-center">
                <img src={bombCharacterImageUrl} alt="폭탄이" className="inline-block" />
                <p className="mt-[1.25rem] text-[1.375rem] font-bold text-grey-300">이런! 아무것도 하지 않았군요?</p>
              </div>
            )}
          </div>
        )}

        {/* {groupTimers.length > 0 && (
          <div className="px-6 py-7">
            <p className="mb-4 text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">참여한 그룹 타이머</p>
            {groupTimers.map(groupTimer => (
              <div key={groupTimer.name} className="mb-3 rounded-[0.625rem] bg-[#171D25] px-[0.875rem] py-[0.875rem]">
                <div className="mb-2 flex items-center">
                  <div className="rounded-[0.375rem] bg-primary px-[0.3125rem] py-[0.1875rem] text-[0.9375rem] font-semibold leading-[140%] text-white">
                    #{groupTimer.tag}
                  </div>
                  <p className="pl-[0.5rem] text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">
                    {groupTimer.name}
                  </p>
                </div>
                <div className="flex items-center text-[0.9375rem] font-semibold leading-[140%] text-grey-400">
                  <span>멤버 {groupTimer.participantsCount}명</span>
                  <span className="pl-[0.375rem]">
                    {format(new Date(groupTimer.displayTime), 'a h:mm', { locale: ko })} 종료
                  </span>
                </div>
                <div className="pr-[0.125rem] text-right text-[1.875rem] font-bold leading-[2.25rem] text-grey-200">
                  <span>{getDuration(groupTimer)}</span>
                </div>
              </div>
            ))}
            {groupTimers.length === 0 && <div className="py-12" />}
          </div>
        )} */}
      </div>
    </>
  )
}
