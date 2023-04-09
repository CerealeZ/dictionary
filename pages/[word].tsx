import { useContext } from "react"
import { useRouter } from "next/router"
import AppContext from "@/src/contexts/AppContext"
import WordDefinition from "@/src/components/wordDefinition"
import ColorSwitcher from "@/src/components/colorSwitcher"
import Searcher from "@/src/components/searcher"

import {
  MobileLayout,
  DesktopHeader,
  DesktopLayout,
  MobileHeader,
} from "@/src/layouts/Word"
import Loading from "@/src/components/loading"
import Head from "next/head"

export default function Word() {
  const router = useRouter()
  const { word: wordName } = router.query as { [key: string]: string }
  const context = useContext(AppContext)
  if (!context) return null
  const { setTheme, themeName, theme, breakpoint } = context

  if (!wordName) return null

  return (
    <>
      <Head>
        <title>Dictionary - {wordName}</title>
      </Head>
      {["XL", "LG"].includes(breakpoint.size) ? (
        <DesktopLayout
          theme={theme}
          header={
            <DesktopHeader
              theme={theme}
              searcher={
                <Searcher onSearch={(word) => router.push(`/${word}`)} />
              }
              colorSwitcher={
                <ColorSwitcher
                  themeName={themeName}
                  theme={theme}
                  setter={setTheme}
                />
              }
              maxBodyWidth={800}
            />
          }
          body={
            <WordDefinition
              word={wordName}
              theme={theme}
              onLoading={<Loading />}
              onError={<div>{"Not found"}</div>}
            />
          }
        />
      ) : (
        <MobileLayout
          header={(isHidden) => (
            <MobileHeader
              isShinkred={isHidden}
              switcher={
                <ColorSwitcher
                  theme={theme}
                  themeName={themeName}
                  setter={setTheme}
                />
              }
              theme={theme}
              showOnShinkred={wordName}
            />
          )}
          body={
            <WordDefinition
              word={wordName}
              onLoading={<Loading />}
              theme={theme}
              onError={<div>{"Not found"}</div>}
            />
          }
          theme={theme}
        />
      )}
    </>
  );
}
