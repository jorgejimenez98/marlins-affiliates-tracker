import { Circle, MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"

import type { GameSummary } from "../../types"

import { BaseballDiamond } from "@/components/common"
import { Badge, Card, CardContent } from "@/components/ui"

export function InProgressTile({ game }: { game: GameSummary }) {
  const { t } = useTranslation()

  const awayScore = game.score?.away || 0
  const homeScore = game.score?.home || 0

  return (
    <Card className="w-full border-l-4 border-l-green-500 h-full">

      <CardContent className="h-full p-2.5 sm:p-3">
        <div className="flex flex-col sm:flex-row justify-between gap-3">

          <div className="space-y-3 flex-1 min-w-0 overflow-hidden">
            <Badge variant={"secondary"}>
              {game.level}
            </Badge>

            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm text-foreground">
                {game.teamName}
              </h3>

              <Badge>{homeScore}</Badge>
            </div>

            <div className="flex items-center space-x-3 mb-1">
              <span className="text-sm font-medium text-muted-foreground truncate">
                vs {game.opponentName}
              </span>

              {game.opponentParentClub && (
                <Badge variant={"outline"}>
                  {game.opponentParentClub}
                </Badge>
              )}

              <Badge>{awayScore}</Badge>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 dark:text-slate-400 mt-5">
              {game.atBat && (
                <p>
                  {t("at-bat")}: <br className="hidden sm:block" />
                  <strong>{game.atBat}</strong>
                </p>
              )}

              {game.pitcher && (
                <span>
                  {t("pitching")}: <br className="hidden sm:block" />
                  <strong>{game.pitcher}</strong>
                </span>
              )}
            </div>

          </div>

          <div className="space-y-3 relative">
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end py-3 sm:py-0">
              {game.venue && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-2.5 w-2.5" />

                  <span className="truncate">
                    {game.venue}
                  </span>
                </div>
              )}

              <Badge variant={"outline"} className="gap-2 uppercase">
                <Circle className="size-1 fill-current animate-pulse" />
                {t("live")}
              </Badge>
            </div>

            <div className="flex justify-end items-center gap-3 relative bottom-40 sm:bottom-0 -mb-20">
              <BaseballDiamond
                runnersOnBase={game.runnersOnBase || []}
                className="w-10 h-10 mt-3"
                outs={game.outs?.toString()}
                inning={game.currentInning}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}