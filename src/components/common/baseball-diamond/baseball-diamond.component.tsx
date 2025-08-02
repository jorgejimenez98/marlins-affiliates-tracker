interface BaseballDiamondProps {
    runnersOnBase?: string[]
    className?: string
  }

export function BaseballDiamond({ runnersOnBase = [], className = "" }: BaseballDiamondProps) {
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
    </div>
  )
}
