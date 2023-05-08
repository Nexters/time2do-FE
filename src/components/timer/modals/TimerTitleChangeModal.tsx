import { useState } from 'react'

interface TimerTitleChangeModalProps {
  name: string
  onClose: () => void
  onSubmit: (name: string) => void
}

export const TimerTitleChangeModal = ({ name, onClose, onSubmit }: TimerTitleChangeModalProps) => {
  const [timerTitle, setTimerTitle] = useState(name)
  return (
    <div className="w-[24.25rem] rounded-2xl bg-grey-850 px-5 pb-[1.125rem] pt-6">
      <form
        className="flex flex-col"
        onSubmit={e => {
          e.preventDefault()
          onSubmit(timerTitle)
          onClose()
        }}>
        <label htmlFor="nickname" className="mb-[0.625rem] text-[0.875rem] font-bold leading-[0.875rem] text-grey-300">
          타이머 이름
        </label>
        <input
          value={timerTitle}
          onChange={e => setTimerTitle(e.target.value)}
          type="text"
          className="mb-6 rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 px-[0.8125rem] pt-[1.1875rem] pb-[1.25rem] text-[1.125rem] font-medium leading-[1.3125rem] text-grey-300 focus:border-primary"
          autoFocus
          maxLength={15}
        />
        <div className="flex w-full justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="width-full flex-1 rounded-[0.625rem] bg-grey-800  py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
            닫기
          </button>
          <button
            type="submit"
            className="width-full flex-1 rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
            수정완료
          </button>
        </div>
      </form>
    </div>
  )
}
