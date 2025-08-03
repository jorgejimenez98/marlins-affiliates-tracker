import type { GameSummary } from "@/features/schedule/types"

export const mockGames: GameSummary[] = [
  {
    teamId: 1,
    teamName: "Miami Marlins",
    level: "Major League Baseball",
    opponentName: "New York Mets",
    state: "NOT_STARTED",
    venue: "loanDepot park, Miami, FL",
    gameTime: "7:10 PM",
    probablePitchers: { home: "Cabrera", away: "Manaea" }
  },
  {
    teamId: 2,
    teamName: "Jacksonville Jumbo Shrimp",
    level: "Triple-A",
    opponentName: "Durham Bulls",
    opponentParentClub: "TBR",
    state: "IN_PROGRESS",
    venue: "Bulls Stadium, Durham, NC",
    currentInning: "1",
    outs: 2,
    score: { home: 1, away: 3 },
    atBat: "J. Mack",
    pitcher: "C. Jones",
    runnersOnBase: ["1B", "3B"]
  },
  {
    teamId: 3,
    teamName: "Pensacola Blue Wahoos",
    level: "Double-A",
    opponentName: "Smokies",
    opponentParentClub: "CHC",
    state: "FINAL",
    venue: "Pensacola Park, Pensacola, FL",
    score: { home: 11, away: 8 },
    pitchersOfRecord: { win: "Smith", loss: "Jones", save: "Ramirez" }
  },
  {
    teamId: 4,
    teamName: "Beloit Sky Carp",
    level: "High-A",
    opponentName: "Loons",
    opponentParentClub: "LAD",
    state: "FINAL",
    venue: "Pensacola Park, Pensacola, FL",
    score: { home: 10, away: 2 },
    pitchersOfRecord: { win: "Smith", loss: "Jones" }
  },
  {
    teamId: 5,
    teamName: "Jupiter Hammerheads",
    level: "Single-A",
    opponentName: "Cardinals",
    opponentParentClub: "STL",
    state: "NOT_STARTED",
    venue: "Roger Dean Park, Jupiter, FL",
    gameTime: "3:40 PM",
    probablePitchers: { home: "White", away: "Black" }
  },
  {
    teamId: 6,
    teamName: "FCL Marlins",
    level: "Rookie",
    opponentName: "FCL Mets",
    opponentParentClub: "CHC",
    state: "FINAL",
    venue: "Roger Dean Park, Jupiter, FL",
    score: { home: 4, away: 8 },
    pitchersOfRecord: { win: "Smith", loss: "Jones" }
  },
  {
    teamId: 7,
    teamName: "DSL Miami",
    level: "Rookie",
    opponentName: "FCL Cardinals",
    opponentParentClub: "STL",
    state: "NOT_STARTED",
    venue: "Cardinals Facility, DR",
    gameTime: "3:40 PM",
    probablePitchers: { home: "White", away: "Black" }
  },
  {
    teamId: 8,
    teamName: "Miami Marlins Prospects",
    level: "Minor League Baseball",
    state: "NO_GAME"
  },
  {
    teamId: 9,
    teamName: "FCL Marlins Blue",
    level: "Rookie",
    state: "NO_GAME"
  },
  {
    teamId: 10,
    teamName: "Marlins Alternate Training Site",
    level: "Minor League Baseball",
    state: "NO_GAME"
  },
  {
    teamId: 11,
    teamName: "Miami Marlins AAA",
    level: "Triple-A",
    opponentName: "Nashville Sounds",
    opponentParentClub: "MIL",
    state: "IN_PROGRESS",
    venue: "First Horizon Park, Nashville, TN",
    currentInning: "7",
    outs: 1,
    score: { home: 5, away: 4 },
    atBat: "Rodriguez",
    pitcher: "Martinez",
    runnersOnBase: ["2B", "3B"]
  }
]