import BackIcon from '../../assets/svg/BackIcon.svg'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <header className={'mb-[2rem] flex h-14 w-full items-center text-center'}>
      <div className={'w-full flex-1 text-center text-[1.1875rem] text-white'}>{title}</div>
      <button className={'absolute'}>
        <img src={BackIcon} alt={'뒤로가기 버튼'} />
      </button>
    </header>
  )
}

export default Header
