import { useState } from 'react'
import Header from '../components/Header'
import ReportCalendar from '../components/ReportCalendar'
import { TodoList } from '../components/TodoList'
import profileImageUrl from '../assets/svg/Profile.svg'
import profileIconUrl from '../assets/svg/ProfileIcon.svg'
import editIconUrl from '../assets/svg/Edit.svg'
import TimerMakeModal from '../components/TimerMakeModal'
import closeIconUrl from '../assets/svg/Close.svg'

export function Profile() {
  const [modalVisible, setModalVisible] = useState(false)

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const nicknameSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <div className="bg-grey-1000">
        <div>
          <Header title="레포트" />
          <div className="flex items-center px-[1.25rem] pb-4">
            <img src={profileImageUrl} alt="프로필" />
            <p className="ml-[0.9375rem] mr-[0.625rem] text-[1.4375rem] font-semibold text-grey-200">맑눈광타이어</p>
            <button className="border-none bg-none" onClick={openModal}>
              <img src={editIconUrl} alt="수정" />
            </button>
          </div>
        </div>
        <div className="h-2 bg-grey-900" />
        <div className="py-[1.625rem]">
          <ReportCalendar />
        </div>
        <div className="py-7 px-6">
          <TodoList title="완료한 할 일 목록" readonly />
        </div>
        <div className="py-7 px-6">
          <p className="mb-4 text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">참여한 그룹 타이머</p>
          <div className="rounded-[0.625rem] bg-grey-900 px-4 py-4">
            <div className="mb-1 flex items-center">
              <div className="rounded-3xl bg-grey-1000 px-2 py-[0.3125rem] text-[0.9375rem] font-semibold leading-[1.125rem] text-grey-200 backdrop-blur-[7.5px]">
                #UX디자인
              </div>
              <p className="pl-[0.375rem] text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">
                오늘 무조건 다 끝내본다!!
              </p>
            </div>
            <div className="flex items-center text-[1.0625rem] font-bold leading-[1.25rem] text-grey-400">
              <img src={profileIconUrl} alt="인원수" />
              <span className="pl-[0.125rem]">5</span>
              <span className="pl-[0.375rem]">오후 2시</span>
            </div>
            <div className="pr-[0.625rem] text-right text-[1.875rem] font-bold leading-[2.25rem] text-grey-200">
              <span>3시간</span>
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <TimerMakeModal closePortal={closeModal}>
          <div className="fixed right-1/2 bottom-1/2 w-[24.25rem] translate-x-1/2 translate-y-1/2 rounded-2xl bg-grey-850 px-[0.875rem] pb-[1.125rem] pt-[2.9375rem]">
            <div className="absolute right-[0.875rem] top-[0.875rem]">
              <button>
                <img src={closeIconUrl} alt="닫기" onClick={closeModal} />
              </button>
            </div>
            <form className="flex flex-col" onSubmit={nicknameSubmitHandler}>
              <label
                htmlFor="nickname"
                className="mb-[0.625rem] text-[0.875rem] font-bold leading-[0.875rem] text-grey-300">
                닉네임 변경
              </label>
              <input
                type="text"
                id="nickname"
                className="mb-6 rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 px-[0.8125rem] pt-[1.1875rem] pb-[1.25rem] text-[1.125rem] font-medium leading-[1.3125rem] text-grey-300"
                autoFocus
              />
              <button className="width-full rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
                완료
              </button>
            </form>
          </div>
        </TimerMakeModal>
      )}
      <div id="root-modal" className="absolute left-0 top-0" />
    </>
  )
}
