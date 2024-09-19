import { PropsWithChildren } from "react"
import Header from "./header"
import Rank from "./rank"
import Sidebar from "./sidebar"

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      <Header />

      <div className="flex-1 overflow-hidden">
        <div className="max-w-5xl mx-auto h-full flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 overflow-y-auto scrollbar-hide">
            {children}
          </main>

          <Rank />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
