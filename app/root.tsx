import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react"
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
