import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

import { helpers } from "../helpers"
import type { GameSummary, ScheduleAPIResponse } from "../types"

import { useTeamsInfoQuery } from "./use-teams-info"

import { useDateLocale } from "@/hooks"
import { UI } from "@/lib/constants"
import { api } from "@/lib/utils"
import { useDateStore } from "@/stores"

export function useGamesQuery() {
  const locale = useDateLocale()
  const { currentDate } = useDateStore()

  const dateFormatted = currentDate ? format(currentDate, UI.DATE_FORMAT, { locale }) : null

  const { data: teamsRes = [] } = useTeamsInfoQuery()

  const queryFn = async (): Promise<GameSummary[]> => {
    const url = helpers.getScheduleApiUrl(dateFormatted)

    const { data } = await api.get<ScheduleAPIResponse>(url)

    const summaries = helpers.initializeSummaries(teamsRes)
    const games = data?.dates?.[0]?.games ?? []

    for (const game of games) {
      await helpers.fillGameSummary(game, summaries, locale!)
    }

    return summaries
  }

  return useQuery<GameSummary[]>({
    queryKey: [UI.TAN_STANK_KEYS.SCHEDULE, dateFormatted],
    queryFn,
    staleTime: 1000 * 60,
    enabled: !!dateFormatted && teamsRes?.length > 0
  })
}