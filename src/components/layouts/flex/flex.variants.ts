import { cva } from "class-variance-authority"

export const flexVariants = cva(
  "flex",
  {
    variants: {
      dir: {
        row: "flex-row",
        col: "flex-col"
      },
      justify: {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly"
      },
      gap: {
        "1": "gap-1",
        "2": "gap-2",
        "3": "gap-3",
        "4": "gap-4",
        "5": "gap-5"
      },
      items: {
        start: "items-start",
        end: "items-end",
        center: "items-center",
        baseline: "items-baseline",
        stretch: "items-stretch"
      },
      wrap: {
        noWrap: "flex-nowrap",
        wrap: "flex-wrap",
        wrapReverse: "flex-wrap-reverse",
        shrink: "flex-shrink"
      }
    },
    defaultVariants: {
      dir: "row",
      justify: "start",
      items: "start",
      wrap: "noWrap"
    }
  }
)