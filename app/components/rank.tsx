import { Code } from "lucide-react"

const Rank = () => {
  return (
    <aside className="hidden md:block w-full md:w-48 p-4 overflow-y-auto md:overflow-y-visible scrollbar-hide border-t md:border-t-0 border-gray-200">
      <h2 className="text-base font-semibold text-gray-800 mb-3">
        Top Developers
      </h2>
      <ol className="space-y-2">
        {[
          "@alice_dev",
          "@bob_coder",
          "@charlie_programmer",
          "@david_hacker",
          "@eve_engineer",
        ].map((user, index) => (
          <li
            key={user}
            className="flex items-center space-x-2 p-2 bg-gray-100 rounded"
          >
            <Code className="h-4 w-4 text-gray-600" />
            <span className="text-xs text-gray-800 font-medium">
              {index + 1}.
            </span>
            <span className="text-xs text-gray-800 font-medium">{user}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}

export default Rank
