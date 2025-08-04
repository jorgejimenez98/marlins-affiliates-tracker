import { MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"

import type { GameSummary } from "../../types"

import { Badge, Card, CardContent } from "@/components/ui"

export function FinalTile({ game }: { game: GameSummary }) {
  const { t } = useTranslation()

  const isWin = game.score && game.score.home > game.score.away
  const awayScore = game.score?.away ?? 0
  const homeScore = game.score?.home ?? 0

  const cardBorderClass = isWin ? "border-l-emerald-500" : "border-l-red-500"

  return (
    <Card className={`w-full border-l-4 ${cardBorderClass} h-full`}>
      <CardContent>

        <div className="flex justify-between mb-5">
          <Badge variant={"secondary"}>
            {game.level}
          </Badge>

          <Badge variant={"outline"}>
            {t("final")}
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3">

          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm text-foreground">
                {game.teamName}
              </h3>


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
                  <div className="space-x-1">
                    <span className="text-muted-foreground">{t("wp")}:</span>
                    <strong>{game.pitchersOfRecord.win}</strong>
                  </div>
                )}

                {game.pitchersOfRecord.loss && (
                  <div className="space-x-1">
                    <span className="text-muted-foreground">{t("lp")}:</span>
                    <strong>{game.pitchersOfRecord.loss}</strong>
                  </div>
                )}

                {game.pitchersOfRecord.save && (
                  <span className="space-x-1">
                    <span className="text-muted-foreground">SV:</span>
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
                  <span>
                    {game.venue}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
