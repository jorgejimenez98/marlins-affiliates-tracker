import { Home } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui"
import { PAGE_URLS } from "@/lib/constants"

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-primary">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold">
            Page Not Found
          </h2>

          <p className="text-xl">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mt-8">
          <Link to={PAGE_URLS.SCHEDULE}>
            <Button className="w-full flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Go Back to the Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}