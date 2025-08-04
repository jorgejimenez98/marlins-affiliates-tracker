import { useMemo } from "react"

import { useTranslation } from "react-i18next"

import { FinalTile, InProgressTile, GamesFilters, NoGameTile, NotStartedTile, ScheduleDateSection } from "./components"
import { useDateListener, useGamesQuery } from "./hooks"
import type { GameSummary } from "./types"

import { Loader } from "@/components/ui"
import { ENV } from "@/lib/constants"
import { mockGames } from "@/lib/constants/mock-data.constants"
import { useDateStore } from "@/stores"

export default function SchedulePage() {
  const { t } = useTranslation()

  // Date Check on value changes
  useDateListener()

  const { selectedGameFilter } = useDateStore()
  const { data: gameTiles, isLoading, isFetching } = useGamesQuery()

  const filteredGames: GameSummary[] = useMemo(() => {
    const list = ENV.MOCK_DATA_ENABLED ? mockGames : gameTiles

    if (!list) return []
    if (selectedGameFilter === "ALL") return list

    return list.filter(game => game.state === selectedGameFilter)
  }, [gameTiles, selectedGameFilter])

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-5 sm:mt-10">

      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-marlins-gradient mt-2">
          {t("title")}
        </h1>

        {/* Date Selector */}
        <ScheduleDateSection />
      </div>

      {/* Loader */}
      {isLoading || isFetching ? (
        <Loader
          text={t("loading")}
          className="py-24"
        />
      ) : filteredGames && (
        <div className="flex flex-col gap-4 py-6 w-full px-3 sm:px-0">

          {/* Filters */}
          <GamesFilters
            selectedFilter={selectedGameFilter}
            games={ENV.MOCK_DATA_ENABLED ? mockGames : gameTiles || []}
          />

          {/* Content */}
          <div className="grid grid-cols-1 gap-5">
            {filteredGames.map(game => {

              const Component = {
                "NO_GAME": NoGameTile,
                "NOT_STARTED": NotStartedTile,
                "IN_PROGRESS": InProgressTile,
                "FINAL": FinalTile
              }[game.state]

              return <Component key={game.teamId} game={game} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}