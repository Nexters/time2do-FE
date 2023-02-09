import CancelIcon from '../../../assets/svg/CancelIcon.svg'

const TagBox = ({ tagName, deleteTag }: { tagName: string; deleteTag: any }) => {
  const handleTagDeleteClick = () => {
    deleteTag(tagName)
  }
  return (
    <div className="mr-2 mt-3.5 flex h-10 items-center rounded-[0.625rem] bg-grey-800 px-2.5">
      <span className="mr-2 flex-1">{tagName}</span>
      <div className="h-4 w-4">
        <img src={CancelIcon} alt="태그 삭제" onClick={handleTagDeleteClick} />
      </div>
    </div>
  )
}

export default TagBox
