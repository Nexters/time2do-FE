import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
  closePortal: () => void
  isOpened: boolean
}

const ModalPortal = ({ children, closePortal, isOpened }: Props) => {
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpened])

  return createPortal(
    <div className="modal-container">
      <div
        className="modal-background fixed top-0 left-0 z-40 min-h-screen w-screen overflow-hidden bg-black opacity-80"
        role="presentation"
        onClick={closePortal}
      />
      <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 p-3">{children}</div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement,
  )
}

export default ModalPortal
