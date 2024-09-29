import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { authenticator } from "~/auth.server"
import { FlowerIcon } from "~/components/icons"
import MainLayout from "~/components/main-layout"
import Post from "~/components/post"
import { supabase } from "~/supabase.server"
import { PostType } from "~/types/post"
import { ActionFunction, LoaderFunction, json } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"

const pageSize = 10

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const url = new URL(request.url)

  const env = {
    SUPABASE_BUCKET_URL: process.env.SUPABASE_BUCKET_URL,
    rootUrl: url.origin,
  }
  if (!user) {
    throw new Response("Not Found", { status: 404 })
  }

  const {
    data: initialPosts,
    error,
    count,
  }: PostgrestSingleResponse<PostType[]> = await supabase
    .from("posts")
    .select("*, user:users(*)", { count: "exact" })
    .eq("user_id", user.id)
    .range(0, pageSize - 1)
    .order("created_at", { ascending: false })

  if (error) {
    return json({ user, initialPosts: [], ...env })
  }

  return json({ user, initialPosts, totalCount: count, ...env })
}

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const formData = await request.formData()
  const page = Number(formData.get("page"))

  const from = page * pageSize
  const to = from + pageSize - 1

  const { data, error }: PostgrestSingleResponse<PostType[]> = await supabase
    .from("posts")
    .select("*, user:users(*)", { count: "exact" })
    .eq("user_id", user?.id)
    .range(from, to)

  if (error) {
    return json({ posts: [] })
  }

  return json({ posts: data })
}

export default function Collection() {
  const { initialPosts, totalCount } = useLoaderData<{
    initialPosts: PostType[]
    totalCount: number
  }>()
  const fetcher = useFetcher<{ posts: PostType[] }>()
  const [posts, setPosts] = useState(initialPosts)
  const [hasMore, setHasMore] = useState(posts.length < totalCount)
  const [page, setPage] = useState(1)

  const observerRef = useRef<HTMLDivElement | null>(null)

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
      <div className="mb-4 flex justify-center"></div>
      <div className="columns-1 xl:columns-2 space-y-8 max-w-6xl mx-auto">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

        {fetcher.state === "submitting" && (
          <div className="flex items-center justify-center">
            <FlowerIcon className="animate-spin" />
          </div>
        )}

        <div ref={observerRef} className="h-10" />
      </div>
    </MainLayout>
  )
}
