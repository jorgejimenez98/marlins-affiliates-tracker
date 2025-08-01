import { ScheduleDateSection } from "./components"
import { useDateListener } from "./hooks"


export default function SchedulePage() {
  // Date Check on value changes
  useDateListener()

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-5 sm:mt-10">

      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-marlins-gradient mt-2">
          Schedule and Results
        </h1>

        {/* Date Selector */}
        <ScheduleDateSection />
      </div>

    </div>
  )
}