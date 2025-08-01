

import type { FlexProps } from "./flex.properties"
import { flexVariants } from "./flex.variants"

import { cn } from "@/lib/utils"

export function Flex({
  className,
  dir,
  justify,
  items,
  wrap,
  gap,
  children
}: FlexProps) {

  return (
    <div
      className={cn(
        flexVariants({ dir, justify, items, wrap, gap }),
        className
      )}
    >
      {children}
    </div>
  )
}