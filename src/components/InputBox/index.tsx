import { useEffect, useState } from 'react'
import TimerMakeModal from '../TimerMakeModal'
import { useFormContext } from 'react-hook-form'
import TagBox from './_fragment/TagBox'
import { format, formatISO } from 'date-fns'
import ModalPortal from '../ModalPortal'
import { cls } from '../../utils/cls'

interface Props {
  InputBoxName: string
  placeHolder: string
  required?: boolean
  type?: string
  registerName?: string
  changeEvent?: any
  errorMessage?: string
}

const InputBox = ({
  required = true,
  type = 'text',
  registerName = 'name',
  InputBoxName,
  placeHolder,
  errorMessage,
}: Props) => {
  const { register } = useFormContext()

  return (
    <div className="h-min text-grey-300 focus-within:text-primary">
      <label className="label">
        <span className="text-sm font-bold">
          {InputBoxName}
          <span className="text-primary">{required && '*'}</span>
        </span>
      </label>
      <div className="mb-8">
        <input
          className={cls(
            'input h-[60px] w-full border-grey-800 bg-grey-900 text-lg text-grey-300 caret-primary ring-0 placeholder:text-grey-700 focus:border-primary focus:bg-[#786DFF1A] focus:outline-none focus:ring-0',
            errorMessage ? 'border-accent' : '',
          )}
          type={type}
          placeholder={placeHolder}
          required={required}
          maxLength={15}
          {...register(registerName)}
        />
        <p className="mt-[0.625rem] text-left text-accent">{errorMessage}</p>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/display-name
InputBox.TagSelect = ({ required = true, InputBoxName, placeHolder }: Props) => {
  const [tags, setTags] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const { register, setValue } = useFormContext()

  const insertTag = async () => {
    if (tags.length >= 1 || !input) {
      setInput('')
    } else {
      setTags([...tags, input.trim()])
      setInput('')
    }
    return null
  }

  useEffect(() => {
    setValue('tag', tags.join('.'))
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
      e.preventDefault()
      insertTag()
    }
  }

  return (
    <>
      <input type="hidden" {...register('tag')} />
      <div className="mb-8 h-min">
        <div className="text-grey-300 focus-within:text-primary">
          <label className="label">
            <span className="text-sm font-bold">
              {InputBoxName}
              <span className="text-primary">{required && '*'}</span>
            </span>
          </label>
          <div className="flex h-[60px] w-full items-center rounded-[10px] border-[1px] border-grey-800 bg-grey-900 text-grey-300 focus-within:border-primary focus-within:bg-[#786DFF1A] focus:ring-0">
            <input
              className="input mr-3 flex-1 bg-grey-900 bg-transparent text-display6 font-medium outline-0
              ring-0 placeholder:text-grey-700 focus:border-none focus:outline-0 focus:ring-0"
              type="text"
              placeholder={placeHolder}
              value={input}
              onChange={e => onChange(e)}
              onKeyPress={e => onKeyPress(e)}
            />
            <button
              className="flex-0 p-x-[10px] mr-3 h-[40px] w-[52px] rounded-[6px] bg-primary text-lg font-medium text-grey-200"
              type="button"
              onClick={insertTag}>
              추가
            </button>
          </div>
        </div>
        <div className="flex">
          {tags.map(tag => {
            return <TagBox key={tag} tagName={tag} deleteTag={deleteTag} />
          })}
        </div>
      </div>
    </>
  )
}

// eslint-disable-next-line react/display-name
InputBox.TargetTimeSet = ({ InputBoxName, startTime }: { InputBoxName: string; startTime: Date }) => {
  const hourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const minutesList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  const { register, setValue } = useFormContext()

  const [hour, setHour] = useState('1')
  const [minute, setMinute] = useState('0')

  const handleHourSelect = (e: any) => {
    setHour(e.target.value)
  }

  const handleMinuteSelect = (e: any) => {
    setMinute(e.target.value)
  }

  useEffect(() => {
    const endTime = new Date(startTime)
    endTime.setHours(endTime.getHours() + parseInt(hour))
    endTime.setMinutes(endTime.getMinutes() + parseInt(minute))
    setValue('endTime', formatISO(endTime))
  }, [hour, minute])

  return (
    <>
      <input type="hidden" {...register('endTime')} />
      <div className="mb-8 h-min">
        <label className="label">
          <span className="label-text text-sm font-bold text-gray-300 ">
            {InputBoxName} <span className="text-primary">*</span>
          </span>
        </label>
        <div className="flex h-[60px] w-full">
          <select
            className="select mr-[10px] h-full w-full flex-1 border-grey-800 bg-grey-900 text-display6 font-medium"
            onChange={handleHourSelect}>
            {hourList.map((time, index) => {
              return (
                <option key={index} value={time}>
                  {time}시간
                </option>
              )
            })}
          </select>
          <select
            className="select h-full w-full flex-1 border-grey-800 bg-grey-900 text-display6 font-medium"
            onChange={handleMinuteSelect}>
            {minutesList.map((time, index) => {
              return (
                <option key={index} value={time}>
                  {String(time).padStart(2, '0')}분
                </option>
              )
            })}
          </select>
        </div>
      </div>
    </>
  )
}

interface StartTimeSetProps {
  InputBoxName: string
  startTime: Date
  setStartTime: React.Dispatch<React.SetStateAction<Date>>
}

// eslint-disable-next-line react/display-name
InputBox.StartTimeSet = ({ InputBoxName, startTime, setStartTime }: StartTimeSetProps) => {
  const [modalState, setModalState] = useState<'date' | 'time'>('date')
  const [modalVisible, setModalVisible] = useState(false)

  const { register, setValue } = useFormContext()

  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

  const modalOpen = () => {
    return setModalVisible(true)
  }
  const modalClose = () => {
    return setModalVisible(false)
  }

  useEffect(() => {
    const nowTime = new Date()
    const nowMinute = nowTime.getMinutes()
    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
    const timeIndex = Math.ceil(nowMinute / 5) >= minutes.length ? 0 : Math.ceil(nowMinute / 5)
    if (timeIndex === 0) {
      startTime.setHours(nowTime.getHours() + 1)
    }
    startTime.setMinutes(minutes[timeIndex])
  }, [])
  useEffect(() => {
    setValue('startTime', formatISO(startTime))
  }, [startTime])

  return (
    <>
      <input type="hidden" {...register('startTime')} />
      <div id="root-modal" className="absolute left-0 top-0"></div>
      <div className="mb-8 mb-[6.25rem] h-min">
        <label className="label">
          <span className="label-text text-sm font-bold text-gray-300">
            {InputBoxName}
            <span className="text-primary">*</span>
          </span>
        </label>
        <div className="h-[7.5rem] overflow-hidden rounded-[10px] bg-grey-900 text-lg font-medium">
          <input
            className="focus-visible:none input h-1/2 w-full rounded-[10px] border-grey-800 bg-grey-900 text-display6 focus:outline-none"
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
              className="focus-visible:none input h-1/2 w-full rounded-[10px] border-grey-800 bg-grey-900 text-display6 focus:outline-none"
              value={`${startTime.getHours() < 12 ? '오전' : '오후'} ${
                startTime.getHours() === (0 || 12)
                  ? 12
                  : startTime.getHours() < 12
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
          <ModalPortal closePortal={modalClose} isOpened={modalVisible}>
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
          </ModalPortal>
        )}
      </div>
    </>
  )
}

export default InputBox
