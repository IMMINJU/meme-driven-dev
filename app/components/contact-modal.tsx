import clsx from "clsx"
import { Loader2, MessageCircle, Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

type ContactFormInputs = {
  name: string
  email: string
  message: string
}

export default function ContactModal() {
  const [showContactModal, setShowContactModal] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>()

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("message", data.message)

    const response = await fetch("/contact", { method: "POST", body: formData })
    if (response.ok) {
      setShowContactModal(false)
      reset()
      toast.success("Message sent successfully!", { position: "top-center" })
    }
  })

  return (
    <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
      <DialogTrigger asChild>
        <Button className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600">
          <MessageCircle size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-r from-indigo-400 to-purple-500 border-4 border-green-400 transform sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {"<ContactForm />"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white animate-pulse">
              Name:
            </Label>
            <Input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className={clsx(
                "w-full p-2 rounded bg-yellow-100 border-2 border-green-500 focus:border-blue-500 focus:outline-none transform hover:scale-105 transition-transform",
                { "border-red-500": errors.name }
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white animate-pulse">
              Email:
            </Label>
            <Input
              type="email"
              {...register("email", { required: true })}
              className={clsx(
                "w-full p-2 rounded bg-yellow-100 border-2 border-green-500 focus:border-blue-500 focus:outline-none transform hover:scale-105 transition-transform",
                { "border-red-500": errors.email }
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white animate-pulse">
              Message:
            </Label>
            <Textarea
              {...register("message", { required: true })}
              className={clsx(
                "w-full p-2 rounded bg-yellow-100 border-2 border-green-500 focus:border-blue-500 focus:outline-none transform hover:scale-105 transition-transform",
                { "border-red-500": errors.message }
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transform hover:rotate-3 transition-transform animate-bounce"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message <Send size={16} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
