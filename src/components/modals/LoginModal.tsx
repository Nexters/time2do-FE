interface Props {
  onClose: () => void
  onConfirm: () => void
}

export const LoginModal = ({ onClose, onConfirm }: Props) => {
  return (
    <div className="fixed right-1/2 bottom-1/2 w-[24.25rem] translate-x-1/2 translate-y-1/2 rounded-2xl bg-grey-850 px-[1.375rem] pb-[1.125rem] pt-[1.5625rem]">
      <div className="flex flex-col">
        <p className="mb-4 text-[1.375rem] font-bold leading-[140%] text-grey-200">로그인이 필요해요</p>
        <p className="mb-[1.375rem] text-[1rem] font-semibold leading-[1.4375rem]">
          기능을 이용하려면 내 정보가 필요해요
        </p>
        <div className="flex gap-[0.625rem]">
          <button
            className="width-full flex-1 rounded-[0.625rem] bg-grey-800 py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white"
            onClick={onClose}>
            끝내기
          </button>
          <button
            className="width-full flex-1 rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white"
            onClick={onConfirm}>
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}
