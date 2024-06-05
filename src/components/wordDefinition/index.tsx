import { useEffect, useState } from "react"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import useDictionary, { Word, Meaning } from "@/src/hooks/useDictionary"
import { Theme } from "@/src/interfaces/themes"
import Loading from "@/src/components/loading"

interface WordProps {
  word: string
  theme?: Theme
  onWordLoad?: () => void
}

export default function WordDefinition({ word, theme, onWordLoad }: WordProps) {
  const { isLoading, isOkay, words } = useDictionary(word)

  useEffect(() => {
    if (isLoading || !isOkay || !word) return
    onWordLoad?.()
  }, [isLoading, isOkay, onWordLoad, word])

  if (isLoading) return <Loading />
  if (!isOkay)
    return (
      <div>
        <p> The word or phrase {`"${word}"`} was not found.</p>
      </div>
    )

  return (
    <div className="flex flex-col gap-12">
      {words.map((word, key, words) => {
        const hasVariusDefinitions = words.length > 1
        const definitionNumber = key + 1
        return (
          <WordComponent
            key={key}
            theme={theme}
            word={word}
            count={hasVariusDefinitions ? definitionNumber : undefined}
          />
        )
      })}
    </div>
  )
}

interface DefinitionProps {
  word: Word
  count?: number
  theme?: Theme
}

const WordComponent: React.FC<DefinitionProps> = ({
  word: { meanings, wordName, phonetic, partsOfSpeech, sounds },
  count,
}) => {
  const [actualPartOfSpeech, setActualPartOfSpeech] = useState<string>(partsOfSpeech[0])
  const selectedMeanings = meanings.filter(
    ({ partOfSpeech }) => actualPartOfSpeech === partOfSpeech
  )

  return (
    <article className="flex flex-col gap-2">
      <header>
        <h1 className="text-5xl font-bold">
          {wordName} {count && <sup>{count}</sup>}
        </h1>
      </header>

      {phonetic && <Pronuntiation ipaText={phonetic} soundUrl={sounds[0]} />}

      <PartsOfSpeechSwitcher
        speechs={partsOfSpeech}
        selected={actualPartOfSpeech}
        onSelect={setActualPartOfSpeech}
      />

      {selectedMeanings.map((meaning, index) => (
        <MeaningComponent key={index} meaning={meaning} />
      ))}
    </article>
  )
}

const Pronuntiation = ({ ipaText, soundUrl }: { ipaText: string; soundUrl: string }) => {
  const sound = new Audio(soundUrl)
  return (
    <section className="flex gap-2 items-center">
      <p>{ipaText}</p>

      <button
        className="cursor-pointer py-3 px-2 rounded-full"
        onClick={() => sound.play()}
        aria-label="Play pronunciation"
      >
        <FontAwesomeIcon icon={faVolumeHigh} />
      </button>
    </section>
  )
}

interface MeaningProps {
  meaning: Meaning
}

const MeaningComponent: React.FC<MeaningProps> = ({ meaning }) => {
  const { definitions, synonyms, antonyms } = meaning
  const definitionsCount = definitions.length
  const synonymsCount = synonyms.length
  const antonymsCount = antonyms.length

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-2">
        <h2 className="uppercase font-bold">
          Definitions <span aria-invalid={"false"}>{definitionsCount}</span>
        </h2>

        <ol className="list-decimal list-inside">
          {definitions.map(({ definition, example }, key) => {
            return (
              <li key={key}>
                {definition}
                {example && <p className="ml-9 bg-gray-200 rounded">{example}</p>}
              </li>
            )
          })}
        </ol>
      </div>

      <div className="col-span-1">
        {synonymsCount > 0 && (
          <>
            <h2 className="uppercase font-bold">
              Synonyms <span aria-invalid={"false"}>{synonymsCount}</span>
            </h2>
            <ul>
              {synonyms.map((synonym, key) => (
                <li key={key}>
                  <Link
                    className="text-blue-800 min-h-11 min-w-11 inline-flex items-center hover:underline"
                    href={`${synonym}`}
                  >
                    {synonym}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="col-span-1">
        {antonymsCount > 0 && (
          <>
            <h2 className="uppercase font-bold">
              Antonyms <span aria-invalid={"false"}>{antonymsCount}</span>
            </h2>
            <ul>
              {antonyms.map((antonym, key) => (
                <li key={key}>
                  <Link className="text-blue-500" href={`${antonym}`}>
                    {antonym}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

interface SpeechsProps {
  speechs: string[]
  selected: string
  onSelect: (text: string) => void
  theme?: Theme
}

const PartsOfSpeechSwitcher: React.FC<SpeechsProps> = ({ speechs, selected, onSelect }) => {
  return (
    <nav className="flex gap-2">
      {speechs.map((partOfSpeech, index) => {
        const isSelected = partOfSpeech === selected
        const className = "bg-blue-800 text-white"
        return (
          <button
            key={index}
            className={`min-h-11 min-w-11 rounded px-2 ${isSelected ? className : ""}`}
            onClick={() => onSelect(partOfSpeech)}
          >
            {partOfSpeech}
          </button>
        )
      })}
    </nav>
  )
}
