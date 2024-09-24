import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { UserType } from "~/types/user"
import { Form, useFetcher, useLoaderData, useNavigate } from "@remix-run/react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { GoogleIcon } from "./icons"
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
  const navigate = useNavigate()
  const form = useForm<UploadFormInputs>({ shouldUnregister: true })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const handleLogin = () => {
    fetcher.submit(null, { method: "post", action: "/login" })
  }

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    formData.append("tags", JSON.stringify(data.tags))
    formData.append("title", data.title)
    formData.append("file", data.file[0])
    formData.append("user_id", user?.id || "")
    const response = await fetch("/post", { method: "post", body: formData })

    if (response.ok) {
      onClose()
      navigate("/explore")
    } else {
      console.error("Error submitting the post")
    }
  })

  return (
    <>
      <DialogContent
        className="sm:max-w-[472px] max-w-md bg-white text-gray-800 border border-gray-200 shadow-lg"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-gray-900 font-mono">
            New Post
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
              <Button onClick={handleLogin}>
                <GoogleIcon />
                <span>Login with Google</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
          <ImageUploadField form={form} name="file" />

          <div>
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-semibold">
                $
              </span>
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="// Enter title"
                className={clsx(
                  "mt-1 pl-7 bg-white border-gray-300 text-gray-800 placeholder-gray-400",
                  { "border-red-500": errors.title }
                )}
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </Label>
            <TagInput
              form={form}
              name="tags"
              placeholder="// Enter tags (comma separated)"
              className="mt-1 bg-white border-gray-300 text-gray-800 placeholder-gray-400"
            />
          </div>

          <Button
            type="submit"
            disabled={!user}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white"
          >
            Execute Post()
          </Button>
        </Form>
      </DialogContent>
    </>
  )
}
