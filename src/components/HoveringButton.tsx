import { useState } from 'react'
import Switch from '../assets/svg/Switch'

interface Props {
  onClick: () => void
  buttonText: string
  buttonTextOnHover: string
}

export const HoveringButton = ({ onClick, buttonText = '', buttonTextOnHover = '' }: Props) => {
  const [isHoveringModeButton, setIsHoveringModeButton] = useState(false)

  return (
    <button
      onPointerEnter={() => setIsHoveringModeButton(true)}
      onPointerLeave={() => setIsHoveringModeButton(false)}
      onClick={onClick}
      className="btn-primary btn-sm btn h-10 border-0 text-lg font-bold">
      <Switch classNames={isHoveringModeButton ? 'mr-2' : ''} />
      {isHoveringModeButton ? buttonTextOnHover : buttonText}
    </button>
  )
}
