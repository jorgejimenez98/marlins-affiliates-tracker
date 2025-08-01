import { useState } from "react"

import { Button } from "./components/ui"

export function App() {
  const [count, setCount] = useState(0)

  return <>
    <div className="flex justify-center items-center flex-col gap-2 min-h-screen">
      Content here..s

      <Button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </Button>
    </div>
  </>
}
