import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { authenticator } from "~/auth.server"
import { supabase } from "~/supabase.server"
import { LoaderFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from "../components/header"
import Post from "../components/post"
import Tags from "../components/tags"

type BaseEntityType = { id: string; created_at: string; updated_at: string }
type PostType = BaseEntityType & {
  id: string
  title: string
  tags: string[]
  image: string
  user: { photo: string; name: string }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get("page") || "1")
  const offset = (page - 1) * 10

  const user = await authenticator.isAuthenticated(request)
  const { data: posts, error }: PostgrestSingleResponse<PostType[]> =
    await supabase
      .from("posts")
      .select("*, user:users(*)")

      .range(offset, offset + 10 - 1)

  if (error) {
    throw new Response("Failed to fetch posts", { status: 500 })
  }

  return json({ user, posts })
}
export default function App() {
  const { posts } = useLoaderData<{ posts: PostType[] }>()

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div ref={containerRef} className="max-w-3xl mx-auto px-4 py-6">
            <Tags posts={posts} />
            <div className="space-y-12">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
