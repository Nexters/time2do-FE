import TimerInputBox from '../components/TimerInputBox'
import Header from '../components/Header'

export function CountDownNew() {
  return (
    <div className={'h-screen bg-[#0F1214] text-center'}>
      <div className={'m-auto w-11/12'}>
        <Header title={'다운 타이머 만들기'} />
        <TimerInputBox timerName={'타이머 이름'} placeHolder={'타이머 이름을 입력해주세요. (15자 이내)'} />
        <TimerInputBox.TagSelect
          timerName={'관련 태그'}
          placeHolder={'관련 태그를 입력해주세요. (최대 2개)'}
          required={false}
        />
        <TimerInputBox.TargetTimeSet timerName={'목표시간'} />
        <TimerInputBox.StartTimeSet timerName={'타이머 시작 시간'} />
        <button className={'btn-primary btn mt-[100px] w-full border-0 bg-[#786DFF] text-xl'}>그룹 생성하기</button>
      </div>
    </div>
  )
}

export default CountDownNew
