import InputBox from '../components/InputBox'
import LoginPageImg from '../../public/img/tmpLoginImg.png'
import { FormProvider, useForm } from 'react-hook-form'
import Header from '../components/Header'
import { postUser } from '../api/user'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../recoil/atoms'

export function Login() {
  const setUser = useSetRecoilState(userAtom)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const onSubmit = async (data: any) => {
    const response = await postUser(data)
    if (response.status === 409) {
      setErrorMessage('중복되는 닉네임이에요.')
    } else {
      setErrorMessage('')
      setUser(response.data)
      navigate('/')
    }
    return response
  }

  const methods = useForm({
    defaultValues: {
      userName: null,
      password: null,
    },
  })
  return (
    <div className="h-screen bg-grey-1000 text-center">
      <Header name="로그인" />
      <div>
        <img src={LoginPageImg} alt="로그인 페이지 이미지" className="mb-8 h-[250px] w-full" />
      </div>
      <div className="px-5">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputBox
              errorMessage={errorMessage}
              InputBoxName="닉네임"
              placeHolder="닉네임을 입력해주세요."
              registerName="userName"
            />
            <InputBox
              InputBoxName="비밀번호"
              placeHolder="비밀번호를 입력해주세요."
              type="password"
              registerName="password"
            />
            <button type="submit" className="btn-primary btn mt-10 h-16 w-full border-0 bg-[#786DFF] text-xl">
              로그인하기
            </button>
          </form>
        </FormProvider>

        <div className="mt-6 text-grey-400">
          <p
            className="underline underline-offset-4"
            // onClick={() => {
            //   navigate('/register')
            // }}
          >
            중복된 닉네임이 없으면 자동으로 가입됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
