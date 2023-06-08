interface Props {
  onClose: () => void
}

export const AbuseAlertModal = ({ onClose }: Props) => {
  return (
    <div className="w-[24.25rem] rounded-2xl bg-grey-850 px-5 pb-[1.125rem] pt-6">
      <h1 className="mb-4 text-center text-2xl font-bold text-grey-200">
        24시간 경과로 <br />
        타이머를 강제종료합니다.
      </h1>
      <button
        type="button"
        onClick={onClose}
        className="btn-primary w-full rounded-[0.625rem] py-4 text-[1.25rem] font-semibold leading-[1.5rem]">
        닫기
      </button>
    </div>
  )
}
