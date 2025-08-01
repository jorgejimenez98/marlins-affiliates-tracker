"use client"

import { useMemo } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "../../../../lib/utils"
import { Button } from "../../button/button.component"
import type { YearViewProps } from "../date-picker.properties"


export function YearView({
  currentYear,
  decadeStart,
  onYearSelect,
  onPrevDecade,
  onNextDecade
}: YearViewProps) {

  const MIN_YEAR = 1920
  const MAX_YEAR = new Date().getFullYear() + 100

  const years = useMemo(() => {
    const result: number[] = []

    for (let i = -1; i < 11; i++) {
      const year = decadeStart + i
      if (year >= MIN_YEAR && year <= MAX_YEAR) {
        result.push(year)
      }
    }

    return result
  }, [decadeStart, MAX_YEAR])

  const canGoPrev = decadeStart - 10 >= MIN_YEAR
  const canGoNext = decadeStart + 50 <= MAX_YEAR

  return (
    <div className="p-2">
      <div className="flex items-center justify-between p-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onPrevDecade}
          className="h-7 w-7"
          disabled={!canGoPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="font-medium text-sm">
          {decadeStart}-{decadeStart + 9}
        </span>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onNextDecade}
          className="h-7 w-7"
          disabled={!canGoNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2">
        {years.map(year => {
          const isCurrentYear = year === currentYear
          const isOutsideDecade = year < decadeStart || year > decadeStart + 9

          return (
            <Button
              key={year}
              type="button"
              variant={isCurrentYear ? "default" : "ghost"}
              className={cn(
                "h-9 text-sm",
                isCurrentYear && "bg-primary text-primary-foreground",
                isOutsideDecade && "text-muted-foreground"
              )}
              onClick={() => onYearSelect(year)}
            >
              {year}
            </Button>
          )
        })}
      </div>
    </div>
  )
}