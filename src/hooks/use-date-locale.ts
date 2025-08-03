import { es, enUS as en } from "date-fns/locale"
import { useTranslation } from "react-i18next"

export function useDateLocale() {
  const { i18n } = useTranslation()

  return { es, en }[i18n.language]
}