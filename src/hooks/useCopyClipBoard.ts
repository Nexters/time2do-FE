import { ChangeEvent, useState } from 'react'

type useCopyClipBoardProps = [boolean, (text: string) => void]
const useCopyClipBoard = (): useCopyClipBoardProps => {
  const [isCopy, setIsCopy] = useState<boolean>(false)

  const onCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopy(true)
    } catch (e) {
      console.log(e)
      setIsCopy(false)
    }
  }

  return [isCopy, onCopy]
}

export default useCopyClipBoard
