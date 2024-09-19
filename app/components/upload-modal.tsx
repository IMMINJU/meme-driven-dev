import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { LinkIcon } from "lucide-react"
import { UserType } from "~/types/user"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { useForm, useWatch } from "react-hook-form"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

type UploadFormInputs = {
  title: string
  tags: string
  source?: { type: "link" | "text"; value: string }
  file: File
}

type Props = { onClose: () => void }

export default function UploadModal({ onClose }: Props) {
  const data = useLoaderData<{ user?: UserType }>()
  const user = data?.user
  const fetcher = useFetcher()
  const form = useForm<UploadFormInputs>({ shouldUnregister: true })
  const {
    control,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = form

  const handleLogin = () => {
    fetcher.submit(null, { method: "post", action: "/login" })
  }

  const sourceType = useWatch({ control, name: "source.type" })

  const onSubmit = handleSubmit(async (data) => {
    if (data.source?.value && !data.source.type) {
      return setError("source.type", {})
    } else {
      form.clearErrors("source.type")
    }

    // const formData = new FormData()
    // formData.append("file", data.file)
    // formData.append("title", data.title)
    // formData.append("tags", data.tags)
    // formData.append("source", data.source)
    // await fetcher.submit(formData, { method: "post", action: "/upload" })

    onClose()
    fetcher.load("/explore")
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

        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
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
          <div>
            <Label
              htmlFor="source"
              className="block text-sm font-medium text-gray-700"
            >
              Source <span className="text-gray-500">(Optional)</span>
            </Label>
            <div className="flex mt-1 space-x-2">
              <Select
                onValueChange={(value) =>
                  setValue("source.type", value as "link" | "text")
                }
              >
                <SelectTrigger
                  className={clsx("w-100", {
                    "border-red-500": errors.source?.type,
                  })}
                >
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
              {sourceType === "text" ? (
                <Input
                  {...register("source.value", { required: sourceType })}
                  placeholder="Enter source"
                  className="flex-1"
                />
              ) : (
                <div className="flex flex-1">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <LinkIcon className="h-4 w-4" />
                  </span>
                  <Input
                    id="source"
                    type="url"
                    {...register("source.value", { required: sourceType })}
                    placeholder="https://example.com"
                    className="rounded-l-none"
                  />
                </div>
              )}
            </div>
            {errors.source && (
              <p className="text-red-500 text-xs">{errors.source.message}</p>
            )}
          </div>

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
