import { ReportProfileIcon } from '@/assets/svg/ReportProfileIcon'
import ModalPortal from '@/components/ModalPortal'
import { useModal } from '@/hooks/useModal'
import { userAtom } from '@/recoil/atoms'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import editIconUrl from '@/assets/svg/Edit.svg'
import closeIconUrl from '@/assets/svg/Close.svg'

export function NicknameEdit() {
  const [user, setUser] = useRecoilState(userAtom)
  const [nickname, setNickname] = useState(user.userName ?? '')
  const { modalName, openModal, closeModal } = useModal<'NicknameChange'>()

  const nicknameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  const nicknameSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUser({ ...user, userName: nickname })
    closeModal()
  }

  console.log(user, 'user')

  return (
    <>
      <div className="flex items-center justify-center">
        <ReportProfileIcon />
        <p className="ml-[0.9375rem] mr-[0.625rem] text-[1.4375rem] font-semibold text-grey-200">
          {user?.userName || '이름을 지어주세요'}
        </p>
        <button className="border-none bg-none" onClick={() => openModal('NicknameChange')}>
          <img src={editIconUrl} alt="수정" />
        </button>
      </div>

      <ModalPortal onClose={closeModal} isOpened={modalName !== undefined}>
        {modalName === 'NicknameChange' && (
          <div className="fixed bottom-1/2 right-1/2 w-[24.25rem] translate-x-1/2 translate-y-1/2 rounded-2xl bg-grey-850 px-[0.875rem] pb-[1.125rem] pt-[2.9375rem]">
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
                className="mb-6 rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 px-[0.8125rem] pb-[1.25rem] pt-[1.1875rem] text-[1.125rem] font-medium leading-[1.3125rem] text-grey-300"
                value={nickname}
                onChange={nicknameChangeHandler}
                autoFocus
              />
              <button className="width-full rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
                완료
              </button>
            </form>
          </div>
        )}
      </ModalPortal>
    </>
  )
}
