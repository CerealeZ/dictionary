import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

interface Props {
  themeButton?: React.ReactNode
  searchBox?: React.ReactNode
  isShinkred?: boolean
}
export const Header: React.FC<Props> = ({ themeButton, isShinkred, searchBox }) => {
  return (
    <header
      className={
        "flex items-center justify-between text-2xl md:text-base max-w-screen-xl m-auto transition-[font-size]" +
        (isShinkred ? " text-xl" : "")
      }
    >
      <div className="hidden md:flex gap-2 items-center w-2/6">
        <Link href={"/"} className="min-h-11 min-w-11 inline-flex items-center">
          Home
        </Link>
        {searchBox}
      </div>

      <Link href={"/"} className="flex gap-1 items-center md:hidden">
        <FontAwesomeIcon icon={faChevronLeft} />
        Search
      </Link>

      <div>{themeButton}</div>
    </header>
  )
}
