"use client"
import { format as formatDate } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "../button/button.component"
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover.component"

import { CalendarView, MonthView, YearView } from "./components"
import type { DatePickerProps } from "./date-picker.properties"
import { useDatePicker } from "./hooks/use-date-picker"

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  format = "PPP",
  disabled,
  className,
  clearEnabled = true
}: DatePickerProps) {

  const {
    // States
    currentDate,
    currentMonth,
    currentYear,
    decadeStart,
    selectedDate,
    view,

    // Functions
    handleDateSelect,
    handleMonthClick,
    handleMonthSelect,
    handleNextDecade,
    handleNextMonth,
    handleNextYear,
    handlePrevDecade,
    handlePrevMonth,
    handlePrevYear,
    handleYearClick,
    handleYearSelect
  } = useDatePicker({ value, onChange })

  // Render the appropriate view
  const renderContent = () => {
    switch (view) {
      case "month":
        return (
          <MonthView
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthSelect={handleMonthSelect}
            onYearClick={handleYearClick}
            onPrevYear={handlePrevYear}
            onNextYear={handleNextYear}
          />
        )
      case "year":
        return (
          <YearView
            currentYear={currentYear}
            decadeStart={decadeStart}
            onYearSelect={handleYearSelect}
            onPrevDecade={handlePrevDecade}
            onNextDecade={handleNextDecade}
          />
        )
      default:
        return (
          <CalendarView
            currentDate={currentDate}
            selectedDate={selectedDate}
            clearEnabled={clearEnabled}
            onDateSelect={handleDateSelect}
            onMonthClick={handleMonthClick}
            onYearClick={handleYearClick}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        )
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          disabled={disabled}
          className={cn(
            "relative w-full sm:w-fit flex justify-start items-center p-1 rounded-md border min-h-10 h-auto  bg-inherit [&_svg]:pointer-events-auto",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {selectedDate ? formatDate(selectedDate, format) : <span>{placeholder}</span>}

          {selectedDate && clearEnabled && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full w-8 rounded-l-none"
              onClick={e => {
                e.stopPropagation()
                handleDateSelect(null)
              }}
              disabled={disabled}
            >
              <span className="sr-only">Clear date</span>
              <X className="h-4 w-4" />
            </Button>
          )}

        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        {renderContent()}
      </PopoverContent>
    </Popover>
  )
}