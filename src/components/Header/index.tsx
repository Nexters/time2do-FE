import BackIcon from '../../assets/svg/BackIcon.svg'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <header className={'flex text-center items-center h-14 w-full'}>
      <button>
        <img src={BackIcon} alt={'뒤로가기 버튼'} />
      </button>
      <label className={'text-white text-[19px]'}>{title}</label>
    </header>
  )
}

export default Header
