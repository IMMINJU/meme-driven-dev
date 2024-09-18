import { LoaderFunction, json } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react"
import { authenticator } from "./auth.server"
import Header from "./components/header"
import Rank from "./components/rank"
import Sidebar from "./components/sidebar"
import "./tailwind.css"

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <title>{`${error.status} ${error.statusText}`}</title>
        </head>
        <body>
          <h1>
            Error {error.status}: {error.statusText}
          </h1>
          <p>{error.data}</p>
          <p>Sorry for the inconvenience.</p>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <head>
        <title>Unexpected Error</title>
      </head>
      <body>
        <h1>Something went wrong!</h1>
        <p>
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
      </body>
    </html>
  )
}

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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
