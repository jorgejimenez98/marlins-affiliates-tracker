import { useState } from "react"

import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui"

export function HeaderRefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      console.warn("Reload")
    }, 500)
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      <RefreshCw className={`${isRefreshing ? "animate-spin" : ""}`} />
      <span className="sr-only">Refresh page</span>
    </Button>
  )
}