import { Theme } from "@/src/interfaces/themes"
import css from "styled-jsx/css"

interface LayoutProps {
  colorSwitcher?: JSX.Element
  searcher?: JSX.Element
  history?: JSX.Element
  theme?: Theme
}

export const MobileLayout: React.FC<LayoutProps> = ({
  colorSwitcher,
  searcher,
  history,
  theme,
}) => {
  return (
    <div className="layout">
      <div className="layout__header">
        <h1 className="layout__title">Dictionary</h1>
        {colorSwitcher}
      </div>
      <div className="layout__searcher">{searcher}</div>
      <div className="layout__history">
        <h2 className="layout__sub-title">Recent</h2>
        {history}
      </div>
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-sizing: border-box;
          min-height: 100vh;
          background-color: ${theme?.background || 'auto'};
        }
        .layout__header {
          margin-top: 10vh;
          display: flex;
          align-items: baseline;
          gap: 20px;
          font-size: 1.5rem;
        }
        .layout__title {
          font-size: 2rem;
          color: ${theme?.color || 'auto'};
        }
        .layout__sub-title {
          color: ${theme?.color || 'auto'};
          font-size: 1.5rem;
        }

        .layout__searcher {
        }
        .layout__history {
        }
      `}</style>
    </div>
  )
}

const layoutStyles = css`
  .layout {
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    min-height: 100vh;
  }
  .layout__header {
    margin-top: 10vh;
    display: flex;
    align-items: baseline;
    gap: 20px;
    font-size: 1.5rem;
  }
  .layout__title {
    font-size: 2rem;
  }
  .layout__sub-title {
    font-size: 1.5rem;
  }

  .layout__searcher {
  }
  .layout__history {
  }
`

export const DesktopLayout: React.FC<LayoutProps> = ({
  colorSwitcher,
  history,
  searcher,
  theme,
}) => {
  return (
    <div className="layout">
      <div className="layout__body">
        <div className="layout__header">
          <h1>Dictionary</h1>
          {colorSwitcher}
        </div>
        <div>{searcher}</div>
        <div className="layout__history">
          <h2>Recents</h2>
          {history}
        </div>
      </div>

      <style jsx>
        {`
          .layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 200px;
            min-height: 100vh;
            box-sizing: border-box;
            background-color: ${theme?.background || "auto"};
          }
          .layout__body {
            max-width: 800px;
            width: 100%;
            display: grid;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .layout__header {
            display: flex;
            gap: 20px;
            align-items: center;
            font-size: 1.3rem;
            color: ${theme?.color || "auto"};
          }
          .layout__history {
            color: ${theme?.color || "auto"};
            display: flex;
            gap: 20px;
            flex-direction: column;
          }

          h1,
          h2 {
            margin: 0;
          }
        `}
      </style>
    </div>
  )
}
