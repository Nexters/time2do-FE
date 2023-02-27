import CancelIcon from '../../../assets/svg/CancelIcon.svg'

const TagBox = ({ tagName, deleteTag }: { tagName: string; deleteTag: any }) => {
  const onDeleteTag = () => {
    deleteTag(tagName)
  }
  return (
    <div className="mr-2 mt-3.5 flex h-11 items-center rounded-[0.625rem] border-[1px] border-grey-800 bg-primary px-2.5 hover:bg-primary-focus">
      <span className="mr-2 flex-1">{tagName}</span>
      <div className="h-4 w-4">
        <img src={CancelIcon} alt="태그 삭제" onClick={onDeleteTag} />
      </div>
    </div>
  )
}

export default TagBox
