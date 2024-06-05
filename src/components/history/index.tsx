import useLocalStorage from "@/src/hooks/useLocalStorage"
import Link from "next/link"
import { Theme } from "@/src/interfaces/themes"

interface HistoryProps {
  onWordClick?: (word: string) => void
  theme?: Theme
}

export default function History({ onWordClick, theme }: HistoryProps) {
  const [recentWords] = useLocalStorage<string[]>("searchs", [])

  return (
    <nav>
      <h2 className="text-2xl font-bold">Recent words</h2>
      <ul>
        {recentWords?.map((word, key) => (
          <li key={key}>
            <Link className="underline" href={`/${word}`}>
              {word}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
