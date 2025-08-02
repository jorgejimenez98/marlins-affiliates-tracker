import { MapPin } from "lucide-react"

import type { GameSummary } from "../../types"

import { Badge, Card, CardContent } from "@/components/ui"

export function FinalTile({ game }: { game: GameSummary }) {
  const isWin = game.score && game.score.home > game.score.away
  const awayScore = game.score?.away ?? 0
  const homeScore = game.score?.home ?? 0

  const cardBorderClass = isWin ? "border-l-emerald-500" : "border-l-red-500"

  return (
    <Card className={`w-full border-l-4 ${cardBorderClass} h-full`}>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between gap-3">

          {/* Información del equipo y resultado */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm text-foreground">
                {game.teamName}
              </h3>

              <Badge variant={"secondary"}>
                {game.level}
              </Badge>

              <Badge>{homeScore}</Badge>
            </div>

            <div className="flex items-center space-x-3 mb-1">
              <span className="text-sm font-medium text-muted-foreground">
                vs {game.opponentName}
              </span>

              {game.opponentParentClub && (
                <Badge variant={"outline"}>
                  {game.opponentParentClub}
                </Badge>
              )}

              <Badge>{awayScore}</Badge>
            </div>

            {game.pitchersOfRecord && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 dark:text-slate-400 mt-5 text-sm">
                {game.pitchersOfRecord.win && (
                  <span>
                    <span className="text-muted-foreground">WP:</span>{" "}
                    <strong>{game.pitchersOfRecord.win}</strong>
                  </span>
                )}

                {game.pitchersOfRecord.loss && (
                  <span>
                    <span className="text-muted-foreground">LP:</span>{" "}
                    <strong>{game.pitchersOfRecord.loss}</strong>
                  </span>
                )}

                {game.pitchersOfRecord.save && (
                  <span>
                    <span className="text-muted-foreground">SV:</span>{" "}
                    <strong>{game.pitchersOfRecord.save}</strong>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3 relative">
            <div className="flex gap-3 sm:justify-end py-2 sm:py-0">
              {game.venue && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-2.5 w-2.5" />
                  <span className="truncate">{game.venue.split(",")[0]}</span>
                </div>
              )}

              <Badge variant={"outline"}>Final</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
