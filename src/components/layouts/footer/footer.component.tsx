
import { cn } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn("flex flex-col border-t mt-16")}
      aria-label="Site footer"
    >
      {/* Copyright */}
      <p className="text-sm text-center mt-4">
          © {currentYear} All rights reserved
      </p>
    </footer>
  )
}
