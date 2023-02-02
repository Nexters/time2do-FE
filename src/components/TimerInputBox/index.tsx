interface Props {
  timerName: string
  placeHolder: string
  required?: boolean
}

const TimerInputBox = ({ required = true, timerName, placeHolder }: Props) => {
  return (
    <div className={'h-min'}>
      <label className={'label'}>
        <span className={'label-text text-sm font-bold text-gray-400'}>
          {timerName}
          {required && '*'}
        </span>
      </label>
      <input
        className={'input-bordered input mb-8 w-full bg-[#232B38] text-lg text-[#B0B8C1] placeholder:text-[#4E5968]'}
        type={'text'}
        placeholder={placeHolder}
        required={required}
        maxLength={15}
      />
    </div>
  )
}

TimerInputBox.TagSelect = ({ required = true, timerName, placeHolder }: Props) => {
  return (
    <div className={'h-min'}>
      <label className={'label'}>
        <span className={'label-text text-sm font-bold text-gray-400 '}>
          {timerName}
          {required && '*'}
        </span>
      </label>
      <input
        className={'input-bordered input mb-8 w-full bg-[#232B38] text-lg text-[#B0B8C1] placeholder:text-[#4E5968]'}
        type={'text'}
        placeholder={placeHolder}
        required={required}
      />
    </div>
  )
}

TimerInputBox.TargetTimeSet = ({ timerName }: { timerName: string }) => {
  const hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const min = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  return (
    <div className={'mb-8 h-min'}>
      <label className={'label'}>
        <span className={'label-text text-sm font-bold text-gray-400 '}>
          {timerName}
          {'*'}
        </span>
      </label>
      <div className={'flex w-full'}>
        <select className="select mr-[10px] w-full flex-1 bg-[#232B38]">
          {hour.map((time, index) => {
            return (
              <option key={index} value={time}>
                {time}
                시간
              </option>
            )
          })}
        </select>
        <select className="select-bordered select w-full flex-1 bg-[#232B38]">
          {min.map((time, index) => {
            return (
              <option key={index} value={time} selected={time === 3}>
                {('00' + time).slice(-2)}분
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

TimerInputBox.StartTimeSet = ({ timerName }: { timerName: string }) => {
  return (
    <div className={'mb-8 h-min'}>
      <label className={'label'}>
        <span className={'label-text text-sm font-bold text-gray-400 '}>
          {timerName}
          {'*'}
        </span>
      </label>
      <div className={'h-[120px] overflow-hidden rounded-[10px] bg-[#232B38]'}>
        <input
          className={'focus-visible:none input h-1/2 w-full rounded-[0] bg-[#232B38] focus:outline-none'}
          value={'2020년 7월 22일 금요일'}
          readOnly={true}
        />
        <input
          className={'focus-visible:none input h-1/2 w-full rounded-[0] bg-[#232B38] focus:outline-none'}
          value={'오후 04:00'}
          readOnly={true}
        />
      </div>
    </div>
  )
}

export default TimerInputBox
