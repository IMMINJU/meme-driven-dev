import { Terminal } from "lucide-react"

export default function Tournament() {
  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="flex items-center gap-2">
        <Terminal className="w-6 h-6" />
        <h2 className="text-lg font-bold text-gray-800">Tournament</h2>
      </div>
    </div>
  )
}
