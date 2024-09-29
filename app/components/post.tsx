import { AnimatePresence, motion } from "framer-motion"
import { Link, Trash2, X } from "lucide-react"
import { PostType } from "~/types/post"
import { UserType } from "~/types/user"
import { Form, useLoaderData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import ReportModal from "./report-modal"

interface Props {
  post: PostType
}

export default function Post({ post }: Props) {
  const { user, SUPABASE_BUCKET_URL, rootUrl } = useLoaderData<{
    user?: UserType
    SUPABASE_BUCKET_URL: string
    rootUrl: string
  }>()
  const [fullImageSrc, setFullImageSrc] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleImageClick = (postId: string, src: string) => {
    const img = imageRef.current
    if (img && img.naturalHeight > img.width) {
      setFullImageSrc(src)
    }
  }

  useEffect(() => {
    const imageElements = imageRef.current

    const handleImageLoad = (img: HTMLImageElement) => {
      if (img.naturalHeight > img.width) {
        img.style.cursor = "pointer"
        img.style.aspectRatio = "1 / 1"
        img.style.objectFit = "contain"
      } else {
        img.style.cursor = "default"
        img.style.aspectRatio = "auto"
        img.style.objectFit = "cover"
      }
    }

    if (imageElements) {
      if (imageElements.complete) {
        handleImageLoad(imageElements)
      } else {
        imageElements.onload = () => handleImageLoad(imageElements)
      }
    }
  }, [])

  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    if (imageRef.current) {
      const imgElement = imageRef.current

      if (!imgElement.complete || imgElement.naturalHeight === 0) {
        setIsLoaded(false)
      }

      imgElement.addEventListener("load", () => setIsLoaded(true))
      imgElement.addEventListener("error", () => setIsLoaded(true))

      return () => {
        imgElement.removeEventListener("load", () => setIsLoaded(true))
        imgElement.removeEventListener("error", () => setIsLoaded(true))
      }
    }
  }, [])

  const handleCopyLink = (postId: string) => {
    const dummyLink = `${rootUrl}/post/${postId}`
    navigator.clipboard.writeText(dummyLink).then(() => {
      toast.success(`Link copied to clipboard! 🔗✨`, {
        position: "top-center",
      })
    })
  }

  const [isLoading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("id", post.id)
    const response = await fetch("/post", {
      method: "delete",
      body: formData,
    })
    if (response.ok) {
      window.location.reload()
    }
    setLoading(false)
  }

  return (
    <>
      <article className="bg-gradient-to-br from-white to-blue-100 p-6 rounded-lg shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-gradient" />
        <h2 className="text-2xl font-bold mb-2 opacity-100">
          {"<" + post.title + " />"}
        </h2>
        <button
          type="button"
          className="relative w-full"
          onClick={() =>
            handleImageClick(post.id, `${SUPABASE_BUCKET_URL}/${post.image}`)
          }
        >
          {!isLoaded && (
            <div className="w-full aspect-square bg-gray-200 animate-pulse mb-4" />
          )}
          <img
            ref={imageRef}
            src={`${SUPABASE_BUCKET_URL}/${post.image}`}
            alt={post.title}
            className="w-full h-auto object-cover mb-4"
          />
        </button>

        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold animate-pulse shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
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
      </article>

      <AnimatePresence>
        {fullImageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setFullImageSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullImageSrc}
                alt="Full size meme"
                className="w-full h-auto"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
                onClick={() => setFullImageSrc(null)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
