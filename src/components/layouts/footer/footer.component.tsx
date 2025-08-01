import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn("border-t py-6 text-center text-muted-foreground")}
      aria-label="Site footer"
    >
      <p className="text-sm">
        © {currentYear} All rights reserved
      </p>
    </footer>
  )
}
