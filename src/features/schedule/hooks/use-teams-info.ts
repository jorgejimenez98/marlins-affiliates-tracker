import { useQuery } from "@tanstack/react-query"

import { TEAM_IDS } from "../constants"
import type { SmallTeamInfo, TeamDetails } from "../types"

import { ENDPOINTS, UI } from "@/lib/constants"
import { api } from "@/lib/utils"

export function useTeamsInfoQuery() {
  return useQuery<SmallTeamInfo[]>({
    queryKey: [UI.TAN_STANK_KEYS.TEAMS],
    queryFn: async () => {
      const results = await Promise.all(
        TEAM_IDS.map(async id => {
          const { data } = await api.get<{ teams: TeamDetails[] }>(`${ENDPOINTS.TEAMS}/${id}`)
          const team = data.teams[0]
          return {
            id: team.id,
            name: team.name,
            level: team.sport?.name ?? "",
            shortName: team.teamName
          }
        })
      )

      return results
    },
    staleTime: 1000 * 60 * 60 * 24 // 24h
  })
}
