import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import ModalSelectElement from '../ModalSelectElement'
import { createPortal } from 'react-dom'

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

TimerMakeModal.StartDatePicker = () => {
  return (
    <div
      className={
        'fixed right-1/2 bottom-1/2  w-[390px] translate-x-1/2 translate-y-1/2 rounded-2xl bg-[#191F28] px-[22px] py-6'
      }>
      <button className={'h-15 btn w-full border-none bg-[#333D4B]'}>수정완료</button>
    </div>
  )
}

interface StartTimePickerProps {
  startTime: Date
  setStartTime: React.Dispatch<React.SetStateAction<Date>>
  modalClose: any
}

TimerMakeModal.StartTimePicker = ({ startTime, setStartTime, modalClose }: StartTimePickerProps) => {
  const [dayTime, setDayTime] = useState(false)
  const [hour, setHour] = useState(3)
  const [minute, setMinute] = useState(30)

  const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

  const handleOnClick = () => {
    console.log(startTime)
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
          <span className={'text-smㄷ font-bold text-[#B0B8C1]'}>오전/오후</span>
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
        <div className={'flex grid w-full grid-cols-6 gap-2 text-lg'}>
          {times.map(time => {
            return (
              <div className={'text- mr-2 h-[51px] w-[51px] text-[22px] font-semibold'}>
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
        <div className={'flex grid w-full grid-cols-6 gap-2 text-lg text-[22px] font-semibold'}>
          {minutes.map(min => {
            return (
              <div className={'mr-2 h-[51px] w-[51px]'}>
                <ModalSelectElement content={min} data={minute} setData={setMinute} isMinute />
              </div>
            )
          })}
        </div>
      </div>

      <button className={'h-15 btn w-full border-none bg-[#333D4B]'} onClick={handleOnClick}>
        수정완료
      </button>
    </div>
  )
}

export default TimerMakeModal
