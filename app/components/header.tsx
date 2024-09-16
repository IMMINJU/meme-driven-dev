import clsx from "clsx"
import {
  Code,
  Compass,
  Folder,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  Trophy,
  Upload,
} from "lucide-react"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { useState } from "react"
import { UploadIcon } from "./icons"
import ModalButton from "./modal-button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import UploadModal from "./upload-modal"

export default function Header() {
  const navigate = useNavigate()
  const { user } = useLoaderData()
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState<{
    compass: boolean
    upload: boolean
    search: boolean
  }>({ compass: false, upload: false, search: false })

  const setHoverValue = (key: keyof typeof isHovered, value: boolean) =>
    setIsHovered((prev) => ({ ...prev, [key]: value }))

  return (
    <header className="mb-12 min-h-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-mono font-bold flex items-center">
          <Code className="mr-2 text-green-600" />
          DevShots
        </h1>
        {!isSearchVisible && (
          <nav className="hidden md:flex items-center space-x-4 font-mono">
            <button
              onClick={() => navigate("/tournament")}
              className="relative text-sm text-gray-700 hover:text-green-600 transition-colors flex items-center"
            >
              <Trophy className="mr-2 h-4 w-4" />
              <Sparkles
                className="absolute -top-1 left-3 w-3 h-3 transition-all animate-sparkle"
                aria-hidden="true"
              />
              Tournament
            </button>
            <button
              onMouseEnter={() => setHoverValue("compass", true)}
              onMouseLeave={() => setHoverValue("compass", false)}
              onClick={() => navigate("/explore")}
              className="text-sm text-gray-700 hover:text-green-600 transition-colors flex items-center"
            >
              <Compass
                className={clsx(
                  "mr-2 w-4 h-4 transition-transform duration-500 ease-in-out",
                  { "-rotate-90": isHovered.compass }
                )}
              />
              Explore
            </button>
            <ModalButton
              variant="ghost"
              onMouseEnter={() => setHoverValue("upload", true)}
              onMouseLeave={() => setHoverValue("upload", false)}
              modalContent={() => <UploadModal />}
              className="text-gray-700 p-0 hover:text-green-600 flex items-center gap-x-1"
            >
              <UploadIcon animate={isHovered.upload} />
              Upload
            </ModalButton>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photo} alt={`@${user.name}`} />
                      <AvatarFallback>
                        {user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={22}
                  className="w-40"
                  align="end"
                  forceMount
                >
                  <DropdownMenuItem>
                    <Folder className="mr-2 h-4 w-4" />
                    Collection
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    <ModalButton
                      variant="ghost"
                      className="p-0 h-auto font-normal"
                      modalContent={() => <UploadModal />}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </ModalButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <button
              onClick={() => setIsSearchVisible(true)}
              onMouseEnter={() => setHoverValue("search", true)}
              onMouseLeave={() => setHoverValue("search", false)}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              <Search
                className={clsx(
                  "h-5 w-5 transition-transform duration-300 ease-in-out",
                  { "rotate-90": isHovered.search }
                )}
              />
            </button>
          </nav>
        )}
        {isSearchVisible && (
          <div className="hidden md:flex items-center w-full max-w-md transition-all ease-in-out duration-300">
            <input
              placeholder="Search posts"
              className="w-full pl-3 pr-10 py-2 bg-white border border-gray-300 rounded-md font-mono text-sm"
            />
            <button
              onClick={() => setIsSearchVisible(false)}
              className="text-sm ml-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
        <button
          className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border border-gray-200 rounded-md shadow-lg p-4 space-y-2">
          <button className="w-full text-left text-gray-700 hover:text-green-600 transition-colors flex items-center py-2">
            <Compass className="mr-2 h-4 w-4" />
            Explore
          </button>
          <button className="w-full text-left text-gray-700 hover:text-green-600 transition-colors flex items-center py-2">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </button>
          <button className="w-full text-left text-gray-700 hover:text-green-600 transition-colors flex items-center py-2">
            <Trophy className="mr-2 h-4 w-4" />
            Worldcup
          </button>
          <div className="relative">
            <input
              placeholder="Search posts"
              className="w-full pl-3 pr-10 py-2 bg-gray-100 border border-gray-300 rounded-md font-mono text-sm"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}
    </header>
  )
}
