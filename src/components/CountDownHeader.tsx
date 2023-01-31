import { useTimer } from 'react-timer-hook'
import { useEffect } from 'react'

interface Props {}

const now = new Date()
now.setSeconds(now.getSeconds() + 100)
export const CountDownHeader = ({}: Props) => {
  const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: now,
    onExpire: () => console.warn('onExpire called'),
  })

  useEffect(() => {
    start()
  }, [])

  return (
    <div className="grid h-full w-full items-end justify-center">
      <div className="col-span-full row-span-full mb-[4.5rem] min-w-full text-center">
        <div className="mb-5">
          <span className="badge mx-2 border-none bg-white py-4 px-5 text-lg font-semibold text-primary">#디자인</span>
          <span className="badge mx-2 border-none bg-white py-4 px-5 text-lg font-semibold text-primary">#취준</span>
        </div>
        <div className="mb-3 text-xl font-semibold">일이삼사오육칠발구십일이삼사오</div>
        <div className="mb-12">
          <div className="mb-3">
            <span className="countdown font-mono text-5xl font-bold">
              {/* @ts-ignore */}
              <span style={{ '--value': hours }}></span>:<span style={{ '--value': minutes }}></span>:{/* @ts-ignore */}
              <span style={{ '--value': seconds }}></span>
            </span>
          </div>
          <div className="text-lg">5:00 PM 시작 예정</div>
        </div>
        <button className="btn w-[180px] rounded-[22px] bg-primary text-lg text-white">나가기</button>
      </div>
    </div>
  )
}
