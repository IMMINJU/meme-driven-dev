import clsx from "clsx"
import { Compass, LogOut, Settings, Upload } from "lucide-react"
import { useNavigate } from "@remix-run/react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ModalButton from "./modal-button"
import UploadModal from "./upload-modal"

const userId = null

export default function Header() {
  // const userId = useLoaderData<string>()
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState<{
    compass: boolean
    upload: boolean
  }>({ compass: false, upload: false })
  console.log({ userId })
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
            <Upload
              className={clsx("w-5 h-5 transition-all duration-700", {
                "animate-arrow-updown": isHovered.upload,
              })}
            />
            <span className="sr-only">Upload</span>
          </ModalButton>
          {userId && (
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
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => {}}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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
