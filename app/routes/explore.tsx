import { PostgrestSingleResponse } from "@supabase/supabase-js"
import clsx from "clsx"
import { Clock, Flame, Sun, Terminal } from "lucide-react"
import { authenticator } from "~/auth.server"
import { FlowerIcon } from "~/components/icons"
import MainLayout from "~/components/main-layout"
import { supabase } from "~/supabase.server"
import { PostType } from "~/types/post"
import { ActionFunction, LoaderFunction, json } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import Post from "../components/post"

const pageSize = 10

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const {
    data: initialPosts,
    error,
    count,
  }: PostgrestSingleResponse<PostType[]> = await supabase
    .from("posts")
    .select("*, user:users(*)", { count: "exact" })
    .range(0, pageSize - 1)

  if (error) {
    return json({ user, initialPosts: [] })
  }

  return json({ user, initialPosts, totalCount: count })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const page = Number(formData.get("page"))

  const from = page * pageSize
  const to = from + pageSize - 1

  const { data, error }: PostgrestSingleResponse<PostType[]> = await supabase
    .from("posts")
    .select("*")
    .range(from, to)

  if (error) {
    return json({ posts: [] })
  }

  return json({ posts: data })
}

type SortOrder = "latest" | "allTimePopular" | "todayPopular"

export default function Explore() {
  const { initialPosts, totalCount } = useLoaderData<{
    initialPosts: PostType[]
    totalCount: number
  }>()
  const fetcher = useFetcher<{ posts: PostType[] }>()
  const [posts, setPosts] = useState(initialPosts)
  const [hasMore, setHasMore] = useState(posts.length < totalCount)
  const [page, setPage] = useState(1) // 현재 페이지 상태

  const observerRef = useRef<HTMLDivElement | null>(null)

  const [sortOrder, setSortOrder] = useState<SortOrder>("latest")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && fetcher.state !== "submitting" && hasMore) {
          fetcher.submit({ page: String(page) }, { method: "post" })
        }
      },
      { threshold: 1.0 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [fetcher, page, hasMore])

  useEffect(() => {
    if (fetcher.data && fetcher.data.posts) {
      setPosts((prevPosts) => [...prevPosts, ...(fetcher.data?.posts || [])])
      setPage((prevPage) => prevPage + 1)

      if (fetcher.data.posts.length === 0) {
        setHasMore(false)
      }
    }
  }, [fetcher.data])

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto space-y-8">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          <div className="flex w-full flex-row justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Explore</h2>
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
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

        {/* 로딩 중일 때 표시 */}
        {fetcher.state === "submitting" && (
          <div className="flex items-center justify-center">
            <FlowerIcon className="animate-spin" />
          </div>
        )}

        <div ref={observerRef} className="h-10" />

        {!hasMore && (
          <div className="flex items-center justify-center">
            <FlowerIcon />
          </div>
        )}
      </div>
    </MainLayout>
  )
}
