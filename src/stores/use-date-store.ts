/* eslint-disable no-unused-vars */
import { create } from "zustand"

type DateStore = {
  currentDate: Date
  onDateChange: (date: Date) => void
}

export const useDateStore = create<DateStore>(set => ({
  currentDate: new Date(),
  onDateChange: date => set({ currentDate: date })
}))
