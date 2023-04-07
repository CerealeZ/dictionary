import React, { createContext, useState } from "react"
import type { Theme, ThemesName } from "@/src/interfaces/themes"
import useDevice, { Breakpoint } from "@/src/hooks/useDevice"

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode
}) => {
  const [theme, setTheme] = useState<ThemesName>("white")
  const { breakpoint } = useDevice()
  const selectedTheme = themes.get(theme) as Theme
  if (!breakpoint) return null

  const value = { setTheme, theme: selectedTheme, themeName: theme, breakpoint }
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const themes = new Map<ThemesName, Theme>([
  [
    "white",
    {
      background: "white",
      color: "black",
      highligthColor: "#0b6df6",
    },
  ],
  [
    "black",
    {
      background: "#23201b",
      color: "white",
      highligthColor: "#4d8def",
    },
  ],
])

const AppContext = createContext<{
  setTheme: (value: ThemesName) => void
  theme: Theme
  themeName: ThemesName
  breakpoint: Breakpoint
} | null>(null)

export default AppContext
