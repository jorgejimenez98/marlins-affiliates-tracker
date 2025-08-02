/* eslint-disable no-unused-vars */
import { create } from "zustand"

type DateStore = {
  currentDate: Date | null
  onDateChange: (date: Date) => void
}

export const useDateStore = create<DateStore>(set => ({
  currentDate: null,
  onDateChange: date => set({ currentDate: date })
}))
