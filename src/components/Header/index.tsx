import BackIcon from '../../assets/svg/BackIcon.svg'
import { useNavigate } from 'react-router-dom'

interface Props {
  name: string
}

const Header = ({ name }: Props) => {
  const navigate = useNavigate()
  return (
    <header className="flex h-20 w-full items-center bg-grey-1000 text-center">
      <div className="w-full flex-1 text-center text-[1.1875rem] font-medium text-white">{name}</div>
      <button className="absolute ml-[0.625rem]" onClick={() => navigate(-1)}>
        <img src={BackIcon} alt="뒤로가기 버튼" />
      </button>
    </header>
  )
}

export default Header
