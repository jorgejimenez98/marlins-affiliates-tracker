import type { LoaderProps } from "./loader.properties"

import { cn } from "@/lib/utils"

export function Loader({ text, className }: LoaderProps) {
  const containerClasses = cn(
    "fixed inset-0 flex flex-col items-center justify-center gap-4 z-50 bg-background/60 backdrop-blur-sm",
    className
  )

  return (
    <div className={containerClasses}>
      {/* Animated spinner */}
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-muted animate-pulse" />
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Optional loading text */}
      {text && (
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-foreground animate-pulse">
            {text}
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" />
          </div>
        </div>
      )}
    </div>
  )
}
