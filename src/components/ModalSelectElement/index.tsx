import React, { useEffect, useState } from 'react'

interface Props {
  content: number | string
  data: boolean | number
  setData: React.Dispatch<React.SetStateAction<any>>

  isMinute?: boolean
}
const ModalSelectElement = ({ content, data, setData, isMinute = false }: Props) => {
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
    } else {
      contentData = content
    }
    setSelect(data === contentData)
  }, [data])

  return (
    <div
      className={`${
        select ? 'bg-primary text-[#FFFFFF]' : 'bg-[#232B38] text-[#6B7684]'
      } p-autos flex h-full w-full items-center rounded-[10px] text-center`}
      onClick={() => {
        dataHandling()
      }}>
      <label className={'w-full'}>{isMinute ? String(content).padStart(2, '0') : content}</label>
    </div>
  )
}

export default ModalSelectElement
