import clsx from "clsx"
import { Bookmark, Flag, Maximize2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import ModalButton from "./modal-button"
import ReportModal from "./report-modal"

interface PostProps {
  post: {
    id: string
    title?: string
    image: string
    tags: string[]
    user: {
      avatar: string
      name: string
    }
  }
  index: number
  containerRef: React.RefObject<HTMLDivElement>
}

export default function Post({ post, index, containerRef }: PostProps) {
  const [expandedImages, setExpandedImages] = useState<{
    [key: string]: boolean
  }>({})
  const [imageHeights, setImageHeights] = useState<{ [key: string]: number }>(
    {}
  )
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

  const toggleImageExpansion = (postId: string) => {
    setExpandedImages((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  useEffect(() => {
    const updateImageHeights = () => {
      const newHeights: { [key: string]: number } = {}
      imageRefs.current.forEach((img) => {
        if (img) newHeights[post.id] = img.naturalHeight
      })
      setImageHeights(newHeights)
    }

    updateImageHeights()
    window.addEventListener("resize", updateImageHeights)

    return () => {
      window.removeEventListener("resize", updateImageHeights)
    }
  }, [post.id])

  {
    const isExpandable =
      imageHeights[post.id] > (containerRef.current?.offsetWidth || 0)

    return (
      <div
        key={post.id}
        className="bg-white rounded-lg overflow-hidden shadow-sm"
      >
        {post.title && (
          <h2 className="text-lg font-medium p-4 text-gray-800">
            {post.title}
          </h2>
        )}
        <div className="relative">
          <button
            className={`w-full relative overflow-hidden transition-all duration-300 ease-in-out ${
              expandedImages[post.id]
                ? "h-auto"
                : isExpandable
                  ? "cursor-nesw-resize aspect-square"
                  : ""
            } group`}
            disabled={!isExpandable}
            onClick={() => toggleImageExpansion(post.id)}
          >
            <img
              ref={(el) => (imageRefs.current[index] = el)}
              src={post.image}
              alt={post.title || `Meme ${post.id}`}
              className={clsx("w-full object-cover", {
                "transition-all duration-300 ease-in-out group-hover:brightness-75":
                  isExpandable && !expandedImages[post.id],
              })}
              draggable={false}
            />
            {isExpandable && !expandedImages[post.id] && (
              <div className="absolute top-2 right-2 text-white rounded-full p-2">
                <div className="bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Maximize2 className="h-4 w-4" />
              </div>
            )}
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{post.user.name}</span>
            </div>
            <div className="flex gap-2">
              <ModalButton
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                modalContent={(onClose) => (
                  <ReportModal postId={post.id} closeModal={onClose} />
                )}
              >
                <Flag className="h-4 w-4" />
              </ModalButton>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
