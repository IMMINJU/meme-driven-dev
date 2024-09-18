import { AnimatePresence, motion } from "framer-motion"
import { Calendar, Link, Tag, X } from "lucide-react"
import { PostType } from "~/types/post"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import ModalButton from "./modal-button"
import ReportModal from "./report-modal"

interface Props {
  post: PostType
}

export default function Post({ post }: Props) {
  const [fullImageSrc, setFullImageSrc] = useState<string | null>(null)
  const imageRefs = useRef<{ [key: string]: HTMLImageElement | null }>({})

  const handleImageClick = (postId: string, src: string) => {
    const img = imageRefs.current[postId]
    if (img && img.naturalHeight > img.width) {
      setFullImageSrc(src)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  useEffect(() => {
    const imageElements = Object.values(imageRefs.current)

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

    imageElements.forEach((img) => {
      if (img) {
        if (img.complete) {
          handleImageLoad(img)
        } else {
          img.onload = () => handleImageLoad(img)
        }
      }
    })
  }, [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white border border-gray-200 rounded overflow-hidden shadow-sm hover:shadow-md"
    >
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-800">
          $ {post.title}
        </h3>
      </div>
      <button
        type="button"
        className="relative w-full"
        onClick={() => handleImageClick(post.id, post.image)}
      >
        <img
          ref={(el) => (imageRefs.current[post.id] = el)}
          src={post.image}
          alt={post.title || `Meme ${post.id}`}
          className="w-full h-auto"
        />
      </button>
      <div className="p-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.created_at)}
            </span>
            <span>{24} Likes</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-800">@{post.user.name}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          {post.source?.type === "link" ? (
            <a
              href={post.source.value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500 transition duration-150 ease-in-out"
            >
              <Link className="h-4 w-4 mr-1" />
              {post.source.value}
            </a>
          ) : post.source?.type === "text" ? (
            <p className="flex items-center transition duration-150 ease-in-out">
              <Link className="h-4 w-4 mr-1" />
              {post.source.value}
            </p>
          ) : (
            <div />
          )}

          <ModalButton
            variant="ghost"
            className="p-0 hover:bg-transparent text-xs font-normal text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            modalContent={(onClose) => (
              <ReportModal postId={post.id} closeModal={onClose} />
            )}
          >
            Report
          </ModalButton>
        </div>
      </div>

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
    </motion.article>
  )
}
