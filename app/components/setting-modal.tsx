import { UserType } from "~/types/user"
import React, { useState } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface Props {
  user?: UserType
  onClose: () => void
}

const SettingModal: React.FC<Props> = ({ user, onClose }) => {
  const [userName, setUserName] = useState(user?.name)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </Label>
          <Input
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-white text-gray-800 border-gray-300"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="text-gray-600 border-gray-300"
          >
            Cancel
          </Button>
          <Button onClick={onClose} className="bg-gray-800 text-white">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SettingModal
