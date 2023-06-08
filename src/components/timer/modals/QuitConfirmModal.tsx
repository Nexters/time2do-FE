interface Props {
  onClose: () => void
  onConfirm: () => void
}

export const QuitConfirmModal = ({ onClose, onConfirm }: Props) => {
  return (
    <div className="w-[24.25rem] rounded-2xl bg-grey-850 px-5 pb-[1.125rem] pt-6">
      <h1 className="mb-4 text-2xl font-bold text-grey-200">타이머를 끝낼까요?</h1>
      <div className="text-grey-400">다 못 끝낸 할 일 목록은 남아있어요.</div>
      <div className="mb-4 text-grey-400">하지만 시간을 저장하고 싶다면 로그인이 필요해요</div>
      <div className="flex w-full justify-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="width-full flex-1 rounded-[0.625rem] bg-grey-800  py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
          끝내기
        </button>
        <button
          onClick={onConfirm}
          type="submit"
          className="width-full flex-1 rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
          로그인
        </button>
      </div>
    </div>
  )
}
