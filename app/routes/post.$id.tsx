import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { ArrowLeft, Link, Trash2 } from "lucide-react"
import { authenticator } from "~/auth.server"
import MainLayout from "~/components/main-layout"
import { Button } from "~/components/ui/button"
import { supabase } from "~/supabase.server"
import { PostType } from "~/types/post"
import { UserType } from "~/types/user"
import { LoaderFunction, json } from "@remix-run/node"
import { Form, useLoaderData, useNavigate } from "@remix-run/react"
import { useState } from "react"
import toast from "react-hot-toast"

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  const url = new URL(request.url)
  const id = url.pathname.split("/").pop()
  const env = {
    SUPABASE_BUCKET_URL: process.env.SUPABASE_BUCKET_URL,
    rootUrl: url.origin,
  }

  const { data, error }: PostgrestSingleResponse<PostType[]> = await supabase
    .from("posts")
    .select("*, user:users(*)", { count: "exact" })
    .eq("id", id)

  if (error) {
    console.error(error)
    return json({ user }, { status: 500 })
  }

  return json({ ...env, user, post: data[0] })
}

export default function Post() {
  const data = useLoaderData<{
    user?: UserType
    post: PostType
    SUPABASE_BUCKET_URL: string
    rootUrl: string
  }>()

  const user = data?.user
  const { post, SUPABASE_BUCKET_URL, rootUrl } = data

  const handleCopyLink = (postId: string) => {
    const dummyLink = `${rootUrl}/post/${postId}`
    navigator.clipboard.writeText(dummyLink).then(() => {
      toast.success(`Link copied to clipboard! 🔗✨`, {
        position: "top-center",
      })
    })
  }

  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleDelete = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("id", post.id)
    const response = await fetch("/post", {
      method: "delete",
      body: formData,
    })
    if (response.ok) {
      navigate("/explore", { replace: true })
    }
    setLoading(false)
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 font-mono">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <Button
              className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => window.history.back()}
            >
              <ArrowLeft />
            </Button>
            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
              {"<" + post.title + " />"}
            </h1>
            <img
              src={`${SUPABASE_BUCKET_URL}/${post.image}`}
              alt={post.title}
              className="w-full h-auto object-cover mb-4 rounded-lg shadow-md transform transition-all duration-300"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-end items-center">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => handleCopyLink(post.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded"
                  aria-label={`Copy link for ${post.title}`}
                >
                  <Link size={16} />
                </Button>
                {post.user.id === user?.id && (
                  <Form onSubmit={handleDelete}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
