
import { HeaderRefreshButton, HeaderThemeButton } from "./components"

import { Image } from "@/components/ui"
import { useScrolled } from "@/hooks"
import { UI } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Header() {
  const scrolled = useScrolled(10)

  return (
    <header
      className={cn(
        "flex items-center justify-between px-4 lg:px-6 py-3 sticky top-0 z-50 w-full transition-all duration-200",
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-b-sm" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src={UI.IMAGES.LOGO}
          width={40}
          height={40}
          alt="Miami Marlins Logo"
        />

        <div>
          <p className="text-lg font-semibold text-foreground">
            Miami Marlins
          </p>

          <p className="text-xs text-muted-foreground -mt-1">
            Game Scheduler
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="w-fit px-4 flex gap-2 p-2 rounded-full border">
        {/* Refresh */}
        <HeaderRefreshButton />

        {/* Theme */}
        <HeaderThemeButton />
      </div>
    </header>
  )
}