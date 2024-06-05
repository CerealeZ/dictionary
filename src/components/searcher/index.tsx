import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Theme } from "@/src/interfaces/themes"

interface SearcherProps {
  onSearch: (word: string) => void
  theme?: Theme
}
export default function Searcher({ onSearch }: SearcherProps) {
  const word = useRef<string>("")
  return (
    <form
      className="flex items-center rounded gap-2 p-2 w-full bg-gray-100"
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
        className="w-full border-none bg-inherit outline-none"
        id="word"
        placeholder="hello, world..."
        type={"search"}
        name="word"
      />
    </form>
  )
}
