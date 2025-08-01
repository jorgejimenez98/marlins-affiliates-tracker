import React from "react"

import { PAGE_URLS } from "@/lib/constants"
import type { AppRoute } from "@/lib/types"

const SchedulePage = React.lazy(() => import("./schedule/Index"))

export const applicationRoutes: AppRoute[] = [
  // Initial Page
  {
    path: PAGE_URLS.INITIAL,
    element: <div />
  },

  // Home Page
  {
    path: PAGE_URLS.SCHEDULE,
    element: <SchedulePage />
  }
]