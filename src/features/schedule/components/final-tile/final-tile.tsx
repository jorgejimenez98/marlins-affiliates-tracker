import { MapPin } from "lucide-react"

import type { GameSummary } from "../../types"

import { Badge, Card, CardContent } from "@/components/ui"

export function FinalTile({ game }: { game: GameSummary }) {
  const isWin = game.score && game.score.home > game.score.away

  const cardBorderClass = isWin ? "border-l-emerald-500" : "border-l-red-500"

  return (
    <Card className={`w-full border-l-4 ${cardBorderClass}`}>
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
            Final
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-1.5">
          <div className="text-sm font-medium text-muted-foreground">
          vs. {game.opponentName}
            {game.opponentParentClub && <span className="text-xs ml-1">({game.opponentParentClub})</span>}
          </div>

          {game.score && (
            <div className={"text-lg sm:text-xl font-bold tabular-nums"}>
              {game.score.away}-{game.score.home}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          {game.pitchersOfRecord && (
            <div className="flex gap-3">
              {game.pitchersOfRecord.win && (
                <span>
                  <span className="text-muted-foreground">WP:</span>
                  <span className="ml-1 font-medium">{game.pitchersOfRecord.win}</span>
                </span>
              )}
              {game.pitchersOfRecord.loss && (
                <span>
                  <span className="text-muted-foreground">LP:</span>
                  <span className="ml-1 font-medium">{game.pitchersOfRecord.loss}</span>
                </span>
              )}
              {game.pitchersOfRecord.save && (
                <span>
                  <span className="text-muted-foreground">SV:</span>
                  <span className="ml-1 font-medium">{game.pitchersOfRecord.save}</span>
                </span>
              )}
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
