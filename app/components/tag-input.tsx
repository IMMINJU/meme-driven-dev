import clsx from "clsx"
import { Tag, X } from "lucide-react"
import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FieldValues, Path, UseFormReturn, useWatch } from "react-hook-form"
import { Input, InputProps } from "./ui/input"

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>
  name: Path<T>
} & Omit<InputProps, "form" | "name">

const TagInput = <T extends FieldValues>({ form, name, ...rest }: Props<T>) => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = form
  const [input, setInput] = useState("")
  const tags = (useWatch({ control, name }) || []) as string[]
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," && input.trim() !== "") {
      e.preventDefault()
      addTag()
    }
  }

  const addTag = () => {
    const trimmedInput = input.trim()
    if (trimmedInput !== "" && !tags.includes(trimmedInput)) {
      setValue(name, [...tags, trimmedInput])

      setInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setValue(
      name,
      tags.filter((tag) => tag !== tagToRemove)
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            <Tag className="h-3 w-3 mr-1" />
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 focus:outline-none"
              aria-label={`Remove ${tag} tag`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <Input
        value={input}
        {...rest}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className={clsx({ "border-red-500": errors[name] })}
      />
      <input
        type="hidden"
        {...register(name, { required: true, minLength: 1 })}
      />
    </div>
  )
}

export default TagInput
