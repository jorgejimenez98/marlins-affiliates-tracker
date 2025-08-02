import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button, DatePicker } from "@/components/ui"
import { useDateStore } from "@/stores"

export function ScheduleDateSection() {
  const { onDateChange, currentDate } = useDateStore()

  const handlePreviousDay = () => {
    if (!currentDate) return

    const previousDay = currentDate
    previousDay.setDate(previousDay.getDate() - 1)
    onDateChange(previousDay)
  }

  const handleNextDay = () => {
    if (!currentDate) return

    const nextDay = currentDate
    nextDay.setDate(nextDay.getDate() + 1)
    onDateChange(nextDay)
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePreviousDay}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <DatePicker
        value={currentDate}
        onChange={date => date && onDateChange(date)}
        clearEnabled={false}
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNextDay}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}