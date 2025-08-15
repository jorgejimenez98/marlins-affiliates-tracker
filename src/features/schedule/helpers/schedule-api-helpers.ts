/* eslint-disable complexity */
import { format, type Locale } from "date-fns"

import { HYDRATION_PARAMS, SPORT_IDS, TEAM_IDS } from "../constants"
import type { Decision, Game, GameSummary, LiveFeedResponse, SmallTeamInfo, TeamSide, TeamsParam, Venue } from "../types"


import { ENDPOINTS } from "@/lib/constants"
import { api } from "@/lib/utils"

class ScheduleApiHelper {

  // Constructs the API URL to fetch schedule data for given date
  getScheduleApiUrl(dateFormatted: string | null) {
    const params = new URLSearchParams()

    TEAM_IDS.forEach(id => params.append("teamId", id.toString()))
    SPORT_IDS.forEach(id => params.append("sportId", id.toString()))

    if (dateFormatted) params.append("date", dateFormatted)

    const url = `${ENDPOINTS.SCHEDULE}?${params.toString()}&${HYDRATION_PARAMS}`

    return url
  }

  // Initializes empty game summaries for all teams
  initializeSummaries(teams: SmallTeamInfo[]): GameSummary[] {
    return teams.map(team => ({
      teamId: team.id,
      teamName: team.name,
      level: team.level,
      state: "NO_GAME"
    }))
  }


  getTeamSides(teams: TeamsParam): { teamSide: TeamSide; oppSide: TeamSide } | null {
    if (TEAM_IDS.includes(teams.home.team.id)) {
      return { teamSide: "home", oppSide: "away" }
    }

    if (TEAM_IDS.includes(teams.away.team.id)) {
      return { teamSide: "away", oppSide: "home" }
    }

    return null
  }

  // Fills a specific team's summary based on game data and game state
  async fillGameSummary(game: Game, summaries: GameSummary[], locale: Locale) {
    const { teams, status, decisions } = game

    const sides = this.getTeamSides(teams)
    if (!sides) return

    const { teamSide, oppSide } = sides
    const teamId = teams[teamSide].team.id

    const summaryIndex = summaries.findIndex(s => s.teamId === teamId)
    if (summaryIndex === -1) return

    const summary: GameSummary = {
      teamId,
      teamName: teams[teamSide].team.name,
      level: summaries[summaryIndex].level,
      opponentName: teams[oppSide].team.name,
      opponentParentClub: teams[oppSide].team.parentOrgName,
      state: "NO_GAME"
    }

    switch (status.abstractGameState) {
      case "Preview": {
        this.fillPreviewGame(summary, game, locale, teamSide)
        break
      }
      case "Live": {
        await this.fillLiveGame(summary, game, teams, teamSide, oppSide)
        break
      }
      case "Final": {
        this.fillFinalGame(summary, teams, decisions!, teamSide, oppSide)
        break
      }
    }


    summaries[summaryIndex] = summary
  }

  /* --------------------------------------------------- Helpers  ---------------- s*/

  // Formats and returns the venue string (name + location)
  getVenue(venue: Venue): string {
    return [
      venue?.name,
      venue?.location?.city,
      venue?.location?.stateAbbrev
    ].filter(Boolean).join(", ")
  }

  // Fills preview (not started) game data into summary
  fillPreviewGame(summary: GameSummary, game: Game, locale: Locale, teamSide: TeamSide) {
    summary.state = "NOT_STARTED"
    summary.venue = this.getVenue(game.venue)
    summary.gameTime = format(game.gameDate, "hh:mm a", { locale })

    const homePitcher = game.teams.home.probablePitcher?.fullName
    const awayPitcher = game.teams.away.probablePitcher?.fullName

    summary.probablePitchers = {
      home: teamSide === "home" ? homePitcher : awayPitcher,
      away: teamSide === "home" ? awayPitcher : homePitcher
    }

  }

  // Fills live game data, including current inning, outs, and runners on base
  fillFinalGame(summary: GameSummary, teams: TeamsParam, decisions: Decision, teamSide: TeamSide, oppSide: TeamSide) {
    summary.state = "FINAL"

    summary.score = {
      home: teams[teamSide].score ?? 0,
      away: teams[oppSide].score ?? 0
    }

    summary.pitchersOfRecord = {
      win: decisions?.winner?.fullName,
      loss: decisions?.loser?.fullName,
      save: decisions?.save?.fullName
    }
  }

  async fillLiveGame(summary: GameSummary, game: Game, teams: TeamsParam, teamSide: TeamSide, oppSide: TeamSide) {
    summary.state = "IN_PROGRESS"
    summary.venue = this.getVenue(game.venue)

    try {
      const { data: liveData }: { data: LiveFeedResponse } = await api.get(`${game.link}?hydrate=plays,runners`)
      const ls = liveData?.liveData?.linescore

      summary.currentInning = ls?.currentInningOrdinal
      summary.inningHalf = ls?.inningHalf
      summary.outs = ls?.outs
      summary.score = {
        home: ls?.teams?.[teamSide]?.runs ?? 0,
        away: ls?.teams?.[oppSide]?.runs ?? 0
      }

      summary.atBat = ls?.offense?.batter?.fullName
      summary.pitcher = ls?.offense?.pitcher?.fullName

      const runners = liveData?.liveData?.plays?.currentPlay?.runners ?? []
      summary.runnersOnBase = runners
        .filter(r => !r.movement?.isOut && typeof r.movement?.end === "string")
        .map(r => r.movement!.end)

    } catch {
      summary.score = {
        home: teams[teamSide].score ?? 0,
        away: teams[oppSide].score ?? 0
      }
      summary.runnersOnBase = []
    }
  }
}

const helpers = new ScheduleApiHelper()
export { helpers }
