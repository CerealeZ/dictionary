import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import css from "styled-jsx/css"
import { Theme } from "@/src/interfaces/themes"

interface SearcherProps {
  onSearch: (word: string) => void
  theme?: Theme
}
export default function Searcher({ onSearch }: SearcherProps) {
  const word = useRef<string>("")
  return (
    <form
      className="searcher"
      onSubmit={(e) => {
        e.preventDefault()
        onSearch(word.current)
      }}
    >
      <label htmlFor="word">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </label>
      <input
        autoComplete="off"
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
          (word.current = event.currentTarget.value)
        }
        className={`searcher__input`}
        id="word"
        placeholder="hello, world..."
        type={"search"}
        name="word"
      />
      <style jsx>{searcherStyles}</style>
    </form>
  )
}

const searcherStyles = css`
  .searcher {
    display: flex;
    align-items: center;
    background-color: rgb(230, 230, 230);
    border-radius: 5px;
    gap: 10px;
    padding: 10px;
    color: rgb(146, 146, 146);
  }

  .searcher__input {
    width: 100%;
    border: none;
    background-color: inherit;
    outline: none;
  }
  .searcher__input::placeholder {
    color: rgb(182, 182, 182);
  }
`
