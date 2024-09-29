import { Cog, Hammer, Wrench } from "lucide-react"
import { LoaderFunction, MetaFunction, json } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { authenticator } from "./auth.server"
import "./tailwind.css"

const tools = [Wrench, Hammer, Cog]

export function ErrorBoundary() {
  const [wobble, setWobble] = useState(0)
  const [currentTool, setCurrentTool] = useState(0)

  useEffect(() => {
    const wobbleInterval = setInterval(() => {
      setWobble(Math.random() * 20 - 10)
    }, 100)

    const toolInterval = setInterval(() => {
      setCurrentTool((prev) => (prev + 1) % tools.length)
    }, 1000)

    return () => {
      clearInterval(wobbleInterval)
      clearInterval(toolInterval)
    }
  }, [])

  const Tool = tools[currentTool]

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-full shadow-xl p-8 w-64 h-64 flex flex-col items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${wobble}deg)` }}
        >
          {[...Array(20)].map((_, i) => (
            <Cog
              key={i}
              className="text-gray-300 absolute"
              size={40 + i * 10}
              style={{
                animation: `spin ${10 + i}s linear infinite${i % 2 ? " reverse" : ""}`,
                opacity: 0.1 + i * 0.02,
              }}
            />
          ))}
        </div>
        <Tool className="w-24 h-24 text-red-500 relative z-10 animate-bounce" />
        <h1 className="text-2xl font-bold mt-4 text-gray-800 relative z-10">
          Oops!
        </h1>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="absolute bottom-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
      >
        Try Again
      </button>
    </div>
  )
}

export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { title: "OddDevs" },
  { property: "og:title", content: "OddDevs" },
  { property: "og:image", content: "/favicon.ico" },
]

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  return json({ user })
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Toaster />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
