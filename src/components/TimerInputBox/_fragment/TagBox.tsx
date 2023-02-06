import CancelIcon from '../../../assets/svg/CancelIcon.svg'
import React from 'react'
const TagBox = ({ tagName, deleteTag }: { tagName: string; deleteTag: any }) => {
  const onClickEvent = () => {
    deleteTag(tagName)
  }
  return (
    <div className={'mr-2 flex h-[40px] items-center rounded-[10px] bg-[#333D4B] px-[10px]'}>
      <span className={'mr-2 flex-1'}>{tagName}</span>
      <div className={'h-4 w-4'}>
        <img src={CancelIcon} alt={'태그 삭제'} onClick={onClickEvent} />
      </div>
    </div>
  )
}

export default TagBox
