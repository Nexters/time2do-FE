import { useRef } from 'react'
import useCountdown from '@bradgarropy/use-countdown'

function App() {
  const wrapperRef = useRef(null)
  const { minutes, seconds } = useCountdown({
    minutes: 30,
    seconds: 30,
    format: 'hh:mm:ss',
    onCompleted: () => console.log('onCompleted'),
  })

  return (
    <div className="bg-gradient-to-br from-green-200 to-blue-400 text-[#191f28]">
      <main className="grid min-h-screen grid-rows-header-footer relative w-screen max-w-md m-auto">
        <header
          ref={wrapperRef}
          className="w-full h-[500px] bg-gradient-to-b from-[#BEFF7C] to-[#F9F9F9] overflow-x-hidden touch-none">
          <div className="grid items-end justi h-full w-full">
            {/* <div className="row-span-full col-span-full pb-20">
              <Face wrapperRef={wrapperRef} />
            </div> */}
            <div className="min-w-full text-center row-span-full col-span-full mb-[74px]">
              <div className="mb-5">
                <span className="badge bg-white mx-2 py-4 text-[#191f28] border-none text-lg font-semibold px-5">
                  #디자인
                </span>
                <span className="badge bg-white mx-2 py-4 text-[#191f28] border-none text-lg font-semibold px-5">
                  #취준
                </span>
              </div>
              <div className="mb-3 text-xl font-semibold">일이삼사오육칠발구십일이삼사오</div>
              <div className="mb-12">
                <div className="mb-3">
                  <span className="countdown font-mono text-5xl font-bold">
                    <span style={{ '--value': 0 }}></span>:<span style={{ '--value': minutes }}></span>:
                    <span style={{ '--value': seconds }}></span>
                  </span>
                </div>
                <div className="text-lg">5:00 PM 시작 예정</div>
              </div>
              <button className="btn rounded-[22px] bg-[#191F28] w-[180px] text-lg text-white">나가기</button>
            </div>
          </div>
        </header>
        <div className="bg-[#F2F4F6] py-7 px-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold">1월 25일의 할일 목록</h1>
            <div>
              <button className="btn btn-sm text-white">추가하기</button>
            </div>
          </div>
          <div>
            <ul>
              {[...Array(5).keys()].map((_, i) => (
                <li key={i} className="bg-white flex justify-between items-center p-3 mb-2 rounded-sm">
                  <div className="flex items-center">
                    <input type="checkbox" checked={true} className="checkbox checkbox-accent mr-2" /> 운동하기
                  </div>
                  <button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 6.00012L6 18.0001"
                        stroke="#8B95A1"
                        stroke-width="1.5"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6 6.00012L18 18.0001"
                        stroke="#8B95A1"
                        stroke-width="1.5"
                        stroke-linecap="square"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
