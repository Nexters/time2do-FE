import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
  onClose: () => void
  isOpened: boolean
}

const ModalPortal = ({ children, onClose, isOpened }: Props) => {
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpened])

  if (!isOpened) return null

  return createPortal(
    <div className="modal-container">
      <div
        className="modal-background fixed bottom-0 left-0 right-0 top-0 z-40  overflow-hidden bg-black opacity-80"
        role="presentation"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 p-3">{children}</div>
    </div>,
    document.getElementById('modal-portal') as HTMLElement,
  )
}

export default ModalPortal
