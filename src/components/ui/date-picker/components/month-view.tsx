"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "../../button/button.component"
import type { MonthViewProps } from "../date-picker.properties"

import { cn } from "@/lib/utils"

export function MonthView({
  currentMonth,
  currentYear,
  onMonthSelect,
  onYearClick,
  onPrevYear,
  onNextYear
}: MonthViewProps) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <div className="p-2">
      <div className="flex items-center justify-between p-2">
        <Button type="button" variant="ghost" size="icon" onClick={onPrevYear} className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button type="button" variant="ghost" onClick={onYearClick} className="font-medium text-sm">
          {currentYear}
        </Button>

        <Button type="button" variant="ghost" size="icon" onClick={onNextYear} className="h-7 w-7">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2">
        {months.map((month, index) => (
          <Button
            type="button"
            key={month}
            variant={index === currentMonth ? "default" : "ghost"}
            className={cn("h-9 text-sm", index === currentMonth && "bg-primary text-primary-foreground")}
            onClick={() => onMonthSelect(index)}
          >
            {month}
          </Button>
        ))}
      </div>
    </div>
  )
}