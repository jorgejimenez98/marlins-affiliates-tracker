/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react"

import { useTranslation } from "react-i18next"

import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"

export function HeaderLanguagePopover() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const languages = [
    { text: "En", key: "en" },
    { text: "Es", key: "es" }
  ]

  const currentText = useMemo(() => {
    return languages.find(item => item.key === i18n.language)?.text
  }, [i18n.language])

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={open => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          {currentText}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex gap-3">
          {languages.map(language => (
            <Button
              size="icon"
              variant="outline"
              key={language.key}
              onClick={() => handleLanguageChange(language.key)}
            >
              {language.text}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}