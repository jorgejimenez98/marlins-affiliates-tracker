import { useState } from "react"

import { useQueryClient } from "@tanstack/react-query"
import { formatDate } from "date-fns"
import { RefreshCw } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { Button } from "@/components/ui"
import { UI } from "@/lib/constants"
import { sleep } from "@/lib/utils"
import { useDateStore } from "@/stores"

export function HeaderRefreshButton() {
  const { t } = useTranslation()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const queryClient = useQueryClient()
  const { currentDate } = useDateStore()
  const dateFormatted = currentDate ? formatDate(currentDate, UI.DATE_FORMAT) : null

  const handleRefresh = async () => {
    if (!dateFormatted) return

    setIsRefreshing(true)
    await sleep(0.5)
    await queryClient.invalidateQueries({ queryKey: [UI.TAN_STANK_KEYS.SCHEDULE] })

    toast.success(t("data-updated"))

    setIsRefreshing(false)
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleRefresh}
      disabled={!currentDate}
    >
      <RefreshCw className={`${isRefreshing ? "animate-spin" : ""}`}/>
      <span className="sr-only">Refresh page</span>
    </Button>
  )
}