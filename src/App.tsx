import { Suspense } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes } from "react-router-dom"
import { Toaster as SonnerToastWrapper } from "sonner"

import { ScrollToTop } from "./components/common"
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

        <ThemeProvider defaultTheme="dark">
          <Suspense fallback={<Loader />}>
            <div className="relative flex min-h-screen flex-col max-w-content mx-auto">
              {/* Header */}
              <Header />

              {/* Content */}
              <main className="flex-1">
                <div className="flex flex-col gap-3 px-3">
                  <Routes>{pageRoutes}</Routes>
                </div>
              </main>

              {/* Footer */}
              <Footer />

              {/* Wrappers */}
              <ScrollToTop />
              <SonnerToastWrapper position="top-center" />
            </div>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
