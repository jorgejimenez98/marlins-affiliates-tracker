import { Suspense } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes } from "react-router-dom"

import { Flex } from "./components/layouts"
import { Loader } from "./components/ui"
import { useApplicationRoutes } from "./hooks"

const queryClient = new QueryClient()

export function App() {
  const pageRoutes = useApplicationRoutes()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Flex dir='col'>
            <p>Header here....</p>

            {/* Content */}
            <Routes>
              {pageRoutes}
            </Routes>

            <p>Footer here...</p>
          </Flex>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
