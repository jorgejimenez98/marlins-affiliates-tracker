/* eslint-disable complexity */
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"

import { HYDRATION_FIELDS, SPORT_IDS, TEAM_IDS } from "../constants"
import type { GameSummary, LiveFeedResponse, ScheduleAPIResponse } from "../types"

import { useTeamsInfoQuery } from "./use-teams-info"

import { useDateLocale } from "@/hooks"
import { ENDPOINTS, UI } from "@/lib/constants"
import { api } from "@/lib/utils"
import { useDateStore } from "@/stores"

export function useGamesQuery() {
  const locale = useDateLocale()

  const { currentDate } = useDateStore()
  const dateFormatted = currentDate ? format(currentDate, UI.DATE_FORMAT, { locale }) : null

  const { data: teamsRes = [] } = useTeamsInfoQuery()

  const queryFn = async (): Promise<GameSummary[]> => {
    const params = new URLSearchParams()

    TEAM_IDS.forEach(id => params.append("teamId", id.toString()))
    SPORT_IDS.forEach(id => params.append("sportId", id.toString()))
    HYDRATION_FIELDS.forEach(field => params.append("hydrate", field))

    if (dateFormatted) params.append("date", dateFormatted)

    const url = `${ENDPOINTS.SCHEDULE}?${params.toString()}`
    const { data }: { data: ScheduleAPIResponse } = await api.get(url)

    const summaries: GameSummary[] = teamsRes.map(team => ({
      teamId: team.id,
      teamName: team.name,
      level: team.level,
      state: "NO_GAME"
    }))

    const games = data?.dates?.[0]?.games ?? []

    for (const game of games) {
      const { link: liveGameLink, teams, gameDate, status, venue, probablePitchers, decisions } = game

      const isHome = TEAM_IDS.includes(teams.home.team.id)
      const isAway = TEAM_IDS.includes(teams.away.team.id)

      if (!isHome && !isAway) continue

      const teamSide = isHome ? "home" : "away"
      const oppSide = isHome ? "away" : "home"
      const teamId = teams[teamSide].team.id

      const summaryIndex = summaries.findIndex(s => s.teamId === teamId)
      if (summaryIndex === -1) continue

      const summary: GameSummary = {
        teamId,
        teamName: teams[teamSide].team.name,
        level: summaries[summaryIndex].level,
        opponentName: teams[oppSide].team.name,
        opponentParentClub: teams[oppSide].team.clubName,
        state: "NO_GAME"
      }

      switch (status.abstractGameState) {
        case "Preview":
          summary.state = "NOT_STARTED"
          summary.venue = venue?.name
          summary.gameTime = format(gameDate, "hh:mm a", { locale })
          if (probablePitchers) {
            summary.probablePitchers = {
              home: probablePitchers?.home?.fullName,
              away: probablePitchers?.away?.fullName
            }
          }
          break

        case "Live":
          summary.state = "IN_PROGRESS"
          summary.venue = venue?.name

          try {
            const { data: liveData }: { data: LiveFeedResponse } = await api.get(`${liveGameLink}?hydrate=plays&hydrate=runners`)
            const ls = liveData?.liveData?.linescore

            summary.currentInning = ls?.currentInningOrdinal
            summary.outs = ls?.outs
            summary.score = {
              home: ls?.teams?.home?.runs ?? 0,
              away: ls?.teams?.away?.runs ?? 0
            }

            summary.atBat = ls?.offense?.batter?.fullName
            summary.pitcher = ls?.offense?.pitcher?.fullName

            const runners = liveData?.liveData?.plays?.currentPlay?.runners ?? []

            //console.log({ x: liveData?.liveData?.plays?.currentPlay })

            summary.runnersOnBase = runners
              .filter(r => !r.movement?.isOut && typeof r.movement?.end === "string")
              .map(r => r.movement!.end)

            //console.log({ o: summary.runnersOnBase })

          } catch {
            summary.score = {
              home: teams.home.score ?? 0,
              away: teams.away.score ?? 0
            }
            summary.runnersOnBase = []
          }

          break

        case "Final":
          summary.state = "FINAL"
          summary.score = {
            home: teams.home.score ?? 0,
            away: teams.away.score ?? 0
          }
          summary.pitchersOfRecord = {
            win: decisions?.winner?.fullName,
            loss: decisions?.loser?.fullName,
            save: decisions?.save?.fullName
          }
          break
      }

      summaries[summaryIndex] = summary
    }

    return summaries
  }

  return useQuery<GameSummary[]>({
    queryKey: [UI.TAN_STANK_KEYS.SCHEDULE, dateFormatted],
    queryFn,
    staleTime: 1000 * 60,
    enabled: !!dateFormatted && teamsRes.length > 0
  })
}