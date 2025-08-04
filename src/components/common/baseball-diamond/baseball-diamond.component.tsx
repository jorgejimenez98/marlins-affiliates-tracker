import type { BaseballDiamondProps } from "./baseball-diamond.properties"

import { cn } from "@/lib/utils"

export function BaseballDiamond({
  runnersOnBase = [],
  inning,
  inningHalf,
  outs,
  className
}: BaseballDiamondProps) {
  const hasFirst = runnersOnBase.includes("1B")
  const hasSecond = runnersOnBase.includes("2B")
  const hasThird = runnersOnBase.includes("3B")

  return (
    <div className={`relative w-10 h-10 ${className}`}>
      <div
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 ${
          hasSecond ? "bg-red-500" : "bg-gray-500"
        }`}
      />

      <div
        className={`absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-3 rotate-45 ${
          hasFirst ? "bg-red-500" : "bg-gray-500"
        }`}
      />


      <div
        className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 rotate-45 ${
          hasThird ? "bg-red-500" : "bg-gray-500"
        }`}
      />

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
        {outs && (
          <div className={cn("flex gap-0.5 mt-2", +outs === 3 && "animate-pulse")}>
            {[0, 1, 2].map(item => (
              <div
                key={item}
                className={`w-1.5 h-1.5 rounded-full ${
                  +outs > item ? "bg-red-500" : "bg-gray-400/50"
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex gap-1 text-[10px] text-foreground font-semibold mt-2">
          <span>
            {inningHalf ?? ""}
          </span>
          <span>
            {inning ?? "-"}
          </span>
        </div>
      </div>
    </div>
  )
}
