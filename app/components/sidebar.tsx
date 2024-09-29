import { Code, FolderHeartIcon } from "lucide-react"
import { UserType } from "~/types/user"
import { useLoaderData } from "@remix-run/react"

const Sidebar = ({ showSidebar }) => {
  const data = useLoaderData<{ user?: UserType }>()
  const user = data?.user

  return (
    <aside
      className={`${showSidebar ? "block" : "hidden"} lg:block w-full lg:w-64 bg-blue-400 p-4 transform -skew-x-3 overflow-y-auto`}
    >
      <h2 className="mb-4 text-xl md:text-2xl font-bold animate-bounce">
        OddDevs.exe
      </h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="/explore"
              className="flex items-center text-lg md:text-xl hover:text-red-500"
            >
              <Code className="mr-2 animate-spin" />
              <span>{"<Home />"}</span>
            </a>
          </li>
          {user && (
            <li>
              <a
                href="/collection"
                className="flex items-center text-xs md:text-sm hover:text-blue-700"
              >
                <FolderHeartIcon className="mr-2 animate-pulse" />
                <span>{"<Collection />"}</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
