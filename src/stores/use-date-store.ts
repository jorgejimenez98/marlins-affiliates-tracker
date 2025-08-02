/* eslint-disable no-unused-vars */
import { create } from "zustand"

import type { GameStateFilter } from "@/features/schedule/types"

type DateStore = {
  currentDate: Date | null
  selectedGameFilter: GameStateFilter
  onDateChange: (date: Date) => void
  onGameFilterChange: (value: GameStateFilter) => void
}

export const useDateStore = create<DateStore>(set => ({
  currentDate: null,
  selectedGameFilter: "ALL",
  onDateChange: date => set({ currentDate: date, selectedGameFilter: "ALL" }),
  onGameFilterChange: value => set({ selectedGameFilter: value })
}))
