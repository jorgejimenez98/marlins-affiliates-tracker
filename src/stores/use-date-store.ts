/* eslint-disable no-unused-vars */
import { create } from "zustand"

import type { GameStateFilter } from "@/features/schedule/types"

type DateStore = {
  currentDate: Date | null
  selectedGameFilter: GameStateFilter
  selectedView: number
  onDateChange: (date: Date) => void
  onGameFilterChange: (value: GameStateFilter) => void
  setSelectedView: (value: number) => void
}

export const useDateStore = create<DateStore>(set => ({
  currentDate: null,
  selectedGameFilter: "ALL",
  selectedView: 1,
  onDateChange: date => set({ currentDate: date, selectedGameFilter: "ALL" }),
  onGameFilterChange: value => set({ selectedGameFilter: value }),
  setSelectedView: value => set({ selectedView: value })
}))
