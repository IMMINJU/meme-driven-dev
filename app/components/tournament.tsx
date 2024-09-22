import { Calendar, ChevronRight, Flag, Users } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export default function Tournament({ tournament }) {
  return (
    <Card
      key={tournament.id}
      className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-50"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          {tournament.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-3 text-xs text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{tournament.createdAt}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{tournament.participantCount}</span>
          </div>
        </div>
        <img
          src={tournament.thumbnail}
          alt={tournament.title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-1">
            {tournament.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs rounded-full px-2 py-0.5 bg-gray-200 text-gray-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-300"
            // onClick={() => handleReportTournament(tournament.id)}
          >
            <Flag className="h-3 w-3 mr-1" /> Report
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-medium inline-flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors duration-300"
            // onClick={() => handleStartTournament(tournament.title)}
          >
            Start Tournament <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
