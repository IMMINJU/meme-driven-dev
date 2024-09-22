import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import Confetti from "react-dom-confetti"

type PortfolioItem = {
  id: number
  imageUrl: string
  title: string
  description: string
  tags: string[]
}

type TournamentProps = {
  items: PortfolioItem[]
}

const confettiConfig = {
  angle: 100,
  spread: 45,
  startVelocity: 30,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 3000,
  stagger: 0,
  width: "8px",
  height: "8px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
}

export default function LightThemeTournament({
  items = [
    {
      id: 1,
      imageUrl:
        "https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg",
      title: "Project_A",
      description: "Brand Identity Design",
      tags: ["Branding", "Logo"],
    },
    {
      id: 2,
      imageUrl:
        "https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg",
      title: "Project_B",
      description: "Website UI/UX Design",
      tags: ["Web", "UI/UX"],
    },
    {
      id: 3,
      imageUrl:
        "https://i.kym-cdn.com/entries/icons/original/000/028/021/work.jpg",
      title: "Project_C",
      description: "Mobile App Design",
      tags: ["Mobile", "App"],
    },
    {
      id: 4,
      imageUrl: "/placeholder.svg?height=800&width=1200",
      title: "Project_D",
      description: "Illustration Work",
      tags: ["Illustration", "Art"],
    },
  ],
}: TournamentProps) {
  const [currentRound, setCurrentRound] = useState<PortfolioItem[]>([])
  const [winner, setWinner] = useState<PortfolioItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [confettiActive, setConfettiActive] = useState(false)

  useEffect(() => {
    if (items.length < 2) {
      setError("At least two items are required for the tournament.")
    } else {
      setCurrentRound(items)
    }
  }, [items])

  const handleChoice = (chosen: PortfolioItem) => {
    setSelectedItem(chosen)
    setConfettiActive(true)
    setTimeout(() => {
      setConfettiActive(false)
      if (currentRound.length > 1) {
        const nextRound = currentRound.filter((item) => item.id !== chosen.id)
        setCurrentRound(nextRound)
      } else {
        setWinner(chosen)
      }
      setSelectedItem(null)
    }, 2000)
  }

  const resetTournament = () => {
    setCurrentRound(items)
    setWinner(null)
    setError(null)
    setSelectedItem(null)
    setConfettiActive(false)
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 font-mono">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Error_</h2>
          <p className="text-xl mb-8">{error}</p>
          <button
            onClick={resetTournament}
            className="px-6 py-3 bg-gray-800 text-white rounded-none text-lg font-medium transition-colors hover:bg-gray-700"
          >
            Try_Again
          </button>
        </div>
      </div>
    )
  }

  if (winner) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 font-mono">
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-8">Winner_</h2>
          <div className="relative w-[800px] h-[600px] mb-8">
            <img
              src={winner.imageUrl}
              alt={winner.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-3xl font-semibold mb-4">{winner.title}</h3>
          <p className="text-xl mb-4">{winner.description}</p>
          <div className="flex justify-center gap-2 mb-8">
            {winner.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 text-gray-800 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            onClick={resetTournament}
            className="px-6 py-3 bg-gray-800 text-white rounded-none text-lg font-medium transition-colors hover:bg-gray-700"
          >
            New_Tournament
          </button>
        </div>
      </div>
    )
  }

  if (currentRound.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 font-mono">
        <h2 className="text-3xl font-semibold">Loading_</h2>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800 font-mono p-8">
      <h1 className="text-5xl font-semibold text-center mb-16">
        Design_Tournament
      </h1>
      <div className="flex justify-center items-stretch gap-16">
        <AnimatePresence>
          {currentRound.slice(0, 2).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-[400px] bg-white shadow-lg relative"
            >
              <div
                className={`cursor-pointer transition-transform duration-300 ${
                  selectedItem?.id === item.id ? "scale-95" : "hover:scale-105"
                }`}
                onClick={() => handleChoice(item)}
              >
                <h2 className="text-2xl font-semibold p-4 border-b border-gray-200">
                  {item.title}
                </h2>
                <div className="relative w-full h-[300px]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-lg text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-gray-800 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <Confetti
                  active={confettiActive && selectedItem?.id === item.id}
                  config={confettiConfig}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="text-center mt-16 text-xl">
        Remaining_Projects: {currentRound.length}
      </p>
    </div>
  )
}
