import React, { useEffect, useRef, useState } from 'react'
import ModalSelectElement from '../ModalSelectElement'
import PrevArrow from '../../assets/svg/PrevArrow.svg'
import NextArrow from '../../assets/svg/NextArrow.svg'
import { createPortal } from 'react-dom'
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subDays,
} from 'date-fns'

interface TimerMakeModalProps {
  children: React.ReactNode
  closePortal: any
}
const TimerMakeModal = ({ children, closePortal }: TimerMakeModalProps) => {
  const modalRef = useRef<Element | null>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (document) {
      modalRef.current = document.getElementById('root-modal')
    }
  }, [])

  if (modalRef.current && mounted) {
    return createPortal(
      <div className="h-full w-full bg-gray-700">
        <div className="absolute h-screen w-screen bg-[#000000] opacity-80" role="presentation" onClick={closePortal} />
        {children}
      </div>,
      modalRef.current,
    )
  }
  return null
}

// eslint-disable-next-line react/display-name
TimerMakeModal.StartDatePicker = ({ startTime, setStartTime, modalClose }: StartTimePickerProps) => {
  const [date, setDate] = useState(startTime)

  const days = ['월', '화', '수', '목', '금', '토', '일']

  const movePrevMonth = () => {
    setDate(subMonths(date, 1))
  }

  const moveNextMonth = () => {
    setDate(addMonths(date, 1))
  }

  const handleOnClick = () => {
    setStartTime(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), startTime.getHours(), startTime.getMinutes(), 0),
    )

    modalClose()
  }

  const createDays = () => {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)

    const calendarStart = subDays(startOfWeek(monthStart), -1)
    const calendarEnd = endOfWeek(monthEnd)

    let weekDays: string[][] = []
    const calendarRows = []
    let nowDate = calendarStart

    let formattedDate = ''

    const pushPrevWeekDays = () => {
      const prevWeekStart = addDays(startOfWeek(endOfMonth(subMonths(date, 1))), 1)
      const prevWeekEnd = addDays(endOfWeek(endOfMonth(subMonths(date, 1))), 1)
      let dayIndex = prevWeekStart

      while (dayIndex < prevWeekEnd) {
        formattedDate = dayIndex.getMonth() === date.getMonth() ? format(dayIndex, 'd') : ' '
        weekDays.push([String(dayIndex.getFullYear()), String(dayIndex.getMonth()), formattedDate])
        dayIndex = addDays(dayIndex, 1)
      }
      calendarRows.push(weekDays)
      weekDays = []
    }

    if (nowDate.getDate() === 2 && !calendarRows.length) {
      pushPrevWeekDays()
    }

    while (nowDate <= calendarEnd) {
      for (let i = 0; i < 7; i++) {
        formattedDate = nowDate.getMonth() === date.getMonth() ? format(nowDate, 'd') : ' '

        weekDays.push([String(nowDate.getFullYear()), String(nowDate.getMonth()), formattedDate])
        nowDate = addDays(nowDate, 1)
      }
      calendarRows.push(weekDays)
      weekDays = []
    }
    return calendarRows
  }

  return (
    <div
      className={
        'fixed right-1/2 bottom-1/2  w-[388px] translate-x-1/2 translate-y-1/2 rounded-2xl bg-[#191F28] px-[22px] pb-[18px] pt-[25px]'
      }>
      <div className={'mb-6 mt-[1px]'}>
        <label>
          <span className={'text-[22px] font-bold'}>시작 날짜</span>
        </label>
      </div>
      <div className={'mb-7 flex items-center text-xl font-semibold'}>
        <div className={'w-1/2 text-left '}>
          <span>{`${format(date, 'yyyy')}년 ${format(date, 'M')}월`}</span>
        </div>
        <div className={'flex w-1/2 justify-end'}>
          <button onClick={movePrevMonth}>
            <img src={PrevArrow} alt={'이전 달 이동'} />
          </button>
          <button onClick={moveNextMonth}>
            <img src={NextArrow} alt={'다음 달로 이동'} />{' '}
          </button>
        </div>
      </div>
      <div>
        <div className={'mb-3 w-full'}>
          <div className={'mb-1.5 flex w-full'}>
            {days.map(dayName => {
              return (
                <div key={dayName} className={'flex-1'}>
                  {dayName}
                </div>
              )
            })}
          </div>
          <div className={'mb-6 w-full'}>
            {createDays().map(weeks => {
              return (
                <div className={'mb-2  flex gap-2'}>
                  {weeks.map(days => {
                    return (
                      <div className={'h-[42px] w-[42px] text-[22px] font-semibold'}>
                        <ModalSelectElement.CalenderElement
                          content={days[2]}
                          data={date}
                          setData={setDate}
                          timeInfo={days}
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <button className={'h-15 btn w-full border-none bg-[#333D4B] text-xl font-semibold'} onClick={handleOnClick}>
        수정완료
      </button>
    </div>
  )
}

interface StartTimePickerProps {
  startTime: Date
  setStartTime: React.Dispatch<React.SetStateAction<Date>>
  modalClose: any
}

// eslint-disable-next-line react/display-name
TimerMakeModal.StartTimePicker = ({ startTime, setStartTime, modalClose }: StartTimePickerProps) => {
  const [dayTime, setDayTime] = useState(false)
  const [hour, setHour] = useState(startTime.getHours() > 12 ? startTime.getHours() - 12 : startTime.getHours())
  const [minute, setMinute] = useState(startTime.getMinutes())
  console.log(hour, minute)

  const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

  const handleOnClick = () => {
    setStartTime(
      new Date(
        startTime.getFullYear(),
        startTime.getMonth(),
        startTime.getDate(),
        dayTime ? hour + 12 : hour,
        minute,
        0,
      ),
    )

    modalClose()
  }

  return (
    <div
      className={
        'fixed right-1/2 bottom-1/2  w-[390px] translate-x-1/2 translate-y-1/2 rounded-2xl bg-[#191F28] px-[22px] py-6'
      }>
      <div className={'mb-6'}>
        <label>
          <span className={'text-[22px] font-bold'}>시작 시간</span>
        </label>
      </div>
      <div className={'mb-[22px] w-full text-left'}>
        <label className={'label'}>
          <span className={'text-sm font-bold text-[#B0B8C1]'}>오전/오후</span>
        </label>
        <div className={'flex text-lg'}>
          <div className={'mr-2 h-[60px] w-[168px] flex-1'}>
            <ModalSelectElement content={'오전'} data={dayTime} setData={setDayTime} />
          </div>
          <div className={'h-[60px] w-[168px] flex-1'}>
            <ModalSelectElement content={'오후'} data={dayTime} setData={setDayTime} />
          </div>
        </div>
      </div>
      <div className={'mb-6 w-full text-left'}>
        <label className={'label'}>
          <span className={'text-sm font-bold text-[#B0B8C1]'}>시</span>
        </label>
        <div className={'grid w-full grid-cols-6 gap-2 text-lg'}>
          {times.map(time => {
            return (
              <div key={time} className={'mr-2 h-[51px] w-[51px] text-[22px] font-semibold'}>
                <ModalSelectElement content={time} data={hour} setData={setHour} />
              </div>
            )
          })}
        </div>
      </div>
      <div className={'mb-6 w-full text-left'}>
        <label className={'label'}>
          <span className={'text-sm font-bold text-[#B0B8C1]'}>분</span>
        </label>
        <div className={'grid w-full grid-cols-6 gap-2 text-lg text-[22px] font-semibold'}>
          {minutes.map(min => {
            return (
              <div key={min} className={'mr-2 h-[51px] w-[51px]'}>
                <ModalSelectElement content={min} data={minute} setData={setMinute} isMinute />
              </div>
            )
          })}
        </div>
      </div>

      <button className={'h-15 btn w-full border-none bg-[#333D4B] text-xl font-semibold'} onClick={handleOnClick}>
        수정완료
      </button>
    </div>
  )
}

export default TimerMakeModal
