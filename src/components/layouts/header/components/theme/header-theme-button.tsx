import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui"
import { useTheme } from "@/providers/theme-provider"

export function HeaderThemeButton() {

  const { theme, setTheme } = useTheme()

  return (
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
  )
}