import clsx from "clsx"
import { Clock, Flame, Sun, Terminal } from "lucide-react"
import { authenticator } from "~/auth.server"
import MainLayout from "~/components/main-layout"
import WorldCup from "~/components/tournament"
import { LoaderFunction, json } from "@remix-run/node"
import { useState } from "react"

const tournaments = [
  {
    id: 1,
    title: "Summer Chess Championship",
    createdAt: "2023-05-15",
    startDate: "2023-06-15",
    thumbnail:
      "https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg",
    tags: ["Chess", "Strategy"],
    participantCount: 64,
  },
  {
    id: 2,
    title: "Rocket League World Cup",
    createdAt: "2023-05-20",
    startDate: "2023-07-01",
    thumbnail:
      "https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg",

    tags: ["E-Sports", "Racing"],
    participantCount: 32,
  },
  {
    id: 3,
    title: "Global Poker Series",
    createdAt: "2023-05-25",
    startDate: "2023-06-30",
    thumbnail:
      "https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg",
    tags: ["Poker", "Cards"],
    participantCount: 128,
  },
]

type SortOrder = "latest" | "allTimePopular" | "todayPopular"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  return json({ user })
}

export default function Tournament() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest")
  return (
    <MainLayout>
      <div className="max-w-lg mx-auto space-y-8">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          <div className="flex w-full flex-row justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Tournament</h2>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setSortOrder("latest")}
                className={clsx(
                  "flex items-center justify-center w-8 h-8 rounded-full transition duration-150 ease-in-out bg-gray-200 text-gray-600 hover:bg-gray-300",
                  { "bg-gray-800 text-white": sortOrder === "latest" }
                )}
                aria-label="Sort by latest"
              >
                <Clock className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setSortOrder("allTimePopular")}
                className={clsx(
                  "flex items-center justify-center w-8 h-8 rounded-full transition duration-150 ease-in-out bg-gray-200 text-gray-600 hover:bg-gray-300",
                  { "bg-gray-800 text-white": sortOrder === "allTimePopular" }
                )}
                aria-label="Sort by all-time popularity"
              >
                <Flame className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setSortOrder("todayPopular")}
                className={clsx(
                  "flex items-center justify-center w-8 h-8 rounded-full transition duration-150 ease-in-out bg-gray-200 text-gray-600 hover:bg-gray-300",
                  { "bg-gray-800 text-white": sortOrder === "todayPopular" }
                )}
                aria-label="Sort by today's popularity"
              >
                <Sun className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 space-y-4">
          {tournaments.map((tournament) => (
            <WorldCup key={tournament.id} tournament={tournament} />
          ))}
        </main>
      </div>
    </MainLayout>
  )
}
