import { useStopwatch } from 'react-timer-hook'
import { useEffect } from 'react'

interface Props {}

const now = new Date()
now.setSeconds(now.getSeconds() + 100)

export const CountUpHeader = ({}: Props) => {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } = useStopwatch({ autoStart: true })

  return (
    <div className="grid h-full w-full items-end justify-center bg-[url('/img/character.png')] bg-cover bg-center text-white">
      <div className="col-span-full row-span-full mb-[4.5rem] min-w-full text-center">
        <div className="mb-3 text-xl font-semibold">일이삼사오육칠발구십일이삼사오</div>
        <div className="mb-12">
          <div className="mb-3">
            <span className="countdown font-mono text-5xl font-bold">
              {/* @ts-ignore */}
              <span style={{ '--value': hours }}></span>:<span style={{ '--value': minutes }}></span>:{/* @ts-ignore */}
              <span style={{ '--value': seconds }}></span>
            </span>
          </div>
        </div>
        <div>
          {isRunning ? (
            <div className="flex items-center justify-center">
              <button onClick={() => pause()} className="btn-primary btn-circle btn mr-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path
                    fillRule="evenodd"
                    d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button onClick={() => reset(undefined, false)} className="btn-primary btn-circle btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button onClick={() => start()} className="btn-primary btn-circle btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}