import BackIcon from '../../assets/svg/BackIcon.svg'
import { useNavigate } from 'react-router-dom'

interface Props {
  name: string
}

const Header = ({ name }: Props) => {
  const navigate = useNavigate()
  return (
    <header className="mb-[2rem] flex h-14 w-full items-center text-center">
      <div className="w-full flex-1 text-center text-[1.1875rem] text-white">{name}</div>
      <button className="absolute ml-[0.625rem]" onClick={() => navigate(-1)}>
        <img src={BackIcon} alt="뒤로가기 버튼" />
      </button>
    </header>
  )
}

export default Header
