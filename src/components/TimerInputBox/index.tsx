import React, { useEffect, useState } from 'react'
import TimerMakeModal from '../TimerMakeModal'
import { useFormContext } from 'react-hook-form'
import TagBox from './_fragment/TagBox'

interface Props {
  timerName: string
  placeHolder: string
  required?: boolean
}

const TimerInputBox = ({ required = true, timerName, placeHolder }: Props) => {
  const { register } = useFormContext()
  return (
    <div className={'h-min'}>
      <label className={'label'}>
        <span className={'label-text text-sm font-bold text-gray-400'}>
          {timerName}
          {required && '*'}
        </span>
      </label>
      <input
        className={'input mb-8 h-[60px] w-full bg-[#232B38] text-lg text-[#B0B8C1] placeholder:text-[#4E5968]'}
        type={'text'}
        placeholder={placeHolder}
        required={required}
        maxLength={15}
        {...register('name')}
      />
    </div>
  )
}

// eslint-disable-next-line react/display-name
TimerInputBox.TagSelect = ({ required = true, timerName, placeHolder }: Props) => {
  const [tags, setTags] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const { register, setValue } = useFormContext()

  const insertTag = async () => {
    if (tags.length >= 2 || !input) {
      setInput('')
      return
    } else {
      setTags([...tags, input.trim()])
      setInput('')
    }
  }

  useEffect(() => {
    setValue('tags', tags.join('.'))
  }, [tags])

  const deleteTag = (target: string) => {
    setTags(
      tags.filter(tag => {
        return tag !== target
      }),
    )
  }

  const onChange = (e: any) => {
    setInput(e.target.value)
  }

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      insertTag()
    }
  }

  return (
    <>
      <input type={'hidden'} {...register('tags')} />
      <div className={'mb-8 h-min'}>
        <div className={'mb-[14px]'}>
          <label className={'label'}>
            <span className={'label-text text-sm font-bold text-gray-400 '}>
              {timerName}
              {required && '*'}
            </span>
          </label>
          <div className={' flex h-[60px] w-full items-center rounded-[10px] bg-[#232B38] text-lg text-[#B0B8C1] '}>
            <input
              className={'input mr-3 flex-1 border-none bg-transparent placeholder:text-[#4E5968]'}
              type={'text'}
              placeholder={placeHolder}
              value={input}
              onChange={e => onChange(e)}
              onKeyPress={e => onKeyPress(e)}
            />
            <button
              className={'flex-0 p-x-[10px] mr-3 h-[40px] w-[52px] rounded-[10px] bg-[#333D4B] text-lg font-medium'}
              type={'button'}
              onClick={insertTag}>
              추가
            </button>
          </div>
        </div>
        <div className={'flex'}>
          {tags.map(tag => {
            return <TagBox key={tag} tagName={tag} deleteTag={deleteTag} />
          })}
        </div>
      </div>
    </>
  )
}

// eslint-disable-next-line react/display-name
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
              <option key={index} value={time}>
                {String(time).padStart(2, '0')}분
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/display-name
TimerInputBox.StartTimeSet = ({ timerName }: { timerName: string }) => {
  const [modalState, setModalState] = useState<'date' | 'time'>('date')
  const [modalVisible, setModalVisible] = useState(false)
  const [startTime, setStartTime] = useState(new Date())

  const { register, setValue } = useFormContext()

  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

  const modalOpen = () => {
    return setModalVisible(true)
  }
  const modalClose = () => {
    return setModalVisible(false)
  }

  useEffect(() => {
    setValue('setTime', startTime)
  }, [startTime])

  return (
    <>
      <input type={'hidden'} {...register('setTime')} />
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
            value={`${startTime.getFullYear()}년 ${startTime.getMonth() + 1}월 ${startTime.getDate()}일 ${
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
            {modalState === 'date' ? (
              <TimerMakeModal.StartDatePicker
                startTime={startTime}
                setStartTime={setStartTime}
                modalClose={modalClose}
              />
            ) : (
              <TimerMakeModal.StartTimePicker
                startTime={startTime}
                setStartTime={setStartTime}
                modalClose={modalClose}
              />
            )}
          </TimerMakeModal>
        )}
      </div>
    </>
  )
}

export default TimerInputBox
