import { useEffect } from "react"

import { useLocation } from "react-router-dom"

import { useDateStore } from "@/stores"

export function useDateListener() {
  const location = useLocation()
  const onDateChange = useDateStore(state => state.onDateChange)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const dateParam = params.get("date")

    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      const parsed = new Date(dateParam)
      if (!isNaN(parsed.getTime())) {
        onDateChange(parsed)
        return
      }
    }

    onDateChange(new Date())
  }, [location.search, onDateChange])
}