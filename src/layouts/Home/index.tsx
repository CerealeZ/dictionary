import { Theme } from "@/src/interfaces/themes"
import css from "styled-jsx/css"

interface LayoutProps {
  colorSwitcher?: React.ReactNode
  searcher?: React.ReactNode
  history?: React.ReactNode
  theme?: Theme
  title?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = (components) => {
  return (
    <div className="h-svh p-4 gap-y-2 grid-cols-3 grid auto-rows-min py-32 md:justify-items-center">
      <div className="col-span-3 flex gap-2 items-center max-w-4xl w-full">
        <div>{components.title}</div>
        <div>{components.colorSwitcher}</div>
      </div>
      <div className="col-span-3 max-w-4xl w-full">{components.searcher}</div>
      <div className="col-span-3 max-w-4xl w-full">{components.history}</div>
    </div>
  )
}
