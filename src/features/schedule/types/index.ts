export type GameState = "NO_GAME" | "NOT_STARTED" | "IN_PROGRESS" | "FINAL"

export type GameStateFilter = GameState | "ALL"

export interface GameSummary {
  teamId: number
  teamName: string
  level: string
  opponentName?: string
  opponentParentClub?: string
  state: GameState
  venue?: string
  gameTime?: string
  currentInning?: string
  outs?: number
  score?: { home: number; away: number }
  runnersOnBase?: string[] // Ex: ["1B", "2B", "3B"]
  atBat?: string
  pitcher?: string
  probablePitchers?: { home?: string; away?: string }
  pitchersOfRecord?: { win?: string; loss?: string; save?: string }
}

export interface TeamInfo {
  leagueRecord: {
    wins: number
    losses: number
    pct: string
  }
  team: {
    id: number
    name: string
    link: string
    clubName?: string
  }
  score?: number
  splitSquad?: boolean
  seriesNumber?: number
}

export interface Game {
  gamePk: number
  gameDate: string
  link: string
  status: {
    abstractGameState: string
    detailedState: string
  }
  teams: {
    home: TeamInfo
    away: TeamInfo
  }
  venue: {
    id: number
    name: string
    link: string
  }
  linescore?: {
    currentInning?: number
    inningHalf?: string
    outs?: number
    offense?: {
      batter?: { fullName: string }
      pitcher?: { fullName: string }
    }
  }
  probablePitchers?: {
    home?: { fullName: string }
    away?: { fullName: string }
  }
  decisions?: {
    winner?: { fullName: string }
    loser?: { fullName: string }
    save?: { fullName: string }
  }
}

export interface ScheduleAPIResponse {
  copyright: string
  totalItems: number
  totalEvents: number
  totalGames: number
  totalGamesInProgress: number
  dates: Array<{
    date: string
    totalItems: number
    totalEvents: number
    totalGames: number
    totalGamesInProgress: number
    games: Game[]
  }>
}


export interface TeamDetails {
  springLeague: Division;
  allStarStatus: string;
  id: number;
  name: string;
  link: string;
  season: number;
  venue: Division;
  springVenue: SpringVenue;
  teamCode: string;
  fileCode: string;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  league: Division;
  division: Division;
  sport: Division;
  shortName: string;
  franchiseName: string;
  clubName: string;
  active: boolean;
}

export interface Division {
  id: number;
  name: string;
  link: string;
  abbreviation?: string;
}

export interface SpringVenue {
  id: number;
  link: string;
}


export interface SmallTeamInfo {
  id: number
  name: string
  level: string
  shortName: string
}

export interface LiveFeedResponse {
  liveData?: {
    linescore?: {
      currentInning?: number
      currentInningOrdinal: string
      inningHalf?: string
      outs?: number
      teams?: {
        home?: { runs?: number }
        away?: { runs?: number }
      }
      offense?: {
        batter?: { fullName: string }
        pitcher?: { fullName: string }
      }
    }

    plays?: {
      currentPlay?: {
        runners?: {
          movement?: {
            isOut?: boolean
            end: string
          }
        }[]
      }
    }
  }
}