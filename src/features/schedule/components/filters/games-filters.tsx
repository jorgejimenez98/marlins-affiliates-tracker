import { Circle } from "lucide-react"
import { useTranslation } from "react-i18next"

import type { GameStateFilter, GameSummary } from "../../types"

import { Badge, Button } from "@/components/ui"
import { useDateStore } from "@/stores"

interface GameFilterProps {
    selectedFilter: GameStateFilter
    games: GameSummary[]
}

export function GamesFilters({ selectedFilter, games }: GameFilterProps) {
  const { t } = useTranslation()

  const { onGameFilterChange } = useDateStore()

  const filters: { key: GameStateFilter; label: string; icon?: React.ReactNode }[] = [
    { key: "ALL", label: t("all-teams") },
    { key: "NO_GAME", label: t("no-game") },
    { key: "NOT_STARTED", label: t("scheduled") },
    { key: "IN_PROGRESS", label: t("live"), icon: <Circle className="h-3 w-3 fill-current" /> },
    { key: "FINAL", label: t("final") }
  ]

  const gameCounts = {
    ALL: games.length,
    NO_GAME: games.filter(g => g.state === "NO_GAME").length,
    NOT_STARTED: games.filter(g => g.state === "NOT_STARTED").length,
    IN_PROGRESS: games.filter(g => g.state === "IN_PROGRESS").length,
    FINAL: games.filter(g => g.state === "FINAL").length
  }

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.filter(item => gameCounts[item.key] > 0).map(filter => (
          <Button
            key={filter.key}
            variant={selectedFilter === filter.key ? "default" : "outline"}
            size="sm"
            onClick={() => onGameFilterChange(filter.key)}
          >
            <div className="flex items-center gap-1 sm:gap-2">
              {filter.icon}

              <span className="hidden sm:inline">
                {filter.label}
              </span>

              <span className="sm:hidden">
                {filter.label.split(" ")[0]}
              </span>

              <Badge variant="secondary" className="text-xs bg-background/80 text-foreground">
                {gameCounts[filter.key]}
              </Badge>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}