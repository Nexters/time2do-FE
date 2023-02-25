import { FormProvider, useForm } from 'react-hook-form'
import Header from '../components/Header'
import LoginPageImg from '../../public/img/tmpLoginImg.png'
import InputBox from '../components/InputBox'
import { useState } from 'react'
import { postUser } from '../api/user'
import { RegisterUser } from '../types'

const Register = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const onSubmit = async (data: any) => {
    const response = await postUser(data)
    console.log(response)
  }

  const methods = useForm({
    defaultValues: {
      userName: null,
      password: null,
    },
  })
  return (
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
            <InputBox InputBoxName="비밀번호 확인" placeHolder="비밀번호를 다시 입력해주세요." type="password" />
            <button className="btn-primary btn mt-[100px] h-16 w-full border-0 bg-[#786DFF] text-xl">회원 가입</button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Register
