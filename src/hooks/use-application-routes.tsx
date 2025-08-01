import { Navigate, Route } from "react-router-dom"

import { applicationRoutes } from "@/features/main-router.routes"
import { PAGE_URLS } from "@/lib/constants"

export function useApplicationRoutes() {
  return applicationRoutes.map(route => {
    // Analysis for first url
    if (route.path === PAGE_URLS.INITIAL) {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<Navigate to={PAGE_URLS.SCHEDULE} />}
        />
      )
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.element as React.ReactNode}
      />
    )
  })
}