import { useEffect, useState } from "react"

/**
 * Hook to detect if the scroll has passed a vertical threshold
 * @param threshold - number of pixels from the top to activate the state
 */
export function useScrolled(threshold: number = 10) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return scrolled
}