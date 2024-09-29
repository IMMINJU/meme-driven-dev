import { LogOut, Menu, Upload, User } from "lucide-react"
import { UserType } from "~/types/user"
import { Form, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { Dialog } from "./ui/dialog"
import UploadModal from "./upload-modal"

export default function Header({ setShowSidebar }) {
  const data = useLoaderData<{ user?: UserType }>()
  const user = data?.user

  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [openUploadModal, setUploadModalVisible] = useState(false)

  return (
    <>
      <header className="bg-green-300 p-4 transform rotate-1 flex justify-between items-center z-10">
        <div className="flex items-center">
          <button
            type="button"
            className="mr-4 lg:hidden text-purple-600 hover:text-purple-800"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 animate-pulse">
            {`<OddDevs `}
            <span className="hidden sm:inline-block">{`error={true}`}</span>
            {` />`}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setUploadModalVisible(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            <Upload size={24} />
          </button>
          <div className="relative">
            {user && (
              <button
                type="button"
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <User size={24} />
              </button>
            )}
            {user && showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-pink-400 to-purple-500 rounded-md shadow-lg py-1 z-10 transform -rotate-3">
                <Form method="post" action="/logout">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm text-white hover:bg-opacity-20 hover:bg-black flex items-center"
                  >
                    <LogOut size={18} className="mr-2 animate-bounce" />{" "}
                    {"<Logout />"}
                  </button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </header>

      {openUploadModal && (
        <Dialog
          open={openUploadModal}
          onOpenChange={() => setUploadModalVisible(false)}
        >
          <UploadModal onClose={() => setUploadModalVisible(false)} />
        </Dialog>
      )}
    </>
  )
}
