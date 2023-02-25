import InputBox from '../components/InputBox'
import Header from '../components/Header'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import TimerMakeModal from '../components/TimerMakeModal'
import { Timer } from '../types'
import { formatISO } from 'date-fns'
import ModalPortal from '../components/ModalPortal'
import { postNewGroup } from '../api/countDownTimer'

export function CountDownNew() {
  const [startTime, setStartTime] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)
  const [invitationCode, setInvitationCode] = useState('')

  const modalOpen = () => {
    return setModalVisible(true)
  }
  const modalClose = () => {
    return setModalVisible(false)
  }

  const methods = useForm<Timer>({
    defaultValues: {
      name: '',
      makerId: '',
      type: 2,
      tag: '',
      startTime: formatISO(new Date()),
      endTime: formatISO(new Date()),
    },
  })
  const onSubmit = async (data: any) => {
    const response = await postNewGroup(data)
    setInvitationCode(response.invitationCode)
    modalOpen()
  }
  return (
    <div className="h-full bg-[#0F1214] text-center">
      <div className="m-auto w-11/12">
        <Header name="다운 타이머 만들기" />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputBox InputBoxName="타이머 이름" placeHolder="타이머 이름을 입력해주세요. (15자 이내)" />
            <InputBox.TagSelect
              InputBoxName="관련 태그"
              placeHolder="관련 태그를 입력해주세요. (최대 2개)"
              required={false}
            />
            <InputBox.TargetTimeSet InputBoxName="목표시간" startTime={startTime} />
            <InputBox.StartTimeSet InputBoxName="타이머 시작 시간" startTime={startTime} setStartTime={setStartTime} />
            <button className="btn-primary btn h-[60px] w-full border-0 bg-[#786DFF] text-xl">그룹 생성하기</button>
          </form>
        </FormProvider>
        {modalVisible && (
          <ModalPortal closePortal={modalClose} isOpened={modalVisible}>
            <TimerMakeModal.CompleteModal closePortal={modalClose} invitationCode={invitationCode} />
          </ModalPortal>
        )}
      </div>
    </div>
  )
}

export default CountDownNew
