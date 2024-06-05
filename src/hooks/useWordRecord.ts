import useLocalStorage from "@/src/hooks/useLocalStorage"
import { useCallback } from "react"

export const useWordRecord = () => {
  const [words, dispatchLocal] = useLocalStorage<string[]>("searchs", [])

  const addWord = (word: string) => {
    if (!words) return
    const loweredWord = word.toLowerCase().trim()
    const wordIndex = words.findIndex((word) => loweredWord === word.toLowerCase().trim())
    const isTheFirstWord = wordIndex === 0
    if (isTheFirstWord) return
    const newBody = [loweredWord, ...(words ?? [])]
    const uniqueWords = Array.from(new Set(newBody).values())
    dispatchLocal({
      type: "SET",
      payload: {
        key: "searchs",
        body: uniqueWords.slice(0, 6),
      },
    })
  }

  return { words, addWord }
}
