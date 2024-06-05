import Searcher from "@/src/components/searcher"
import History from "@/src/components/history"
import { Layout as HomeLayout } from "@/src/layouts/Home"

import { useRouter } from "next/router"
import ColorSwitcher from "@/src/components/colorSwitcher"
import Head from "@/src/components/head"

export default function Home() {
  const router = useRouter()

  const goToDefinition = (word: string) => {
    router.push(`/${word}`)
  }

  return (
    <>
      <Head title="Dictionary" description="Definitions of the words searched" />
      <HomeLayout
        title={<h1 className="text-4xl font-bold">Dictionary</h1>}
        searcher={<Searcher onSearch={goToDefinition} />}
        history={<History onWordClick={goToDefinition} />}
        colorSwitcher={<ColorSwitcher setter={() => {}} themeName="black" />}
      />
    </>
  )
}
