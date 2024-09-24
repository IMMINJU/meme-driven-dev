import { ThumbsUp, Users } from "lucide-react"
import { Link } from "@remix-run/react"
import { useEffect, useState } from "react"

type PopularPost = {
  id: number
  title: string
  likes: number
}

type Tournament = {
  id: number
  title: string
  participants: number
}

const Rank = () => {
  const [popularPosts, setPopularPosts] = useState<PopularPost[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])

  useEffect(() => {
    const initialPopularPosts: PopularPost[] = [
      { id: 1, title: "10 React Hooks You Must Know", likes: 230 },
      { id: 2, title: "The Future of JavaScript", likes: 185 },
      { id: 3, title: "Building Scalable Node.js Apps", likes: 162 },
    ]
    setPopularPosts(initialPopularPosts)

    const initialTournaments: Tournament[] = [
      { id: 1, title: "React Code Challenge", participants: 256 },
      { id: 2, title: "Vue.js Hackathon", participants: 128 },
      { id: 3, title: "JavaScript Algorithms", participants: 512 },
    ]
    setTournaments(initialTournaments)
  }, [])

  return (
    <aside className="hidden md:block w-48 p-4 overflow-y-auto scrollbar-hide border-t md:border-t-0 md:border-l border-gray-200">
      <div className="space-y-6">
        {/* Popular Posts */}
        <section>
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Popular Posts
          </h2>
          <ul className="space-y-2">
            {popularPosts.map((post) => (
              <li
                key={post.id}
                className="text-xs flex items-center justify-between"
              >
                <Link
                  to="#"
                  className="hover:text-gray-600 transition duration-150 ease-in-out truncate flex-1"
                >
                  {post.title}
                </Link>
                <span className="flex items-center text-gray-500 ml-2">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {post.likes}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tournaments */}
        <section>
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            Tournaments
          </h2>
          <ul className="space-y-2">
            {tournaments.map((tournament) => (
              <li
                key={tournament.id}
                className="text-xs flex items-center justify-between"
              >
                <Link
                  to="#"
                  className="hover:text-gray-600 transition duration-150 ease-in-out truncate flex-1"
                >
                  {tournament.title}
                </Link>
                <span className="flex items-center text-gray-500 ml-2">
                  <Users className="h-3 w-3 mr-1" />
                  {tournament.participants}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  )
}

export default Rank
