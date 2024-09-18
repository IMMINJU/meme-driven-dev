import clsx from "clsx"
import { Compass, Sparkles, Trophy } from "lucide-react"
import { Link } from "@remix-run/react"
import { useState } from "react"
import { FolderIcon } from "./icons"

type MenuKey = { explore: boolean; tournament: boolean; collection: boolean }
const Sidebar = () => {
  const [isHovered, setIsHovered] = useState<MenuKey>({
    explore: false,
    tournament: false,
    collection: false,
  })

  const setHoverValue = (key: keyof typeof isHovered, value: boolean) =>
    setIsHovered((prev) => ({ ...prev, [key]: value }))

  const menus: {
    name: string
    to: keyof MenuKey
    icon: JSX.Element
  }[] = [
    {
      name: "Explore",
      to: "explore",
      icon: (
        <Compass
          className={clsx(
            "w-5 h-5 transition-transform duration-500 ease-in-out",
            { "-rotate-90": isHovered.explore }
          )}
        />
      ),
    },
    {
      name: "Tournament",
      to: "tournament",
      icon: (
        <>
          <Trophy className="h-5 w-5" />
          <Sparkles
            className="absolute -top-1 -right-1 w-3 h-3 transition-all animate-sparkle"
            aria-hidden="true"
          />
        </>
      ),
    },
    {
      name: "Collection",
      to: "collection",
      icon: <FolderIcon animate={isHovered.collection} />,
    },
  ]

  return (
    <nav className="hidden md:block w-full md:w-48 p-4 space-y-4 overflow-y-visible border-b-0 border-gray-200">
      <h2 className="text-base font-semibold text-gray-800">Menu</h2>
      <ul className="space-y-2">
        {menus.map((item) => (
          <li key={item.name} className="group">
            <Link
              to={`/${item.to}`}
              onMouseEnter={() => setHoverValue(item.to, true)}
              onMouseLeave={() => setHoverValue(item.to, false)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
            >
              <span className="relative p-1 bg-gray-200 rounded group-hover:bg-gray-300 transition duration-150 ease-in-out">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
