import { useMemo } from "react"

import { AnimatePresence, motion } from "framer-motion"
import { LayoutGrid, List } from "lucide-react"
import { useTranslation } from "react-i18next"

import { FinalTile, InProgressTile, GamesFilters, NoGameTile, NotStartedTile, ScheduleDateSection } from "./components"
import { useDateListener, useGamesQuery } from "./hooks"
import type { GameSummary } from "./types"

import { Skeleton, ToggleGroup, ToggleGroupItem } from "@/components/ui"
import { ENV } from "@/lib/constants"
import { mockGames } from "@/lib/constants/mock-data.constants"
import { useDateStore } from "@/stores"

export default function SchedulePage() {
  const { t } = useTranslation()

  // Date Check on value changes
  useDateListener()

  const { selectedGameFilter, selectedView, setSelectedView } = useDateStore()

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
        <Skeleton
          cols={selectedView}
          className="py-6"
        />
      ): filteredGames && (
        <div className="flex flex-col gap-4 py-6 w-full px-3 sm:px-0">

          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
            {/* Filters */}
            <GamesFilters
              selectedFilter={selectedGameFilter}
              games={ENV.MOCK_DATA_ENABLED ? mockGames : gameTiles || []}
            />

            {/* View Toggle */}
            <ToggleGroup
              type="single"
              defaultValue={`${selectedView}`}
              onValueChange={val => setSelectedView(val === "2" ? 2 : 1)}
              className="self-end sm:self-auto hidden sm:block"
            >
              <ToggleGroupItem value="1" aria-label="1 column">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="2" aria-label="2 columns">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`grid grid-cols-1 ${selectedView === 2 ? "sm:grid-cols-2" : ""} gap-5`}
            >
              {filteredGames.map(game => {
                const Component = {
                  "NO_GAME": NoGameTile,
                  "NOT_STARTED": NotStartedTile,
                  "IN_PROGRESS": InProgressTile,
                  "FINAL": FinalTile
                }[game.state]

                return <Component key={game.teamId} game={game} />
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}