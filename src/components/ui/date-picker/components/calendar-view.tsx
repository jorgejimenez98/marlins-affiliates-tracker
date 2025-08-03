
"use client"

import { useMemo } from "react"

import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "../../button/button.component"
import type { CalendarViewProps } from "../date-picker.properties"

import { useDateLocale } from "@/hooks"
import { cn } from "@/lib/utils"


export function CalendarView({
  currentDate,
  selectedDate,
  clearEnabled,
  yearViewEnabled,
  onDateSelect,
  onMonthClick,
  onYearClick,
  onPrevMonth,
  onNextMonth
}: CalendarViewProps) {
  const { t, i18n } = useTranslation()
  const locale = useDateLocale()

  const weekDays = {
    en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    es: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
  }[i18n.language]

  // Get days for the current month view
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)


  const calendarRows = useMemo(() => {
    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        days.push(
          <Button
            key={day.toString()}
            type="button"
            variant="ghost"
            className={cn(
              "h-9 w-9 p-0 font-normal",
              !isSameMonth(day, monthStart) && "text-muted-foreground",
              selectedDate && isSameDay(day, selectedDate) && "bg-primary text-primary-foreground hover:bg-primary/50"
            )}
            onClick={() => onDateSelect(cloneDay)}
          >
            {format(day, "d", { locale })}
          </Button>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      )
      days = []
    }

    return rows
  }, [startDate, endDate, monthStart, selectedDate, onDateSelect, locale])


  return (
    <div className="p-2">
      <div className="flex items-center justify-between p-2">

        <Button type="button" variant="ghost" size="icon" onClick={onPrevMonth} className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex space-x-1">
          <Button type="button" variant="ghost" onClick={onMonthClick} className="font-medium text-sm">
            {format(currentDate, "MMMM", { locale })}
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onYearClick}
            className="font-medium text-sm"
            disabled={!yearViewEnabled}
          >
            {format(currentDate, "yyyy", { locale })}
          </Button>
        </div>
        <Button type="button" variant="ghost" size="icon" onClick={onNextMonth} className="h-7 w-7">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {weekDays?.map(day => (
          <div key={day} className="text-center text-xs text-muted-foreground h-9 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 space-y-1">
        {calendarRows}
      </div>

      {/* Agregar footer con botón Clear */}
      <div className={`border-t flex ${clearEnabled ? "justify-between" : "justify-end"} pt-2`}>
        {clearEnabled && (
          <Button type="button" variant="outline" size="sm" onClick={() => onDateSelect(null)} >
            {t("clear")}
          </Button>
        )}

        <Button type="button" size="sm" onClick={() => onDateSelect(new Date())} >
          {t("today")}
        </Button>
      </div>
    </div>
  )
}
