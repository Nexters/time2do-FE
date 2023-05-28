import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  onClick: () => void
  buttonText: string
  buttonTextOnHover: string
  PrependedIcon: React.ElementType
  PrependedIconOnHover?: React.ElementType
  backgroundColor?: string
}

export const HoveringButton = ({
  onClick,
  PrependedIcon,
  PrependedIconOnHover,
  buttonText = '',
  buttonTextOnHover = '',
  backgroundColor = '',
}: Props) => {
  const [isHoveringButton, setIsHoveringButton] = useState(false)

  return (
    <button
      onPointerEnter={() => setIsHoveringButton(true)}
      onPointerLeave={() => setIsHoveringButton(false)}
      onClick={onClick}
      className={twMerge(
        'btn-primary btn-sm btn h-10 border-0 text-lg font-bold hover:animate-pulse',
        backgroundColor,
      )}>
      {isHoveringButton && PrependedIconOnHover && <PrependedIconOnHover />}
      {(!isHoveringButton || (isHoveringButton && !PrependedIconOnHover)) && <PrependedIcon />}

      <span className={isHoveringButton ? 'ml-2' : ''}>{isHoveringButton ? buttonTextOnHover : buttonText}</span>
    </button>
  )
}
