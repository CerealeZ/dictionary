export interface Definition {
  word: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  license: License
  phonetic?: string
  sourceUrls: string[]
}

export interface Meaning {
  partOfSpeech: string
  definitions: DefinitionElement[]
  synonyms: string[]
  antonyms: string[]
}

export interface DefinitionElement {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example?: string
}

export interface Phonetic {
  audio: string
  sourceUrl?: string
  license?: License
  text?: string
}

export interface License {
  name: string
  url: string
}
