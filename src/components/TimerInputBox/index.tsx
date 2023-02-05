import React, { useState } from 'react'
import TimerMakeModal from '../TimerMakeModal'

interface Props {
  timerName: string
  placeHolder: string
  required?: boolean
}

const TimerInputBox = ({ required = true, timerName, placeHolder }: Props) => {
  return (
    <div className={'h-min'}>
      <label className={'label'}>
        <span className={'label-text text-sm font-bold text-gray-400'}>
          {timerName}
          {required && '*'}
        </span>
      </label>
      <input
        className={'input-bordered input mb-8 w-full bg-[#232B38] text-lg text-[#B0B8C1] placeholder:text-[#4E5968]'}
        type={'text'}
        placeholder={placeHolder}
        required={required}
        maxLength={15}
      />
    </div>
  )
}

TimerInputBox.TagSelect = ({ required = true, timerName, placeHolder }: Props) => {
  return (
    <div className={'h-min'}>
      <label className={'label'}>
        <span className={'label-text text-sm font-bold text-gray-400 '}>
          {timerName}
          {required && '*'}
        </span>
      </label>
      <input
        className={'input-bordered input mb-8 w-full bg-[#232B38] text-lg text-[#B0B8C1] placeholder:text-[#4E5968]'}
        type={'text'}
        placeholder={placeHolder}
        required={required}
      />
    </div>
  )
}

TimerInputBox.TargetTimeSet = ({ timerName }: { timerName: string }) => {
  const hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const min = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  return (
    <div className={'mb-8 h-min'}>
      <label className={'label'}>
        <span className={'label-text text-sm font-bold text-gray-400 '}>
          {timerName}
          {'*'}
        </span>
      </label>
      <div className={'flex w-full'}>
        <select className="select mr-[10px] w-full flex-1 bg-[#232B38]">
          {hour.map((time, index) => {
            return (
              <option key={index} value={time}>
                {time}
                시간
              </option>
            )
          })}
        </select>
        <select className="select-bordered select w-full flex-1 bg-[#232B38]">
          {min.map((time, index) => {
            return (
              <option key={index} value={time} selected={time === 3}>
                {String(time).padStart(2, '0')}분
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

TimerInputBox.StartTimeSet = ({ timerName }: { timerName: string }) => {
  const [modalState, setModalState] = useState<'date' | 'time'>('date')
  const [modalVisible, setModalVisible] = useState(false)

  const [startTime, setStartTime] = useState(new Date())
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

  const modalOpen = () => {
    console.log('open')
    console.log(modalState)
    return setModalVisible(true)
  }
  const modalClose = () => {
    console.log(modalState)
    return setModalVisible(false)
  }

  return (
    <>
      <div id={'root-modal'} className={'absolute left-0 top-0'}></div>
      <div className={'mb-8 h-min'}>
        <label className={'label'}>
          <span className={'label-text text-sm font-bold text-gray-400 '}>
            {timerName}
            {'*'}
          </span>
        </label>
        <div className={'h-[120px] overflow-hidden rounded-[10px] bg-[#232B38] text-[18px] font-medium'}>
          <input
            className={'focus-visible:none input h-1/2 w-full rounded-[0] bg-[#232B38] focus:outline-none'}
            value={`${startTime.getFullYear()}년 ${startTime.getMonth()}월 ${startTime.getDay()}일 ${
              WEEKDAY[startTime.getDay()]
            }요일`}
            readOnly={true}
            onClick={() => {
              setModalState('date')
              modalOpen()
            }}
          />
          <label>
            <input
              className={'focus-visible:none input h-1/2 w-full rounded-[0] bg-[#232B38] focus:outline-none'}
              value={`${startTime.getHours() < 12 ? '오전' : '오후'} ${
                startTime.getHours() < 12
                  ? `${String(startTime.getHours()).padStart(2, '0')}`
                  : `${String(startTime.getHours() - 12).padStart(2, '0')}`
              } : ${String(startTime.getMinutes()).padStart(2, '0')}`}
              readOnly={true}
              onClick={() => {
                setModalState('time')
                modalOpen()
              }}
            />
          </label>
        </div>
        {modalVisible && (
          <TimerMakeModal closePortal={modalClose}>
            {modalState === 'date' ? <TimerMakeModal.StartDatePicker /> : <TimerMakeModal.StartTimePicker />}
          </TimerMakeModal>
        )}
      </div>
    </>
  )
}

export default TimerInputBox
