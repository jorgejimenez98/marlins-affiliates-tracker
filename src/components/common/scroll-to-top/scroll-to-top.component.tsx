
import { ArrowUp } from "lucide-react"

import { Button } from "../../ui"

import { useScrolled } from "@/hooks"

export function ScrollToTop() {
  const isVisible = useScrolled(100)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return isVisible && (
    <div className={"fixed bottom-5 right-5 transition-opacity z-50"}>
      <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}