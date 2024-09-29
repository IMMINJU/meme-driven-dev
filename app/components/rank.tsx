import { Coffee, Pizza, Zap } from "lucide-react"
import { useEffect, useState } from "react"

const Rank = () => {
  const [randomEmoji, setRandomEmoji] = useState("🤪")

  useEffect(() => {
    const emojis = ["🤪", "🥴", "🤯", "🙃", "🫠", "🤖", "👾", "🤡"]
    const interval = setInterval(() => {
      setRandomEmoji(emojis[Math.floor(Math.random() * emojis.length)])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <aside className="hidden md:block w-64 bg-yellow-200 p-4 overflow-y-auto">
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-600 animate-pulse">
        Random Stuff
      </h3>
      <div className="space-y-4">
        <div className="bg-pink-300 p-3 rounded-lg">
          <p className="text-base md:text-lg font-semibold">
            Emoji of the second: {randomEmoji}
          </p>
        </div>
        <div className="bg-green-300 p-3 rounded-lg">
          <p className="text-xs md:text-sm">
            {`if (coffee.isEmpty()) { 
                  programmer.refill(coffee);
                  bug.fixItself();
                }`}
          </p>
        </div>
        <div className="flex items-center justify-around text-2xl md:text-4xl">
          <Zap className="text-yellow-500 animate-bounce" />
          <Coffee className="text-brown-500 animate-pulse" />
          <Pizza className="text-red-500 animate-spin" />
        </div>
      </div>
    </aside>
  )
}

export default Rank
