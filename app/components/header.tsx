import clsx from "clsx"
import {
  Compass,
  FolderHeart,
  LogOut,
  Menu,
  Settings,
  Terminal,
  Trophy,
  X,
} from "lucide-react"
import { UserType } from "~/types/user"
import { Link, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { UploadIcon } from "./icons"
import ModalButton from "./modal-button"
import SettingModal from "./setting-modal"
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
  const data = useLoaderData<{ user?: UserType }>()
  const user = data?.user
  const [open, setModalVisible] = useState(false)

  const showModal = () => setModalVisible(true)
  const closeModal = () => setModalVisible(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState<{
    compass: boolean
    upload: boolean
    search: boolean
  }>({ compass: false, upload: false, search: false })

  const setHoverValue = (key: keyof typeof isHovered, value: boolean) =>
    setIsHovered((prev) => ({ ...prev, [key]: value }))

  return (
    <>
      <header className="sticky top-0 z-50  border-gray-200">
        <div className="max-w-5xl mx-auto flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-gray-800" />
            <h1 className="text-xl font-mono font-semibold text-gray-800">
              OddDevs 🎭
            </h1>
          </div>
          <div className="flex gap-x-4 items-center">
            <ModalButton
              variant="ghost"
              onMouseEnter={() => setHoverValue("upload", true)}
              onMouseLeave={() => setHoverValue("upload", false)}
              modalContent={(closeModal) => (
                <UploadModal onClose={closeModal} />
              )}
              className="p-0 flex items-center gap-x-3 text-gray-600 hover:text-gray-800 hover:bg-transparent hover:underline underline-offset-2"
            >
              <p className="hidden sm:block text-sm font-medium">{`meme.upload()`}</p>

              <div
                className={clsx(
                  "flex items-center text-white justify-center h-8 w-8 max-w-8 rounded-sm bg-gray-800 transition duration-150 ease-in-out",
                  { "bg-gray-900": isHovered.upload }
                )}
              >
                <UploadIcon animate={isHovered.upload} />
              </div>
            </ModalButton>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="relative p-0 rounded-full overflow-hidden h-8 max-w-8 w-8"
                  >
                    <Avatar>
                      <AvatarImage src={user.photo} alt={`@${user.name}`} />
                      <AvatarFallback>
                        {user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={10}
                  className="w-40"
                  align="end"
                  forceMount
                >
                  {/* <DropdownMenuItem>
                    <Folder className="mr-2 h-4 w-4" />
                    Collection
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={showModal}>
                    <Button variant="ghost" className="p-0 h-auto font-normal">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="w-8" />
            )}

            <button
              type="button"
              className="md:hidden text-gray-600 hover:text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-gray-200 p-4">
          <nav className="flex flex-col space-y-4 items-end">
            <Link
              to="/explore"
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out flex items-center"
            >
              <Compass className="h-4 w-4 mr-2" />
              Explore
            </Link>
            <Link
              to="tournament"
              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out flex items-center"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Tournament
            </Link>
            {user && (
              <Link
                to="collection"
                className="text-sm font-medium text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out flex items-center"
              >
                <FolderHeart className="h-4 w-4 mr-2" />
                Collection
              </Link>
            )}
          </nav>
        </div>
      )}

      {open && <SettingModal user={user} onClose={closeModal} />}
    </>
  )
}
