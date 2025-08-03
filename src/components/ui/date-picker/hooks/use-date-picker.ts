
/* eslint-disable no-unused-vars */
"use client"

import { useEffect, useState } from "react"

import { getMonth, getYear, setMonth, setYear, addMonths, subMonths } from "date-fns"

import type { DatePickerHookReturn, DateView } from "../date-picker.properties"


interface UseDatePickerProps {
  value: Date | null
  yearViewEnabled: boolean
  onChange: (date: Date | null) => void
}

export function useDatePicker({ value, yearViewEnabled, onChange }: UseDatePickerProps): DatePickerHookReturn {
  const [date, setDate] = useState<Date | null>(value || null)
  const [view, setView] = useState<DateView>("calendar")

  const [currentDate, setCurrentDate] = useState<Date>(value || new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null)

  // Sync with external value
  useEffect(() => {
    if (value !== undefined) {
      setDate(value)
      setSelectedDate(value)
      if (value) {
        setCurrentDate(value)
      }
    }
  }, [value])

  const currentMonth = getMonth(currentDate)
  const currentYear = getYear(currentDate)
  const decadeStart = Math.floor(currentYear / 10) * 10

  // View handlers
  const handleMonthClick = () => setView("month")
  const handleYearClick = () => {
    if (yearViewEnabled) setView("year")
  }

  // Selection handlers
  const handleMonthSelect = (monthIndex: number) => {
    const newDate = setMonth(currentDate, monthIndex)
    setCurrentDate(newDate)
    setView("calendar")
  }

  const handleYearSelect = (year: number) => {
    const newDate = setYear(currentDate, year)
    setCurrentDate(newDate)
    setView("month")
  }

  const handleDateSelect = (day: Date | null) => {
    setSelectedDate(day)
    const newDate = day
    setDate(newDate)

    // Call external onChange if provided
    if (onChange) {
      onChange(newDate)
    }
  }

  // Navigation handlers
  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const handlePrevYear = () => {
    setCurrentDate(setYear(currentDate, currentYear - 1))
  }

  const handleNextYear = () => {
    setCurrentDate(setYear(currentDate, currentYear + 1))
  }

  const handlePrevDecade = () => {
    setCurrentDate(setYear(currentDate, currentYear - 10))
  }

  const handleNextDecade = () => {
    setCurrentDate(setYear(currentDate, currentYear + 10))
  }

  return {
    // States
    currentDate,
    currentMonth,
    currentYear,
    date,
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
    handleYearSelect,
    setDate,
    setView
  }
}
