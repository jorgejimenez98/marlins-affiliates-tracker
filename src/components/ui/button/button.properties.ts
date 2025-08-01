import type { VariantProps } from "class-variance-authority"

import type { buttonVariants } from "./button.variants"

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }