import { MapPin } from "lucide-react"

import type { GameSummary } from "../../types"

import { Badge, Card, CardContent } from "@/components/ui"

export function NotStartedTile({ game }: { game: GameSummary }) {
  return (
    <Card className="w-full border-l-4 border-l-blue-500">
      <CardContent className="p-3 sm:p-4">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm sm:text-base text-foreground">
              {game.teamName}
            </h3>

            <Badge variant={"secondary"}>
              {game.level}
            </Badge>
          </div>

          <Badge variant={"outline"}>
            {game.gameTime}
          </Badge>
        </div>

        <div className="text-sm font-medium text-muted-foreground mb-2">
            vs. {game.opponentName}
          {game.opponentParentClub && <span className="text-xs ml-1">({game.opponentParentClub})</span>}
        </div>

        <div className="flex items-center justify-between text-xs">
          {game.probablePitchers && (
            <div className="flex gap-3">
              <span>
                <span className="text-muted-foreground">SP:</span>
                <span className="ml-1 font-medium">{game.probablePitchers.home}</span>
              </span>
              <span>
                <span className="text-muted-foreground">SP:</span>
                <span className="ml-1 font-medium">{game.probablePitchers.away}</span>
              </span>
            </div>
          )}

          {game.venue && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-2.5 w-2.5" />
              <span className="truncate">{game.venue.split(",")[0]}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}