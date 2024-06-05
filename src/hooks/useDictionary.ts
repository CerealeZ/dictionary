import type { Definition } from "@/src/interfaces/word"
import useSWR from "swr"
import axios from "axios"

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

export default function useDictionary(wordName: string) {
  const { data, isLoading, error } = useSWR(wordName, getWordInfo)
  const words = data?.map(transformDefintion) ?? []
  const isOkay = !error

  return { words, isLoading, isOkay }
}

const getWordInfo = (wordName: string) =>
  axios
    .get<Definition[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordName}`)
    .then((response) => response.data)

const transformDefintion = (definition: Definition): Word => {
  const wordName = definition.word

  const partsOfSpeech = definition.meanings.map(({ partOfSpeech }) => partOfSpeech)

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
