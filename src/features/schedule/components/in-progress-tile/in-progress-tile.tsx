import { Circle, MapPin } from "lucide-react"

import type { GameSummary } from "../../types"

import { BaseballDiamond } from "@/components/common"
import { Badge, Card, CardContent } from "@/components/ui"

export function InProgressTile({ game }: { game: GameSummary }) {
  const awayScore = game.score?.away || 0
  const homeScore = game.score?.home || 0

  return (
    <Card className="w-full border-l-4 border-l-green-500 h-full">

      <CardContent className="flex flex-col justify-between h-full p-2.5 sm:p-3">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm text-foreground">
              {game.teamName}
            </h3>

            <Badge variant={"secondary"}>
              {game.level}
            </Badge>
          </div>

          <div className="flex gap-3 justify-between sm:justify-end py-3 sm:py-0">
            {game.venue && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-2.5 w-2.5" />
                <span className="truncate">{game.venue.split(",")[0]}</span>
              </div>
            )}

            <Badge variant={"outline"} className="gap-2">
              <Circle className="size-1 fill-current animate-pulse" />
                LIVE
            </Badge>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <span className="text-sm font-medium text-muted-foreground">
                vs {game.opponentName}
              </span>

              {game.opponentParentClub && (
                <Badge variant={"outline"}>
                  {game.opponentParentClub}
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center space-x-4 text-sm gap-5 sm:gap-0">
              <div className="flex items-center gap-5 dark:text-slate-400 mt-5 sm:mt-0">
                {game.atBat && (
                  <span>At Bat: {game.atBat}</span>
                )}

                {game.pitcher && (
                  <span>Pitching: {game.pitcher}</span>
                )}

                <span>
                  {`${game.currentInning ? game.currentInning : ""}`},&nbsp;
                  {game.outs !== undefined && game.outs === 1 ? "1 out" : `${game.outs} outs`}
                </span>
              </div>

              <div className="flex sm:flex-col relative sm:bottom-5 sm:-mb-10 items-center gap-3">
                <div className={"text-lg sm:text-xl font-bold tabular-nums"}>
                  {homeScore}-{awayScore}
                </div>

                <BaseballDiamond
                  runnersOnBase={game.runnersOnBase || []}
                  className="w-8 h-8 sm:w-10 sm:h-10 text-end"
                />
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}