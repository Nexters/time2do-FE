interface TimerDisplayedNumbersProps {
  hours: number
  minutes: number
  seconds: number
}

export const TimerDisplayedNumbers = ({ hours, minutes, seconds }: TimerDisplayedNumbersProps) => {
  return (
    <span className="countdown font-montserrat text-[4rem] font-bold">
      {/* @ts-ignore */}
      <span style={{ '--value': hours }}></span>:<span style={{ '--value': minutes }}></span>:{/* @ts-ignore */}
      <span style={{ '--value': seconds }}></span>
    </span>
  )
}
