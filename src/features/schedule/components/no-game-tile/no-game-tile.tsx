import type { GameSummary } from "../../types"

import { Badge, Card, CardContent } from "@/components/ui"

export function NoGameTile({ game }: { game: GameSummary }) {

  return (
    <Card className="border-l-4 border-l-gray-400 dark:border-l-gray-500">
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
        </div>

        <Badge variant={"outline"}>
          NO GAME
        </Badge>
      </CardContent>
    </Card>
  )
}