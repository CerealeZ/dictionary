import Searcher from "@/src/components/searcher"
import History from "@/src/components/history"
import AppContext from "@/src/contexts/AppContext"
import { MobileLayout, DesktopLayout } from "@/src/layouts/Home"

import { useContext } from "react"
import { useRouter } from "next/router"
import ColorSwitcher from "@/src/components/colorSwitcher"
import Head from "@/src/components/head"

export default function Home() {
  const router = useRouter()
  const context = useContext(AppContext)
  if (!context) return null
  const { setTheme, themeName, theme, breakpoint } = context
  const goToDefinition = (word: string) => {
    router.push(`/${word}`)
  }

  return (
    <>
      <Head title="Dictionary" description="Definitions of the words searched" />
      {["XL", "LG"].includes(breakpoint.size) ? (
        <DesktopLayout
          colorSwitcher={
            <ColorSwitcher
              themeName={themeName}
              theme={theme}
              setter={setTheme}
            />
          }
          searcher={<Searcher theme={theme} onSearch={goToDefinition} />}
          history={<History theme={theme} />}
          theme={theme}
        />
      ) : (
        <MobileLayout
          colorSwitcher={
            <ColorSwitcher
              theme={theme}
              themeName={themeName}
              setter={setTheme}
            />
          }
          theme={theme}
          history={<History theme={theme} />}
          searcher={<Searcher theme={theme} onSearch={goToDefinition} />}
        />
      )}
    </>
  );
}
