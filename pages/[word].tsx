import { useRouter } from "next/router"
import WordDefinition from "@/src/components/wordDefinition"
import ColorSwitcher from "@/src/components/colorSwitcher"
import Searcher from "@/src/components/searcher"
import { Layout as WordLayout } from "@/src/layouts/Word"
import Head from "@/src/components/head"
import { capitalizeWords } from "@/src/utils/utils"
import { Header } from "@/src/components/header"
import { useWordRecord } from "@/src/hooks/useWordRecord"

export default function Word() {
  const router = useRouter()
  const { word: wordName } = router.query as Partial<Record<string, string>>
  const { addWord } = useWordRecord()
  if (!wordName) return null
  const formattedTitle = capitalizeWords(wordName)

  const goToDefinition = (word: string) => {
    router.push(`/${word}`)
  }

  return (
    <>
      <Head
        title={`${formattedTitle} - Dictionary`}
        description={`Definitions of the ${formattedTitle} word`}
      />

      <WordLayout
        header={(isBodyHidden) => (
          <Header
            searchBox={<Searcher onSearch={goToDefinition} />}
            isShinkred={isBodyHidden}
            themeButton={<ColorSwitcher themeName="black" setter={() => null} />}
          />
        )}
      >
        <WordDefinition
          onWordLoad={() => {
            addWord(wordName)
          }}
          word={wordName}
        />
      </WordLayout>
    </>
  )
}
