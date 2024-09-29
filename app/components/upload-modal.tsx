import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { UserType } from "~/types/user"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import ImageUploadField from "./image-upload-field"
import TagInput from "./tag-input"
import { Label } from "./ui/label"

type UploadFormInputs = {
  title: string
  tags: string
  file: File[]
}

type Props = { onClose: () => void }

export default function UploadModal({ onClose }: Props) {
  const data = useLoaderData<{ user?: UserType }>()
  const user = data?.user
  const fetcher = useFetcher()
  const form = useForm<UploadFormInputs>({ shouldUnregister: true })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const handleLogin = () => {
    fetcher.submit(null, { method: "post", action: "/login" })
  }

  const [isLoading, setLoading] = useState(false)
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const formData = new FormData()
    formData.append("tags", JSON.stringify(data.tags))
    formData.append("title", data.title)
    formData.append("file", data.file[0])
    formData.append("user_id", user?.id || "")
    const response = await fetch("/post", { method: "post", body: formData })

    if (response.ok) {
      onClose()
      window.location.reload()
    } else {
      console.error("Error submitting the post")
    }
    setLoading(false)
  })

  return (
    <DialogContent className="bg-gradient-to-r from-green-400 to-blue-500 border-4 border-purple-600 sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-white">
          {"<UploadForm />"}
        </DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <AnimatePresence>
        {!user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center z-10 bg-opacity-50 bg-white"
          >
            <Button
              onClick={handleLogin}
              className="transition-all duration-300 ease-in-out transform hover:rotate-3 hover:scale-110"
            >
              <svg
                role="img"
                className="w-6 h-6 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
              >
                <title>Google Chrome</title>
                <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z" />
              </svg>
              <span>Login with Goo...gle?</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={onSubmit} className="space-y-4">
        <ImageUploadField form={form} name="file" />
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white animate-pulse">
            Super Duper Title:
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
              $
            </span>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="// Enter title"
              className={clsx(
                "w-full p-2 rounded bg-yellow-100 border-2 border-purple-500 focus:border-red-500 focus:outline-none transform hover:scale-105 transition-transform",
                { "border-red-500": errors.title }
              )}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags" className="text-white animate-pulse">
            Crazy Tags (comma-separated):
          </Label>
          <TagInput
            form={form}
            name="tags"
            placeholder="// Enter tags (comma separated)"
            className="w-full p-2 rounded bg-yellow-100 border-2 border-purple-500 focus:border-red-500 focus:outline-none transform hover:scale-105 transition-transform"
          />
        </div>
        <Button
          type="submit"
          disabled={!user || isLoading}
          className={clsx(
            "w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white p-4 rounded-full hover:from-green-500 hover:via-yellow-500 hover:to-red-500 transform hover:rotate-3 transition-all duration-300 font-mono text-lg font-bold",
            {
              "animate-rainbow": !isLoading,
              "opacity-75 cursor-not-allowed": isLoading,
            }
          )}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Praying to the Meme Gods...
            </span>
          ) : (
            "Upload and Pray🙏"
          )}
        </Button>
      </form>
    </DialogContent>
  )
}
