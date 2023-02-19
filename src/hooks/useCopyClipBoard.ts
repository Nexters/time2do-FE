import { useState } from 'react'

const useCopyClipBoard = () => {
  const [isCopy, setIsCopy] = useState<boolean>(false)

  const onCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopy(true)

      return true
    } catch (e) {
      console.log(e)
      setIsCopy(false)

      return false
    }
  }

  return [isCopy, onCopy]
}

export default useCopyClipBoard
