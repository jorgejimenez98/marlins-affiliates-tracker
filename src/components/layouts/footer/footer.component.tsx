import { useTranslation } from "react-i18next"

import { UI } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function Footer() {
  const { t } = useTranslation()

  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn("border-t py-6 text-center text-muted-foreground space-y-1")}
      aria-label="Site footer"
    >
      <p className="text-sm">
        {t("footer", { currentYear })}
      </p>

      <p className="text-sm flex justify-center items-center gap-2">
        {t("made")}

        <a
          href={UI.LINKS.LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-marlins-gradient hover-default"
        >
          {UI.PROGRAMMER}
        </a>
      </p>
    </footer>
  )
}
