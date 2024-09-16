import { AnimatePresence, motion } from "framer-motion"
import { Upload } from "lucide-react"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { GoogleIcon } from "./icons"

const GoogleLoginArea = () => {
  const fetcher = useFetcher()

  const handleLogin = () => {
    fetcher.submit(null, { method: "post", action: "/login" })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="absolute inset-0 flex items-center justify-center z-10 bg-opacity-50 bg-white"
    >
      <Button onClick={handleLogin}>
        <GoogleIcon />
        <span>Login with Google</span>
      </Button>
    </motion.div>
  )
}

type FormInputs = {
  title: string
  tags: string
}

export default function UploadModal() {
  const { user } = useLoaderData<{ user: any }>()
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({ shouldUnregister: true })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = handleSubmit((data) => {
    if (image && imagePreview) {
      const newPost = {
        imageUrl: imagePreview,
        title: data.title || data.tags,
        tags: data.tags.split(",").map((tag) => tag.trim()),
      }
      setImage(null)
      setImagePreview(null)
      reset()
    }
  })

  return (
    <>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-800 font-mono">
        <DialogHeader>
          <DialogTitle className="text-lg mb-4 text-gray-800">
            New Post
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence>{!user && <GoogleLoginArea />}</AnimatePresence>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-md border border-gray-300 bg-gray-100 flex items-center justify-center cursor-pointer relative transition-all duration-300 ease-in-out hover:bg-gray-200 hover:border-gray-400">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-contain rounded-md"
                />
                <div className="absolute inset-0 bg-white bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <p className="text-gray-800 text-sm font-medium opacity-0 hover:opacity-100 transition-opacity duration-300">
                    Change photo
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <Upload className="mx-auto h-8 w-8 text-gray-800" />
                <p className="mt-2 text-sm text-gray-800">
                  Click to upload photo
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="// Enter title"
            className="text-sm bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
          <Input
            {...register("tags", { required: "Tags are required" })}
            placeholder="// Enter tags (comma separated)"
            className="text-sm bg-gray-100 border-gray-300 text-gray-800 placeholder-gray-500"
          />
          {errors.tags && (
            <p className="text-red-500 text-xs">{errors.tags.message}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
          >
            Execute Post()
          </Button>
        </form>
      </DialogContent>
    </>
  )
}
