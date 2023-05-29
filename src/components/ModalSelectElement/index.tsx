import React, { useEffect, useState } from 'react'

interface ModalSelectElementProps {
  content: number | string
  data: boolean | number | Date
  setData: React.Dispatch<React.SetStateAction<any>>

  isMinute?: boolean
}
const ModalSelectElement = ({ content, data, setData, isMinute = false }: ModalSelectElementProps) => {
  let contentData
  const [select, setSelect] = useState(false)
  const dataHandling = () => {
    if (typeof data === 'boolean') {
      return setData(content !== '오전')
    } else {
      return setData(content)
    }
  }

  useEffect(() => {
    if (typeof data === 'boolean') {
      contentData = content !== '오전'
      setSelect(data === contentData)
    } else {
      contentData = content
      setSelect((contentData === 12 && data === 0) || data === contentData)
    }
  }, [data])

  return (
    <div
      className={`${
        select ? 'bg-primary text-white' : 'bg-grey-800 text-grey-600'
      } p-autos flex h-full w-full items-center rounded-[0.625rem] text-center`}
      onClick={() => {
        dataHandling()
      }}>
      <label className="w-full">{isMinute ? String(content).padStart(2, '0') : content}</label>
    </div>
  )
}

interface CalendarElementProps extends ModalSelectElementProps {
  data: Date
  timeInfo: any
}
// eslint-disable-next-line react/display-name
ModalSelectElement.CalenderElement = ({ content, data, setData, timeInfo }: CalendarElementProps) => {
  const [select, setSelect] = useState(false)
  const [isPrev, setIsPrev] = useState(false)

  const dataHandling = () => {
    if (isPrev) {
      return null
    }
    return setData(new Date(timeInfo[0], timeInfo[1], timeInfo[2], data.getHours(), data.getMinutes()))
  }

  useEffect(() => {
    const nowData = new Date(data.getFullYear(), data.getMonth(), data.getDate(), data.getHours(), data.getMinutes())
    const elementData = new Date(timeInfo[0], timeInfo[1], timeInfo[2], data.getHours(), data.getMinutes())
    setSelect(nowData.valueOf() === elementData.valueOf())
    const nowDate = new Date()
    nowDate.setHours(0, 0, 0, 0)
    setIsPrev(elementData < nowDate)
  }, [data])

  return content !== ' ' ? (
    <div
      className={`${
        isPrev
          ? 'cursor-default bg-grey-1000 text-grey-800'
          : select
          ? 'bg-primary text-white'
          : 'bg-grey-900 text-grey-600'
      } p-autos flex h-full w-full items-center rounded-[0.625rem] text-center`}
      onClick={dataHandling}>
      <label className={`w-full ${isPrev ? `cursor-default` : `cursor-pointer`}`}>{content}</label>
    </div>
  ) : (
    <div></div>
  )
}

export default ModalSelectElement
