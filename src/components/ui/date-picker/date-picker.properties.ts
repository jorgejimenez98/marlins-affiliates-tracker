/* eslint-disable no-unused-vars */
import type { Dispatch, SetStateAction } from "react"

// Date picker view types
export type DateView = "calendar" | "month" | "year"

export type DateFormat =
  | "MM/dd/yyyy" // 03/26/2025
  | "MMMM dd, yyyy" // March 26, 2025
  | "EEE, MMM d, yyyy" // Wed, Mar 26, 2025
  | "MMM d, yyyy" // Mar 26, 2025
  | "yyyy-MM-dd" // 2025-03-26 (ISO style)
  | "PPP"
  | "PP" // date-fns predefined format

// Main DatePicker component props
export interface DatePickerProps {
  value: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  format?: DateFormat
  disabled?: boolean
  className?: string
  clearEnabled?: boolean
  yearViewEnabled?: boolean
}

// Hook return type
export interface DatePickerHookReturn {
  date: Date | null
  view: DateView
  currentDate: Date
  selectedDate: Date | null
  currentMonth: number
  currentYear: number
  decadeStart: number

  setDate: Dispatch<SetStateAction<Date | null>>
  setView: Dispatch<SetStateAction<DateView>>
  handleMonthClick: () => void
  handleYearClick: () => void
  handleMonthSelect: (month: number) => void
  handleYearSelect: (year: number) => void
  handleDateSelect: (day: Date | null) => void
  handlePrevMonth: () => void
  handleNextMonth: () => void
  handlePrevYear: () => void
  handleNextYear: () => void
  handlePrevDecade: () => void
  handleNextDecade: () => void
}

// Calendar view props
export interface CalendarViewProps {
  currentDate: Date
  selectedDate: Date | null
  clearEnabled?: boolean
  yearViewEnabled?: boolean
  onDateSelect: (date: Date | null) => void
  onMonthClick: () => void
  onYearClick: () => void
  onPrevMonth: () => void
  onNextMonth: () => void
}

// Month view props
export interface MonthViewProps {
  currentMonth: number
  currentYear: number
  yearViewEnabled?: boolean
  onMonthSelect: (month: number) => void
  onYearClick: () => void
  onPrevYear: () => void
  onNextYear: () => void
}

// Year view props
export interface YearViewProps {
  currentYear: number
  decadeStart: number
  onYearSelect: (year: number) => void
  onPrevDecade: () => void
  onNextDecade: () => void
}