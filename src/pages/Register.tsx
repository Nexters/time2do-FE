import { FormProvider, useForm } from 'react-hook-form'
import Header from '../components/Header'
import InputBox from '../components/InputBox'
import { postUser } from '../api/user'
import { useState } from 'react'
import ModalPortal from '../components/ModalPortal'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../recoil/atoms'

const Register = () => {
  const setUser = useSetRecoilState(userAtom)
  const navigate = useNavigate()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState({
    modalTitle: '',
    modalContent: '',
    buttonContent: '',
    isSuccess: false,
  })

  const closeModal = () => {
    setModalVisible(false)
  }
  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setModalContent({
        modalTitle: '비밀번호가 일치하지 않습니다',
        modalContent: '다시 한 번 확인해주세요',
        buttonContent: '확인',
        isSuccess: false,
      })
      setModalVisible(true)
      return null
    } else {
      const response = await postUser({
        userName: data.userName,
        password: data.password,
      })
      const statusCode = response.status
      switch (statusCode) {
        case 200: {
          setModalContent({
            modalTitle: '회원 가입을 완료했어요',
            modalContent: '이제 타임투두를 이용해보세요',
            buttonContent: '로그인',
            isSuccess: true,
          })
          setUser(response.data)
          break
        }
        case 409:
          setModalContent({
            modalTitle: '중복된 아이디입니다.',
            modalContent: '다시 한 번 확인해주세요.',
            buttonContent: '확인',
            isSuccess: false,
          })
      }
      setModalVisible(true)
    }
  }

  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  return (
    <>
      <div className="h-screen bg-grey-1000 text-center">
        <Header name="회원가입" />
        <div className="px-5">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <InputBox InputBoxName="닉네임" placeHolder="닉네임을 입력해주세요." registerName="username" />
              <InputBox
                InputBoxName="비밀번호"
                placeHolder="비밀번호를 입력해주세요."
                type="password"
                registerName="password"
              />
              <InputBox
                InputBoxName="비밀번호 확인"
                placeHolder="비밀번호를 다시 입력해주세요."
                type="password"
                registerName="confirmPassword"
              />
              <button className="btn-primary btn mt-[100px] h-16 w-full border-0 bg-[#786DFF] text-xl">
                회원 가입
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
      {modalVisible && (
        <ModalPortal closePortal={closeModal} isOpened={modalVisible}>
          <div className="fixed right-1/2 bottom-1/2 w-[24.25rem] translate-x-1/2 translate-y-1/2 rounded-2xl bg-grey-850 px-[1.375rem] pb-[1.125rem] pt-[1.5625rem]">
            <div className="flex flex-col">
              <p className="mb-4 text-[1.375rem] font-bold leading-[140%] text-grey-200">{modalContent.modalTitle}</p>
              <p className="mb-[1.375rem] text-[1rem] font-semibold leading-[1.4375rem]">{modalContent.modalContent}</p>
              <div className="w-full">
                <button
                  className="w-full rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold text-white"
                  onClick={() => {
                    modalContent.isSuccess ? navigate('/') : closeModal()
                  }}>
                  {modalContent.buttonContent}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  )
}

export default Register
