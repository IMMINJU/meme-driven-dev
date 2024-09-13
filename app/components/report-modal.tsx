import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface ReportModalProps {
  postId: string
  closeModal: () => void
}

export default function ReportModal({ postId, closeModal }: ReportModalProps) {
  const submitReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const reason = formData.get("reason")
    console.log(`Reported post ${postId} for reason: ${reason}`)
    closeModal()
  }

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Inappropriate Content</DialogTitle>
          <DialogDescription>
            Please provide a reason for reporting this post.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitReport} className="space-y-4">
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700"
            >
              Reason for reporting
            </label>
            <Textarea
              id="reason"
              name="reason"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Please explain why you're reporting this post"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">Submit Report</Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
