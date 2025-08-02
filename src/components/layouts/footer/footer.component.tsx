import { UI } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn("border-t py-6 text-center text-muted-foreground space-y-1")}
      aria-label="Site footer"
    >
      <p className="text-sm">
        &copy; {currentYear} All rights reserved
      </p>

      <p className="text-sm flex justify-center items-center gap-2">
        Made by
        <a
          href={UI.LINKS.LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-marlins-gradient hover-default"
        >
          Jorge Jimenez
        </a>
      </p>
    </footer>
  )
}
