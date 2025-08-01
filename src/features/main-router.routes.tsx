import React from "react"

import { PAGE_URLS } from "@/lib/constants"
import type { AppRoute } from "@/lib/types"

const NotFoundPage = React.lazy(() => import("./404/Index"))
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
  },

  // 404 Page
  {
    path: PAGE_URLS.NOT_FOUND,
    element: <NotFoundPage />
  }
]