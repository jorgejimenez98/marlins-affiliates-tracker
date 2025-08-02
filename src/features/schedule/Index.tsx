import { useMemo, useState } from "react"

import { FinalTile, InProgressTile, GamesFilters, NoGameTile, NotStartedTile, ScheduleDateSection } from "./components"
import { useDateListener, useGamesQuery } from "./hooks"
import type { GameStateFilter, GameSummary } from "./types"

import { Loader } from "@/components/ui"
import { ENV } from "@/lib/constants"
import { mockGames } from "@/lib/constants/mock-data.constants"

export default function SchedulePage() {
  // Date Check on value changes
  useDateListener()

  const { data: gameTiles, isLoading, isFetching } = useGamesQuery()

  const [selectedFilter, setSelectedFilter] = useState<GameStateFilter>("ALL")

  const filteredGames: GameSummary[] = useMemo(() => {
    const list = ENV.MOCK_DATA_ENABLED ? mockGames : gameTiles

    if (!list) return []
    if (selectedFilter === "ALL") return list

    return list.filter(game => game.state === selectedFilter)
  }, [gameTiles, selectedFilter])

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-5 sm:mt-10">

      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-marlins-gradient mt-2">
          Schedule and Results
        </h1>

        {/* Date Selector */}
        <ScheduleDateSection />
      </div>

      {/* Loader */}
      {isLoading || isFetching ? (
        <Loader
          text="Loading data"
          className="py-24"
        />
      ) : filteredGames && (
        <div className="flex flex-col gap-4 py-6 w-full px-3 sm:px-0">

          {/* Filters */}
          <GamesFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            games={ENV.MOCK_DATA_ENABLED ? mockGames : gameTiles || []}
          />

          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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