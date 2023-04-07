import useLocalStorage from "@/src/hooks/useLocalStorage"
import { useEffect, useState } from "react"

import Link from "next/link"

import {
  meaningStyles,
  speechsStyles,
  wordStyles,
} from "@/src/components/wordDefinition/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import useDictionary, { Word, Meaning } from "@/src/hooks/useDictionary"
import { Theme } from "@/src/interfaces/themes"

interface WordProps {
  word: string
  onLoading: JSX.Element
  onError: JSX.Element
  theme?: Theme
}

export default function WordDefinition({
  word,
  onError,
  onLoading,
  theme,
}: WordProps) {
  const [localStorage, dispatchLocal] = useLocalStorage<string[]>("searchs", [])
  const { isLoading, isOkay, words } = useDictionary(word)

  useEffect(
    function addWordInLocalStorage() {
      if (!isOkay || isLoading) return
      const newBody = [word.toLowerCase(), ...(localStorage ?? [])]
      const uniqueWords = Array.from(new Set(newBody).values())
      dispatchLocal({
        type: "SET",
        payload: {
          key: "searchs",
          body: uniqueWords.slice(0, 6),
        },
      })
    },
    [isOkay, isLoading]
  )

  if (isLoading) return onLoading
  if (!isOkay) return onError

  return (
    <div>
      {words.map((word, key, data) => {
        const hasVariusDefinitions = data.length > 1
        const definitionNumber = key + 1
        return (
          <Word
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

const Word: React.FC<DefinitionProps> = ({
  word: { meanings, wordName, phonetic, partsOfSpeech, sounds },
  count,
  theme,
}) => {
  const [actualPartOfSpeech, setActualPartOfSpeech] = useState<string>(
    partsOfSpeech[0]
  )
  const selectedMeanings = meanings.filter(
    ({ partOfSpeech }) => actualPartOfSpeech === partOfSpeech
  )

  return (
    <div className="word">
      <div className="word__header">
        <h2>
          {wordName} {count && <sup>{count}</sup>}
        </h2>
      </div>
      {phonetic?.length && (
        <div className="word__sounds">
          <div>{phonetic}</div>
          {sounds[0] && <Phonetic audio={sounds[0]} />}
        </div>
      )}
      <div className="word__speechs">
        <Speechs
          theme={theme}
          speechs={partsOfSpeech}
          selected={actualPartOfSpeech}
          onSelect={setActualPartOfSpeech}
        />
      </div>
      <div className="word__meanings">
        {selectedMeanings.map((meaning, index) => (
          <Meaning
            theme={theme}
            key={index}
            meaning={meaning}
            count={selectedMeanings.length > 1 ? index + 1 : null}
          />
        ))}
      </div>
      <style jsx>{`
        .word {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-height: 60vh;
        }
        .word:last-child {
          min-height: 20vh;
        }

        .word__header {
          display: flex;
          flex-direction: column;
          font-size: 3rem;
        }
        .word__sounds {
          display: flex;
          gap: 10px;
          color: ${theme?.highligthColor || "auto"};
        }
        .word__meanings {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        h2 {
          font-weight: 700;
          font-size: 3rem;
          margin: 0;
          color: ${theme?.color || "auto"};
        }
      `}</style>
    </div>
  )
}

interface MeaningProps {
  meaning: Meaning
  count?: number | null
  theme?: Theme
}

const Meaning: React.FC<MeaningProps> = ({ meaning, count, theme }) => {
  const definitionsCount = meaning.definitions.length
  const synonymsCount = meaning.synonyms.length
  const antonymsCount = meaning.antonyms.length

  return (
    <div className="meaning">
      <div className="meaning__definitions">
        <div className="meaning__title">
          Definitions {count && <sup>{count}</sup>}{" "}
          <span className="meaning__title--count">{definitionsCount}</span>
        </div>
        <ol className="meaning__list">
          {meaning.definitions.map(({ definition, example }, key) => (
            <dl className="meaning__definition" key={key}>
              <li className="meaning__list-item">
                <dt className="meaning__list-item-body">{definition}</dt>
              </li>
              {example && (
                <dd className="meaning__example">
                  <em>{example}</em>
                </dd>
              )}
            </dl>
          ))}
        </ol>
      </div>
      <dl className="meaning__synonyms">
        <dt className="meaning__title">
          Synonyms {count && <sup>{count}</sup>}{" "}
          <span className="meaning__title--count">{synonymsCount}</span>
        </dt>
        {meaning.synonyms.map((word, index) => (
          <dd className="meaning__desc" key={index}>
            <Link href={`/${word}`} legacyBehavior>
              <a className="meaning__link">{word}</a>
            </Link>
          </dd>
        ))}
      </dl>
      <dl className="meaning__antonyms">
        <dt className="meaning__title">
          Antonyms {count && <sup>{count}</sup>}{" "}
          <span className="meaning__title--count">{antonymsCount}</span>{" "}
        </dt>
        {meaning.antonyms.map((word, index) => (
          <dd className="meaning__desc" key={index}>
            <Link href={`/${word}`} legacyBehavior>
              <a className="meaning__link">{word}</a>
            </Link>
          </dd>
        ))}
      </dl>
      <style jsx>{`
        .meaning {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "definitions definitions"
            "synonyms antonyms";
          border-bottom: solid 1px rgb(145, 145, 145);
          row-gap: 20px;
        }

        .meaning:last-child {
          border-bottom: none;
        }

        .meaning__title {
          text-transform: uppercase;
          font-weight: bold;
          color: ${theme?.color || "auto"};
        }

        .meaning__definition {
          margin: 0;
        }

        .meaning__title--count {
          color: rgb(216, 216, 216);
        }

        .meaning__definitions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .meaning__definitions,
        .meaning__synonyms,
        .meaning__antonyms {
          line-height: 1.5rem;
        }

        .meaning__example {
          color: rgb(112, 112, 112);
        }

        .meaning__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0;
          margin: 0;
          list-style-position: inside;
          line-height: 1.3rem;
        }
        .meaning__list-item-body {
          display: inline;
          color: ${theme?.color || "auto"};
        }

        .meaning__list-item::marker {
          font-weight: bolder;
          color: ${theme?.color || "auto"};
        }
        .meaning__list-definition {
          display: inline;
        }

        .meaning__desc {
          margin: 0;
        }

        .meaning__link {
          color: ${theme?.highligthColor || "auto"};
          text-decoration: none;
        }

        .meaning__definitions {
          grid-area: definitions;
        }
        .meaning__synonyms {
          grid-area: synonyms;
        }
        .meaning__antonyms {
          grid-area: antonyms;
        }
      `}</style>
    </div>
  )
}

interface SpeechsProps {
  speechs: string[]
  selected: string
  onSelect: (text: string) => void
  theme?: Theme
}

const Speechs: React.FC<SpeechsProps> = ({
  speechs,
  selected,
  onSelect,
  theme,
}) => {
  return (
    <nav className="speechs">
      {speechs.map((partOfSpeech, index) => {
        const isSelected = partOfSpeech === selected
        const selectedStyle = "speechs__child--selected"
        return (
          <div
            key={index}
            className={`speechs__child ${isSelected ? selectedStyle : ""}`}
            onClick={() => onSelect(partOfSpeech)}
          >
            {partOfSpeech}
          </div>
        )
      })}

      <style jsx>{`
        .speechs {
          display: flex;
          overflow: auto;
        }
        .speechs__child {
          padding: 5px 15px;
          border: solid 1px ${theme?.highligthColor || "auto"};
          border-left-width: 0px;
          cursor: pointer;
          color: ${theme?.highligthColor || "auto"};
        }
        .speechs__child:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        .speechs__child:first-child {
          border-left-width: 1px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        .speechs__child--selected {
          background-color: ${theme?.highligthColor || "auto"};
          color: ${theme?.color || "auto"};
        }
      `}</style>
    </nav>
  )
}

const Phonetic: React.FC<{ audio: string; theme?: Theme }> = ({
  audio,
  theme,
}) => {
  const sound = new Audio(audio)
  return (
    <div className="phonetic">
      <FontAwesomeIcon onClick={() => sound.play()} icon={faVolumeHigh} />
      <style jsx>
        {`
          .phonetic {
            cursor: pointer;
            color: ${theme?.highligthColor || "auto"}
            display: flex;
            gap: 10px;
          }
        `}
      </style>
    </div>
  )
}



