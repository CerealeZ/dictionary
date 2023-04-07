import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import type { Theme, ThemesName } from "@/src/interfaces/themes"

interface ColorSwiter {
  setter: (theme: ThemesName) => void
  themeName: ThemesName
  theme?: Theme
}

export default function ColorSwitcher({ setter, themeName, theme }: ColorSwiter) {
  return (
    <button onClick={() => setter(themeName === "black" ? "white" : "black")}>
      <FontAwesomeIcon icon={themeName === "black" ? faSun : faMoon} />
      <style jsx>{`
        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: ${theme?.color || 'auto'};
        }
      `}</style>
    </button>
  )
}
