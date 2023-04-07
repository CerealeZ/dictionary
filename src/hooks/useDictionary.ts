import { useEffect, useState } from "react"
import Fetcher from "@/src/services/Fetcher"
import type { Definition } from "@/src/interfaces/word"

export interface Word {
  wordName: string
  phonetic: string | undefined
  sounds: string[]
  partsOfSpeech: string[]
  meanings: Meaning[]
}

export interface Meaning {
  partOfSpeech: string
  definitions: {
    definition: string
    synonyms: string[]
    antonyms: string[]
    example?: string
  }[]
  synonyms: string[]
  antonyms: string[]
}

export default function useDictionary(
  wordName: string
) {
  const [words, setWords] = useState<Word[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOkay, setIsOkay] = useState(true)

  useEffect(
    function getDefinitions() {
      setIsLoading(true)
      Fetcher(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordName}`)
        .get<Definition[]>()
        .then((response) => {
          if (!response.data) {
            setIsOkay(false)
            setWords([])
            return
          }
          const words = response.data.map((definition) => {
            return transformDefintion(definition)
          })
          setWords(words)
          setIsOkay(true)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [wordName]
  )

  return {words, isLoading, isOkay}
}

const transformDefintion = (definition: Definition): Word => {
  const wordName = definition.word

  const partsOfSpeech = definition.meanings.map(
    ({ partOfSpeech }) => partOfSpeech
  )

  const phonetic = definition.phonetic
    ? definition.phonetic
    : definition.phonetics.find(({ text }) => text)?.text

  const sounds = definition.phonetics
    .map(({ audio }) => {
      return audio
    })
    .filter((audio) => audio)

  const uniquesPartOfSpeech = Array.from(new Set<string>(partsOfSpeech))
  const meanings = definition.meanings.map((meaning) => {
    const definitions = meaning.definitions
    const synonyms = meaning.synonyms
    const antonyms = meaning.antonyms
    const partOfSpeech = meaning.partOfSpeech
    return {
      partOfSpeech,
      definitions,
      antonyms,
      synonyms,
    }
  })

  return {
    wordName,
    phonetic,
    sounds,
    partsOfSpeech: uniquesPartOfSpeech,
    meanings,
  }
}
