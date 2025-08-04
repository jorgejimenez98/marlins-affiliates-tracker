import type { SkeletonProperties } from "./skeleton.properties"

import { cn } from "@/lib/utils"

export function Skeleton({ className, cols, ...props }: SkeletonProperties) {

  return (
    <div
      className={cn(`grid gap-5 grid-cols-1 w-full px-3 sm:px-0 ${cols === 2 ? "sm:grid-cols-2" : ""}`, className)}
      {...props}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-40 bg-accent animate-pulse rounded-md w-full"
        />
      ))}
    </div>
  )
}