import { useState } from 'react'
import ModalSelectElement from '../ModalSelectElement'

const TimerMakeModal = () => {
  return <div>달력</div>
}

TimerMakeModal.StartTimePicker = () => {
  const [dayTime, setDayTime] = useState(false)
  const [hour, setHour] = useState(3)
  const [minute, setMinute] = useState(0)

  const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

  return (
    <div className={'w-[390px] bg-[#191F28] p-[22px]'}>
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
          {mins.map(min => {
            return (
              <div className={'mr-2 h-[51px] w-[51px]'}>
                <ModalSelectElement content={min} data={minute} setData={setMinute} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TimerMakeModal
