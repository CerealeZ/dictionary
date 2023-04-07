import useLocalStorage from "@/src/hooks/useLocalStorage"
import css from "styled-jsx/css"
import Link from "next/link"
import { Theme } from "@/src/interfaces/themes"

interface HistoryProps {
  onWordClick?: (word: string) => void
  theme?: Theme
}

export default function History({ onWordClick, theme }: HistoryProps) {
  const [recentWords] = useLocalStorage<string[]>("searchs", [])

  return (
    <div className="history">
      {recentWords?.map((word, key) => (
        <Link href={`/${word}`} key={key} legacyBehavior>
          <a className="history__element">{word}</a>
        </Link>
      ))}
      <style jsx>{`
        .history {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: start;
        }

        .history__element {
          color: ${theme?.color || "auto"};
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}
