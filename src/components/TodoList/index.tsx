import Plus from '../../assets/svg/Plus'
import XMark from '../../assets/svg/XMark'

interface Props {}

export const TodoList = ({}: Props) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold">1월 25일의 할일 목록</h1>
        <div>
          <button className="btn btn-sm text-white">
            <Plus />
            할일 추가
          </button>
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
                <XMark />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
