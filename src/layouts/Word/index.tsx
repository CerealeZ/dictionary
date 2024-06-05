import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef, useEffect } from "react"
import type { Theme } from "@/src/interfaces/themes"
import Link from "next/link"
import css from "styled-jsx/css"

interface MobileHeaderProps {
  switcher?: JSX.Element
  isShinkred: boolean
  showOnShinkred: string
  theme?: Theme
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = (components) => {
  const [isHidden, setIsHidden] = useState(false)
  const main = useRef<HTMLDivElement>(null)
  const renderedHeader =
    typeof components.header === "function" ? components.header(isHidden) : components.header

  useEffect(function checkBodyIsHidden() {
    if (!main) return
    const checkHeaderIsHidden = () => {
      if (!main.current) return
      const isOnTop = main.current?.getBoundingClientRect().top <= 0
      setIsHidden(isOnTop)
    }
    window.addEventListener("scroll", checkHeaderIsHidden)
    return () => {
      window.removeEventListener("scroll", checkHeaderIsHidden)
    }
  }, [])

  return (
    <div className="flex flex-col relative gap-6">
      <div className="border-b px-2 py-1 top-0 sticky z-10 bg-white">{renderedHeader}</div>
      <div ref={main} className="flex-1 px-2 py-1">
        <div className="m-auto max-w-screen-xl">
          <main className="max-w-screen-md">{components.children}</main>
        </div>
      </div>
    </div>
  )
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isShinkred,
  showOnShinkred,
  switcher,
  theme,
}) => {
  return (
    <div className="header">
      <Link href={"/"} legacyBehavior>
        <a className="header__search-link">
          <FontAwesomeIcon icon={faChevronLeft} /> {!isShinkred && "Search"}
        </a>
      </Link>
      <div className="header__title">{isShinkred && showOnShinkred}</div>
      {switcher && switcher}
      <style jsx>
        {`
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: ${isShinkred ? "1.3rem" : "1.5rem"};
            transition: font-size 200ms;
            background-color: ${theme?.background || "auto"};
          }
          .header__search-link {
            text-decoration: none;
            color: ${theme?.highligthColor || "auto"};
          }
          .header__title {
            color: ${theme?.color || "auto"};
          }
        `}
      </style>
    </div>
  )
}

interface LayoutProps {
  header?: JSX.Element | ((isHidden: boolean) => JSX.Element)
  body?: JSX.Element
  children?: React.ReactNode
  theme?: Theme
}

export const MobileLayout: React.FC<LayoutProps> = ({ body, header, theme }) => {
  const { className: hash, styles } = layoutStyles(theme)
  const [isHidden, setIsHidden] = useState(false)
  const main = useRef<HTMLElement>(null)
  const renderedHeader = typeof header === "function" ? header(isHidden) : header

  useEffect(function checkBodyIsHidden() {
    if (!main) return
    const checkHeaderIsHidden = () => {
      if (!main.current) return
      const isOnTop = main.current?.getBoundingClientRect().top <= 0
      setIsHidden(isOnTop)
    }
    window.addEventListener("scroll", checkHeaderIsHidden)
    return () => {
      window.removeEventListener("scroll", checkHeaderIsHidden)
    }
  }, [])

  return (
    <div className={`layout ${hash}`}>
      <div className={`layout__header ${hash}`}>{renderedHeader}</div>
      <main ref={main} className={`layout__body ${hash}`}>
        {body}
      </main>
      {styles}
    </div>
  )
}

const layoutStyles = (theme?: Theme) => {
  return css.resolve`
    .layout {
      display: flex;
      flex-direction: column;
      gap: 40px;
      background-color: ${theme?.background || "auto"};
      box-sizing: border-box;
      min-height: 100vh;
    }
    .layout__header {
      border-bottom: solid 1px rgb(236, 236, 236);
      position: sticky;
      top: 0;
      padding: 5px;
      background-color: ${theme?.background || "auto"};
      z-index: 1;
      transition:
        font-size 1s,
        padding 1s;
    }

    .layout__body {
      padding: 0px 10px;
    }

    .search-button {
      color: #4350ff;
      text-decoration: none;
    }
    .search-button__icon {
      font-weight: bold;
    }
  `
}

interface DesktopLayoutProps {
  header: JSX.Element
  body: JSX.Element
  maxBreak?: number
  theme?: Theme
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({ body, header, theme }) => {
  return (
    <div className="layout">
      <div className="layout__header">
        <header className="layout__header-body">{header}</header>
      </div>
      <div className="layout__main">
        <main className="layout__main-body">
          <div className="layout__fixed-block">{body}</div>
        </main>
      </div>
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
          min-height: 100vh;
          background-color: ${theme?.background || "white"};
        }
        .layout__header,
        .layout__main {
          display: flex;
          justify-content: center;
        }
        .layout__header {
          background-color: ${theme?.background || "#f8f5f2"};
          padding: 5px 20px;
        }
        .layout__main {
          padding: 0 20px;
        }
        .layout__header-body,
        .layout__main-body {
          width: 100%;
          max-width: 1500px;
        }

        .layout__fixed-block {
          max-width: 800px;
        }
      `}</style>
    </div>
  )
}

interface DesktopHeaderProps {
  searcher?: JSX.Element
  backButton?: JSX.Element
  colorSwitcher?: JSX.Element
  maxBodyWidth: number
  theme?: Theme
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  theme,
  searcher,
  colorSwitcher,
  maxBodyWidth,
}) => {
  return (
    <div className="header">
      <div className="header__fixed-block">
        <div className="header__back-button">
          <Link href={"/"} legacyBehavior>
            <a className="link">Home</a>
          </Link>
        </div>
        <div className="header__searcher">{searcher}</div>
      </div>
      <div className="header__color-switcher">{colorSwitcher}</div>
      <style jsx>
        {`
          .header {
            display: flex;
            align-items: center;
            background-color: ${theme?.background || "auto"};
            color: ${theme?.color || "auto"};
          }

          .header__fixed-block {
            display: flex;
            width: ${maxBodyWidth}px;
            gap: 10px;
            align-items: center;
          }

          .header__color-switcher {
            margin-left: auto;
          }

          .header__searcher {
            flex-grow: 1;
          }
          .link {
            text-decoration: none;
            color: inherit;
          }
        `}
      </style>
    </div>
  )
}
