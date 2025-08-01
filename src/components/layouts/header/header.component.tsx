import { useState } from "react"

import { Moon, RefreshCw, Sun } from "lucide-react"

import { Button, Image } from "@/components/ui"
import { UI } from "@/lib/constants"
import { useTheme } from "@/providers/theme-provider"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      console.warn("Reload")
    }, 500)
  }


  return (
    <header className="flex justify-between mt-5">
      {/* Logo */}
      <Image
        src={UI.IMAGES.LOGO}
        width={50}
        height={50}
        alt="Miami Marlins Logo"
      />

      {/* Actions */}
      <div className="w-fit px-4 flex gap-2 p-2 rounded-full border">
        {/* Refresh */}
        <Button
          size="icon"
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`${isRefreshing ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh page</span>
        </Button>

        {/* Theme */}
        <Button
          size="icon"
          variant="outline"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-marlins-blue" />

          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />

          <span className="sr-only">
          Toggle theme
          </span>
        </Button>
      </div>

    </header>
  )
}