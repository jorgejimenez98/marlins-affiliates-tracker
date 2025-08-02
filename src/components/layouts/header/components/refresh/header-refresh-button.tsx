import { useQueryClient } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui"
import { UI } from "@/lib/constants"
import { useDateStore } from "@/stores"


export function HeaderRefreshButton() {
  const queryClient = useQueryClient()
  const { currentDate } = useDateStore()
  const dateFormatted = currentDate ? formatDate(currentDate, UI.DATE_FORMAT) : null

  const handleRefresh = async () => {
    if (!dateFormatted) return
    await queryClient.invalidateQueries({ queryKey: [UI.TAN_STANK_KEYS.SCHEDULE] })
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleRefresh}
      disabled={!currentDate}
    >
      <RefreshCw />
      <span className="sr-only">Refresh page</span>
    </Button>
  )
}