import clsx from "clsx"
import {
  Compass,
  Folder,
  LogOut,
  Settings,
  Sparkles,
  Trophy,
} from "lucide-react"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UploadIcon } from "./icons"
import ModalButton from "./modal-button"
import UploadModal from "./upload-modal"

export default function Header() {
  const navigate = useNavigate()
  const { user } = useLoaderData()

  const [isHovered, setIsHovered] = useState<{
    compass: boolean
    upload: boolean
  }>({ compass: false, upload: false })

  const setHoverValue = (key: keyof typeof isHovered, value: boolean) =>
    setIsHovered((prev) => ({ ...prev, [key]: value }))

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Meme Driven Dev 🔧
        </h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-600"
            onClick={() => navigate("/tournament")}
          >
            <Trophy className="w-5 h-5" />
            <Sparkles
              className="absolute top-1 right-0 w-3 h-3 transition-all animate-sparkle"
              aria-hidden="true"
            />
            <span className="sr-only">Worldcup</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600"
            onMouseEnter={() => setHoverValue("compass", true)}
            onMouseLeave={() => setHoverValue("compass", false)}
            onClick={() => navigate("/explore")}
          >
            <Compass
              className={clsx(
                "w-5 h-5 transition-transform duration-500 ease-in-out",
                { "-rotate-90": isHovered.compass }
              )}
            />
            <span className="sr-only">Explore</span>
          </Button>

          <ModalButton
            variant="ghost"
            size="icon"
            className="text-gray-600"
            onMouseEnter={() => setHoverValue("upload", true)}
            onMouseLeave={() => setHoverValue("upload", false)}
            modalContent={() => <UploadModal />}
          >
            <UploadIcon animate={isHovered.upload} />
            <span className="sr-only">Upload</span>
          </ModalButton>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://i.imgflip.com/28s2gu.jpg"
                      alt="@user"
                    />
                    <AvatarFallback>U</AvatarFallback>
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
        </div>
      </div>
    </header>
  )
}
