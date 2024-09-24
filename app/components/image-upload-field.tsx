import clsx from "clsx"
import { Upload } from "lucide-react"
import { useState } from "react"
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form"
import { Input } from "./ui/input"

type Props<T extends FieldValues> = { form: UseFormReturn<T>; name: Path<T> }

const ImageUploadField = <T extends FieldValues>({ form, name }: Props<T>) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const {
    register,
    formState: { errors },
    setValue,
  } = form

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      setValue(name, e.dataTransfer.files as PathValue<T, Path<T>>)
    }
  }

  return (
    <div
      className={clsx(
        "relative w-full bg-gray-50 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 hover:border-gray-400 aspect-video border-2 border-dashed border-gray-300",
        {
          "bg-gray-100 border-2 border-gray-500": isDragging,
          "border-red-500": errors[name],
        }
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Click or drag and drop to upload an image"
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <Upload
            className={`w-12 h-12 ${isDragging ? "text-gray-700" : "text-gray-400"}`}
          />
          <p
            className={`mt-2 text-sm ${isDragging ? "text-gray-700" : "text-gray-500"}`}
          >
            {isDragging ? "Drop image here" : "Click or drag image here"}
          </p>
        </div>
      )}
      <Input
        type="file"
        accept="image/*"
        {...register(name, { onChange: handleFileChange, required: true })}
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
      />
    </div>
  )
}

export default ImageUploadField
