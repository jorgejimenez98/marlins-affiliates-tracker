import { cn } from "@/lib/utils"

export function Loader({ className }: { className?: string }) {

  return (
    <div className={cn(
      "absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50",
      className
    )}>

      <div className="relative size-16">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
        <div className="absolute inset-0 rounded-full bg-primary" />
      </div>
    </div>
  )
}