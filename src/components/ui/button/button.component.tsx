
import { Slot } from "@radix-ui/react-slot"

import type { ButtonProps } from "./button.properties"
import { buttonVariants } from "./button.variants"

import { cn } from "@/lib/utils"

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
