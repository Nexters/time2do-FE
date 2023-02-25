import InputBox from '../components/InputBox'
import { FormProvider, useForm } from 'react-hook-form'

export function Login() {
  const methods = useForm({
    defaultValues: {
      userName: null,
      password: null,
    },
  })
  return (
    <>
      <div className=".imgArea">{/** 대충 이미지 영역**/}</div>

      <div className=".loginArea">
        <FormProvider {...methods}>
          <form>
            <InputBox
              InputBoxName="닉네임"
              placeHolder="닉네임을 입력해주세요."
              registerName="userName"
              required={false}
            />
            <InputBox
              InputBoxName="비밀번호"
              placeHolder="비밀번호를 입력해주세요."
              type="password"
              registerName="password"
            />
            <button className="btn-primary btn h-16 w-full border-0 bg-[#786DFF] text-xl">완료</button>
          </form>
        </FormProvider>
      </div>
    </>
  )
}
