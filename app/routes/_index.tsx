import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "../components/header"
import Post from "../components/post"
import Tags from "../components/tags"

const POSTS = [
  {
    id: "1",
    title: "When you're trying to debug your code",
    tags: ["cat", "funny"],
    image: "https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg",
    user: { name: "John", avatar: "https://i.imgflip.com/28s2gu.jpg" },
  },
  {
    id: "2",
    tags: ["programming", "joke"],
    image: "https://i.redd.it/72tsdugsv9841.jpg",
    user: { name: "Jane", avatar: "https://i.imgflip.com/28s2gu.jpg" },
  },
  {
    id: "3",
    title: "Classic meme face",
    tags: ["movie", "reference"],
    image: "https://i.imgflip.com/28s2gu.jpg",
    user: { name: "Bob", avatar: "https://i.imgflip.com/28s2gu.jpg" },
  },
  {
    id: "4",
    tags: ["relatable", "life"],
    image: "https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg",
    user: { name: "Alice", avatar: "https://i.imgflip.com/28s2gu.jpg" },
  },
  {
    id: "5",
    title: "Tech support be like",
    tags: ["tech", "humor"],
    image:
      "https://i.kym-cdn.com/entries/icons/original/000/030/157/womanyellingcat.jpg",
    user: { name: "Charlie", avatar: "https://i.imgflip.com/28s2gu.jpg" },
  },
]

export const loader: LoaderFunction = async () => {
  return POSTS
}

export default function App() {
  const posts: typeof POSTS = useLoaderData()

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div ref={containerRef} className="max-w-3xl mx-auto px-4 py-6">
            <Tags posts={posts} />
            <div className="space-y-12">
              {posts.map((post, index) => (
                <Post
                  key={post.id}
                  containerRef={containerRef}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
