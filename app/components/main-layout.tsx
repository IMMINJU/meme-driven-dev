import { PropsWithChildren, useState } from "react"
import Header from "./header"
import Rank from "./rank"
import Sidebar from "./sidebar"

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className="flex h-screen bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-300 font-mono text-green-800 overflow-hidden">
      <Sidebar showSidebar={showSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setShowSidebar={setShowSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 bg-opacity-50 bg-red-200 scrollbar-hide">
            {children}
          </main>

          <Rank />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
