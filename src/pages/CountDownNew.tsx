import TimerInputBox from '../components/TimerInputBox'
import Header from '../components/Header'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'

export function CountDownNew() {
  const [startTime, setStartTime] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)

  const methods = useForm({
    defaultValues: {
      id: 0,
      makerId: 0,
      name: '',
      tags: '',
      participants: '0',
      startTime: new Date(),
      endTime: new Date(),
    },
  })
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div className="h-screen bg-[#0F1214] text-center">
      <div className="m-auto w-11/12">
        <Header title="다운 타이머 만들기" />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TimerInputBox timerName="타이머 이름" placeHolder="타이머 이름을 입력해주세요. (15자 이내)" />
            <TimerInputBox.TagSelect
              timerName="관련 태그"
              placeHolder="관련 태그를 입력해주세요. (최대 2개)"
              required={false}
            />
            <TimerInputBox.TargetTimeSet timerName="목표시간" startTime={startTime} />
            <TimerInputBox.StartTimeSet
              timerName="타이머 시작 시간"
              startTime={startTime}
              setStartTime={setStartTime}
            />
            <button
              className="btn-primary btn h-[60px] w-full border-0 bg-[#786DFF] text-xl"
              onClick={() => {
                setModalVisible(true)
              }}>
              그룹 생성하기
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default CountDownNew
