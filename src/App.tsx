import { Suspense } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes } from "react-router-dom"

import { Footer, Header } from "./components/layouts"
import { Loader } from "./components/ui"
import { useApplicationRoutes } from "./hooks"
import { ThemeProvider } from "./providers"

const queryClient = new QueryClient()

export function App() {
  const pageRoutes = useApplicationRoutes()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>

        <ThemeProvider defaultTheme="system">
          <Suspense fallback={<Loader />}>
            <div className="max-w-content mx-auto flex flex-col gap-3">
              {/* Header */}
              <Header />

              {/* Content */}
              <main className="flex-1">
                <Routes>
                  {pageRoutes}
                </Routes>
              </main>

              {/* Footer */}
              <Footer />
            </div>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
