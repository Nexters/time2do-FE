import { useCalendar } from '@h6s/calendar'
import { format, getDate, getMonth, getYear, isEqual, isThisYear, isToday } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import ChevronRight from '../../assets/svg/ChevronRight'
import ChevronLeft from '../../assets/svg/ChevronLeft'

const dayColor = ['bg-grey-1000', 'bg-[#282651]', 'bg-[#3E388B]', 'bg-[#554AC5]', 'bg-[#6C5CFF]']
const today = new Date(new Date().toDateString())
const todayYear = getYear(today)
const todayMonth = getMonth(today) + 1

const ReportCalendar: React.FC = () => {
  const { headers, body, view, navigation, cursorDate } = useCalendar()

  const cursorYear = getYear(cursorDate)
  const cursorMonth = getMonth(cursorDate) + 1
  const isEndMonth = cursorYear === todayYear && cursorMonth === todayMonth

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const prevButtonClickHandler = () => {
    navigation.toPrev()
  }

  const nextButtonClickHandler = () => {
    navigation.toNext()
  }

  const dateMouseEnterHandler = (date: Date, enabled: boolean) => {
    if (!enabled) return

    setHoveredDate(date)
  }

  const dateMouseLeaveHandler = (enabled: boolean) => {
    if (!enabled) return

    setHoveredDate(null)
  }

  const dateClickHandler = (date: Date, enabled: boolean) => {
    if (!enabled) return

    setSelectedDate(date)
  }

  useEffect(() => {
    view.setWeekStartsOn(1)
  }, [])

  return (
    <div className="mx-auto my-0 flex max-w-[24.25rem] flex-col gap-[1.25rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[0.3125rem]">
          <button type="button" onClick={prevButtonClickHandler}>
            <ChevronLeft />
          </button>
          <span className="text-[1.4375rem] font-semibold text-grey-200">
            {format(cursorDate, isThisYear(cursorDate) ? 'M월' : 'yy년 M월')}
          </span>
          <button type="button" onClick={nextButtonClickHandler} disabled={isEndMonth}>
            {isEndMonth ? <ChevronRight stroke="#333D4B" /> : <ChevronRight />}
          </button>
        </div>
        <p className="text-[1.25rem] font-semibold text-grey-200">🔥92:22:59 작업중</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-7 gap-1 leading-[1.125rem]">
          {headers.weekDays.map(({ key, value }) => (
            <div key={key} className="font-grey-400 text-center text-[0.9375rem] font-semibold">
              {format(value, 'E', { locale: ko })}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {body.value.map(({ value: days }) =>
            days.map(({ key, value }) => {
              const valueMonth = getMonth(value) + 1
              const isCursorMonth = cursorMonth === valueMonth

              if (isCursorMonth && selectedDate && isEqual(selectedDate, value)) {
                return (
                  <div
                    key={key}
                    className={`relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-[0.625rem] border-2 border-primary bg-grey-1000 text-[0.9375rem] font-semibold leading-[1.125rem] ${
                      isCursorMonth ? 'text-grey-200' : 'text-grey-800'
                    }`}>
                    <div className="flex flex-col gap-2">
                      <span className="relative self-start opacity-60">
                        {getDate(value)}
                        {isToday(value) && (
                          <div className="absolute top-[0.0625rem] right-[-0.25rem] h-1 w-1 rounded-full bg-grey-300" />
                        )}
                      </span>
                      <span>12:30</span>
                    </div>
                  </div>
                )
              }

              if (isCursorMonth && hoveredDate && isEqual(hoveredDate, value)) {
                return (
                  <div
                    key={key}
                    className={`h-[3.25rem] w-[3.25rem] rounded-[0.625rem] ${
                      dayColor[0]
                    } relative flex cursor-pointer items-center justify-center text-[0.9375rem] font-semibold leading-[1.125rem] ${
                      isCursorMonth ? 'text-grey-200' : 'text-grey-800'
                    }`}
                    onMouseLeave={() => dateMouseLeaveHandler(isCursorMonth)}
                    onClick={() => dateClickHandler(value, isCursorMonth)}>
                    <div className="flex flex-col gap-2">
                      <span className="relative self-start opacity-60">
                        {getDate(value)}
                        {isToday(value) && (
                          <div className="absolute top-[0.0625rem] right-[-0.25rem] h-1 w-1 rounded-full bg-grey-300" />
                        )}
                      </span>
                      <span>12:30</span>
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={key}
                  className={`h-[3.25rem] w-[3.25rem] rounded-[0.625rem] ${
                    dayColor[0]
                  } relative flex items-center justify-center text-[1.5625rem] font-semibold ${
                    isCursorMonth ? 'text-grey-300' : 'text-grey-800'
                  }`}
                  onMouseEnter={() => dateMouseEnterHandler(value, isCursorMonth)}>
                  {isToday(value) && (
                    <div className="absolute top-[0.3125rem] left-auto right-auto h-[0.375rem] w-[0.375rem] rounded-full bg-grey-300" />
                  )}
                  {getDate(value)}
                </div>
              )
            }),
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportCalendar
