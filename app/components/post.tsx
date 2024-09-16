import { AnimatePresence, motion } from "framer-motion"
import { Flag, GitBranch, Hash, Terminal, ThumbsUp, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import ModalButton from "./modal-button"
import ReportModal from "./report-modal"

const RankChangeIcon = ({ rankChange }: { rankChange: number }) => {
  const color = rankChange === 0 ? "text-gray-400" : "text-gray-700"
  const rotation = rankChange < 0 ? "rotate-180" : ""
  const ariaLabel =
    rankChange > 0 ? "순위 상승" : rankChange < 0 ? "순위 하락" : "순위 유지"

  return (
    <svg
      className={`w-4 h-4 ${color} ${rotation}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ariaLabel}
    >
      <path d="M17 16l-5-5-5 5" />
      <path d="M17 10l-5-5-5 5" />
    </svg>
  )
}

type PostType = {
  id: string
  title: string
  tags: string[]
  image: string
  user: { photo: string; name: string }
}

export default function Post({ post }: { post: PostType }) {
  const [fullImageSrc, setFullImageSrc] = useState<string | null>(null)
  const imageRefs = useRef<{ [key: string]: HTMLImageElement | null }>({})

  const handleImageClick = (postId: string, src: string) => {
    const img = imageRefs.current[postId]
    if (img && img.naturalHeight > img.width) {
      setFullImageSrc(src)
    }
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
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="flex items-center p-6 justify-between">
        <h2 className="text-xl font-semibold font-mono flex items-center">
          <Terminal className="mr-2 text-green-600" />
          {post.title}
        </h2>
        <div className="flex items-center">
          <span
            className="text-sm font-medium text-gray-600"
            aria-live="polite"
          >
            {/* {post.rank_change > 0 ? `+${post.rank_change}` : post.rank_change} */}
          </span>
          {/* <RankChangeIcon rankChange={post.rank_change} /> */}
        </div>
      </div>
      <button
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
      <div className="p-6 pt-2">
        <div className="flex justify-between items-center">
          <div className="text-xs flex items-center justify-end text-gray-600">
            <GitBranch className="mr-1 h-3 w-3" />
            {post.user.name}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                {/* <span className="text-sm text-gray-500">{post.votes}</span> */}
              </div>
            </Button>
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
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs font-mono flex items-center"
            >
              <Hash className="mr-1 h-3 w-3" />
              {tag}
            </span>
          ))}
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
    </motion.div>
  )
}
