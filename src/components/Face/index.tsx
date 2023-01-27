import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cls } from '../../utils/cls'

interface Props {
  wrapperRef: React.RefObject<HTMLDivElement>
}

export const Face = forwardRef<HTMLDivElement, Props>(({ wrapperRef }: Props, ref) => {
  // export function Face({}: Props) {
  const [isHovering, setIsHovering] = useState(false)

  const eyeball1Ref = useRef<HTMLDivElement>(null)
  const eyeball2Ref = useRef<HTMLDivElement>(null)

  function pointerMoveHandler(e: PointerEvent) {
    const pointerX = e.clientX
    const pointerY = e.clientY

    const eyeballs = [eyeball1Ref.current, eyeball2Ref.current]
    eyeballs.forEach(eyeball => {
      if (!eyeball) return
      const { left, top } = eyeball.getBoundingClientRect() ?? {}
      if (!left || !top) return
      const x = left + eyeball.clientWidth / 2
      const y = top + eyeball.clientHeight / 2
      const radian = Math.atan2(pointerX - x, pointerY - y)
      const rotation = radian * (180 / Math.PI) * -1 + 270
      eyeball.style.transform = `rotate(${rotation}deg)`
    })
  }

  useEffect(() => {
    wrapperRef.current?.addEventListener('pointermove', pointerMoveHandler)

    return () => {
      wrapperRef.current?.removeEventListener('pointermove', pointerMoveHandler)
    }
  }, [])

  return (
    <div
      onPointerOver={() => setIsHovering(true)}
      onPointerOut={() => setIsHovering(false)}
      className="face relative w-[300px] h-[300px] rounded-full bg-yellow-400 flex justify-center items-center">
      <div className="eyes relative -top-10 flex w-full justify-center items-center">
        <div ref={eyeball1Ref} className="eyeball relative w-[80px] h-[80px] block bg-white mx-4 rounded-full">
          <div className="eye absolute top-1/2 left-1/3 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2 bg-[#333] rounded-full"></div>
        </div>
        <div ref={eyeball2Ref} className="eyeball relative w-[80px] h-[80px] block bg-white mx-4 rounded-full">
          <div className="eye absolute top-1/2 left-1/3 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2 bg-[#333] rounded-full"></div>
        </div>
      </div>
      <div
        className={cls(
          'mouth absolute  w-[150px] bg-[#b57700] transition-all duration-500 hover:top-[200px] hover:h-[25px] hover:rounded-none',
          isHovering ? 'top-[200px] h-[25px] rounded-none' : 'top-[180px] h-[70px] rounded-b-[70px]',
        )}></div>
    </div>
  )
})
