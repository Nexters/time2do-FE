import useCountdown from '@bradgarropy/use-countdown'
import { useState } from 'react'
import { TodoList } from '../components/TodoList'

interface Props {}

export function Home({}: Props) {
  const [todos, setTodos] = useState([
    { id: 1, text: '운동하기1', completed: true },
    { id: 2, text: '운동하기2', completed: true },
    { id: 3, text: '운동하기3', completed: true },
    { id: 4, text: '운동하기4', completed: true },
    { id: 5, text: '운동하기5', completed: true },
  ])

  const { minutes, seconds } = useCountdown({
    minutes: 30,
    seconds: 30,
    format: 'hh:mm:ss',
    onCompleted: () => console.log('onCompleted'),
  })

  return (
    <>
      <header className="w-full h-[30rem] bg-gradient-to-b from-lime-300 to-[#F9F9F9]">
        <div className="grid items-end justi h-full w-full">
          <div className="min-w-full text-center row-span-full col-span-full mb-[4.5rem] mb-">
            <div className="mb-5">
              <span className="badge bg-white mx-2 py-4 text-primary border-none text-lg font-semibold px-5">
                #디자인
              </span>
              <span className="badge bg-white mx-2 py-4 text-primary border-none text-lg font-semibold px-5">
                #취준
              </span>
            </div>
            <div className="mb-3 text-xl font-semibold">일이삼사오육칠발구십일이삼사오</div>
            <div className="mb-12">
              <div className="mb-3">
                <span className="countdown font-mono text-5xl font-bold">
                  {/* @ts-ignore */}
                  <span style={{ '--value': 0 }}></span>:<span style={{ '--value': minutes }}></span>:{/* @ts-ignore */}
                  <span style={{ '--value': seconds }}></span>
                </span>
              </div>
              <div className="text-lg">5:00 PM 시작 예정</div>
            </div>
            <button className="btn rounded-[22px] bg-primary w-[180px] text-lg text-white">나가기</button>
          </div>
        </div>
      </header>
      <div className="bg-[#F2F4F6] py-7 px-6">
        <TodoList todos={todos} onChange={todos => setTodos(todos)} />
      </div>
    </>
  )
}
